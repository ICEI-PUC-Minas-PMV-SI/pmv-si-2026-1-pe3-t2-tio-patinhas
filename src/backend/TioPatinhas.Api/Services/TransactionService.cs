using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Enums;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;
        private readonly ICategoryService _categoryService;

        public TransactionService(AppDbContext context, ICategoryService categoryService)
        {
            _context = context;
            _categoryService = categoryService;
        }

        public async Task<IEnumerable<TransactionContractResponseDto>> GetAllForContractAsync(int userId)
        {
            var transactions = await QueryForUser(userId)
                .OrderByDescending(t => t.Date)
                .ThenByDescending(t => t.Id)
                .ToListAsync();

            return transactions.Select(MapToContract);
        }

        public async Task<TransactionContractResponseDto?> CreateFromContractAsync(
            TransactionContractRequestDto dto, int userId)
        {
            if (!TryParseContract(dto, out var date, out var type, out var error))
                throw new InvalidOperationException(error);

            var categoryId = await _categoryService.ResolveOrCreateCategoryIdAsync(
                userId, dto.Category, type);

            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)
                throw new InvalidOperationException("Categoria não encontrada.");

            var transaction = new Transaction
            {
                Description = dto.Description.Trim(),
                Value = dto.Amount,
                Date = date,
                UserId = userId,
                Categories = new List<Category> { category }
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            await _context.Entry(transaction).Collection(t => t.Categories).LoadAsync();
            return MapToContract(transaction);
        }

        public async Task<TransactionContractResponseDto?> UpdateFromContractAsync(
            int id, TransactionContractRequestDto dto, int userId)
        {
            if (!TryParseContract(dto, out var date, out var type, out var error))
                throw new InvalidOperationException(error);

            var transaction = await QueryForUser(userId)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                return null;

            var categoryId = await _categoryService.ResolveOrCreateCategoryIdAsync(
                userId, dto.Category, type);

            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)
                throw new InvalidOperationException("Categoria não encontrada.");

            transaction.Description = dto.Description.Trim();
            transaction.Value = dto.Amount;
            transaction.Date = date;
            transaction.Categories = new List<Category> { category };

            await _context.SaveChangesAsync();
            return MapToContract(transaction);
        }

        public async Task<bool> RemoveAsync(int id, int userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (transaction == null)
                return false;

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<BalanceSummaryDto> GetSummaryAsync(int userId)
        {
            var items = await GetContractItemsAsync(userId);
            decimal income = 0, expense = 0;

            foreach (var item in items)
            {
                if (item.Type == "income")
                    income += item.Amount;
                else
                    expense += item.Amount;
            }

            return new BalanceSummaryDto(income, expense, income - expense);
        }

        public async Task<IEnumerable<CategoryExpenseDto>> GetExpensesByCategoryAsync(int userId)
        {
            var items = await GetContractItemsAsync(userId);

            return items
                .Where(t => t.Type == "expense")
                .GroupBy(t => t.Category)
                .Select(g => new CategoryExpenseDto(g.Key, g.Sum(t => t.Amount)))
                .OrderByDescending(x => x.Value)
                .ToList();
        }

        public async Task<IEnumerable<MonthlyEvolutionDto>> GetMonthlyEvolutionAsync(int userId)
        {
            var items = await GetContractItemsAsync(userId);
            var now = DateTime.UtcNow;
            var months = new List<(string Key, string Name)>();

            for (var i = 5; i >= 0; i--)
            {
                var d = new DateTime(now.Year, now.Month, 1).AddMonths(-i);
                var key = $"{d.Year:D4}-{d.Month:D2}";
                var name = $"{d.Month:D2}/{d.Year}";
                months.Add((key, name));
            }

            var result = months.Select(m => new MonthlyEvolutionDto(m.Name, 0, 0, 0)).ToList();

            var firstParts = months[0].Key.Split('-');
            var lastParts = months[^1].Key.Split('-');
            var firstMonthStart = new DateOnly(int.Parse(firstParts[0]), int.Parse(firstParts[1]), 1);
            var afterLastMonth = new DateOnly(int.Parse(lastParts[0]), int.Parse(lastParts[1]), 1).AddMonths(1);

            decimal openingBalance = 0;
            decimal afterWindowNet = 0;

            foreach (var item in items)
            {
                var itemDate = DateOnly.FromDateTime(item.Date);
                var net = item.Type == "income" ? item.Amount : -item.Amount;

                if (itemDate < firstMonthStart)
                {
                    openingBalance += net;
                    continue;
                }

                if (itemDate >= afterLastMonth)
                {
                    afterWindowNet += net;
                    continue;
                }

                var key = $"{itemDate.Year:D4}-{itemDate.Month:D2}";
                var index = months.FindIndex(m => m.Key == key);
                if (index < 0) continue;

                var current = result[index];
                if (item.Type == "income")
                {
                    result[index] = current with
                    {
                        Income = current.Income + item.Amount
                    };
                }
                else
                {
                    result[index] = current with
                    {
                        Expense = current.Expense + item.Amount
                    };
                }
            }

            // Saldo acumulado: saldo anterior ao gráfico + líquido de cada mês + movimentos após o período
            decimal runningBalance = openingBalance;
            for (var i = 0; i < result.Count; i++)
            {
                var m = result[i];
                runningBalance += m.Income - m.Expense;
                result[i] = m with { Balance = runningBalance };
            }

            if (result.Count > 0 && afterWindowNet != 0)
            {
                runningBalance += afterWindowNet;
                var last = result[^1];
                result[^1] = last with { Balance = runningBalance };
            }

            return result;
        }

        private async Task<List<TransactionContractResponseDto>> GetContractItemsAsync(int userId)
        {
            var transactions = await QueryForUser(userId).ToListAsync();
            return transactions.Select(MapToContract).ToList();
        }

        private IQueryable<Transaction> QueryForUser(int userId) =>
            _context.Transactions
                .Include(t => t.Categories)
                .Where(t => t.UserId == userId);

        private static bool TryParseContract(
            TransactionContractRequestDto dto,
            out DateOnly date,
            out TransactionType type,
            out string error)
        {
            date = default;
            type = default;
            error = string.Empty;

            if (string.IsNullOrWhiteSpace(dto.Description))
            {
                error = "Descrição é obrigatória.";
                return false;
            }

            if (string.IsNullOrWhiteSpace(dto.Category))
            {
                error = "Categoria é obrigatória.";
                return false;
            }

            if (dto.Amount <= 0)
            {
                error = "Valor deve ser maior que zero.";
                return false;
            }

            if (!TryParseDate(dto.Date, out date))
            {
                error = "Data inválida.";
                return false;
            }

            if (!TryParseTransactionType(dto.Type, out type))
            {
                error = "Tipo deve ser 'income' ou 'expense'.";
                return false;
            }

            return true;
        }

        private static bool TryParseDate(string value, out DateOnly date)
        {
            if (DateOnly.TryParse(value, out date))
                return true;

            if (DateTime.TryParse(value, out var dt))
            {
                date = DateOnly.FromDateTime(dt);
                return true;
            }

            return false;
        }

        private static bool TryParseTransactionType(string value, out TransactionType type)
        {
            switch (value?.Trim().ToLowerInvariant())
            {
                case "income":
                    type = TransactionType.Income;
                    return true;
                case "expense":
                    type = TransactionType.Expense;
                    return true;
                default:
                    type = default;
                    return false;
            }
        }

        private static TransactionContractResponseDto MapToContract(Transaction t)
        {
            var cat = t.Categories.FirstOrDefault();
            var typeStr = cat?.Type == TransactionType.Income ? "income" : "expense";
            var dateUtc = t.Date.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);

            return new TransactionContractResponseDto(
                t.Id,
                t.UserId,
                t.Description,
                cat?.Name ?? string.Empty,
                dateUtc,
                t.Value,
                typeStr);
        }
    }
}
