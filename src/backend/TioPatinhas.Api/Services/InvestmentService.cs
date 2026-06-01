using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class InvestmentService : IInvestmentService
    {
        private readonly AppDbContext _context;

        public InvestmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InvestmentResponseDto>> GetAllAsync(int userId)
        {
            var investments = await _context.Investments
                .AsNoTracking()
                .Where(i => i.UserId == userId)
                .OrderByDescending(i => i.Date)
                .ThenByDescending(i => i.Id)
                .ToListAsync();

            return investments.Select(MapToResponse);
        }

        public async Task<InvestmentResponseDto?> CreateAsync(InvestmentRequestDto dto, int userId)
        {
            if (!TryParse(dto, out var date, out var error))
                throw new InvalidOperationException(error);

            var investment = new Investment
            {
                UserId = userId,
                Asset = dto.Asset.Trim(),
                Amount = dto.Amount,
                PurchasePrice = dto.PurchasePrice,
                Date = date
            };

            _context.Investments.Add(investment);
            await _context.SaveChangesAsync();

            return MapToResponse(investment);
        }

        public async Task<InvestmentResponseDto?> UpdateAsync(int id, InvestmentRequestDto dto, int userId)
        {
            if (!TryParse(dto, out var date, out var error))
                throw new InvalidOperationException(error);

            var investment = await _context.Investments
                .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

            if (investment == null)
                return null;

            investment.Asset = dto.Asset.Trim();
            investment.Amount = dto.Amount;
            investment.PurchasePrice = dto.PurchasePrice;
            investment.Date = date;

            await _context.SaveChangesAsync();
            return MapToResponse(investment);
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var investment = await _context.Investments
                .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);

            if (investment == null)
                return false;

            _context.Investments.Remove(investment);
            await _context.SaveChangesAsync();
            return true;
        }

        private static bool TryParse(InvestmentRequestDto dto, out DateTime date, out string error)
        {
            date = default;
            error = string.Empty;

            if (string.IsNullOrWhiteSpace(dto.Asset))
            {
                error = "Ativo é obrigatório.";
                return false;
            }

            if (dto.Amount <= 0)
            {
                error = "Quantidade deve ser maior que zero.";
                return false;
            }

            if (dto.PurchasePrice <= 0)
            {
                error = "Preço de compra deve ser maior que zero.";
                return false;
            }

            if (!DateTime.TryParse(dto.Date, out var parsed))
            {
                error = "Data inválida.";
                return false;
            }

            date = DateTime.SpecifyKind(parsed.Date, DateTimeKind.Utc);
            return true;
        }

        private static InvestmentResponseDto MapToResponse(Investment i) =>
            new(
                i.Id,
                i.UserId,
                i.Asset,
                i.Amount,
                i.PurchasePrice,
                DateTime.SpecifyKind(i.Date, DateTimeKind.Utc));
    }
}
