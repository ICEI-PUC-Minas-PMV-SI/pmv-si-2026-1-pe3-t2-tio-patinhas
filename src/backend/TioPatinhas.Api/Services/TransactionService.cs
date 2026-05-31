using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransactionResponseDTO>> GetAllAsync(int userId)
        {
            var transactions = await _context.Transactions
                .Include(t => t.Categories)
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return transactions.Select(MapToDTO);
        }

        public async Task<TransactionResponseDTO?> GetByIdAsync(int id, int userId)
        {
            var transaction = await _context.Transactions
                .Include(t => t.Categories)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            return transaction == null ? null : MapToDTO(transaction);
        }

        public async Task<TransactionResponseDTO> AddAsync(TransactionRequestDTO dto, int userId)
        {
            var categories = await _context.Categories
                .Where(c => dto.CategoryIds.Contains(c.Id) && c.UserId == userId)
                .ToListAsync();

            if (categories.Count != dto.CategoryIds.Count)
            {
                throw new InvalidOperationException("One or more categories were not found.");
            }

            var transaction = new Transaction
            {
                Description = dto.Description,
                Value = dto.Value,
                Date = dto.Date,
                UserId = userId,
                Categories = categories
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return MapToDTO(transaction);
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

        private static TransactionResponseDTO MapToDTO(Transaction t) => 
            new(
                t.Id,
                t.Description,
                t.Date,
                t.Value,
                t.Categories.Select(c => new CategoryResponseDTO(c.Id, c.Name, c.Type)).ToList());
    }
}
