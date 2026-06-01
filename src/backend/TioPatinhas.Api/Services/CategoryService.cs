using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Enums;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryResponseDTO>> GetAllAsync(int userId)
        {
            var categories = await _context.Categories
                .Where(c => c.UserId == userId)
                .ToListAsync();
            return categories.Select(c => new CategoryResponseDTO(c.Id, c.Name, c.Type));
        }

        public async Task<CategoryResponseDTO?> GetByIdAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;

            return new CategoryResponseDTO(category.Id, category.Name, category.Type);
        }

        public async Task<CategoryResponseDTO> AddAsync(CategoryRequestDTO dto, int userId)
        {
            var category = new Category
            {
                Name = dto.Name,
                Type = dto.Type,
                UserId = userId 
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryResponseDTO(category.Id, category.Name, category.Type);
        }

        public async Task<int> ResolveOrCreateCategoryIdAsync(int userId, string name, TransactionType type)
        {
            var normalized = name.Trim();
            var existing = await _context.Categories
                .FirstOrDefaultAsync(c =>
                    c.UserId == userId &&
                    c.Type == type &&
                    c.Name.ToLower() == normalized.ToLower());

            if (existing != null)
                return existing.Id;

            var category = new Category
            {
                Name = normalized,
                Type = type,
                UserId = userId
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category.Id;
        }
    }
}
