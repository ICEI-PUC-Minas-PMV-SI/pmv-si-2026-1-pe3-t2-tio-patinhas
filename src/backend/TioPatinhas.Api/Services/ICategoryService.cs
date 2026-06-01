using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponseDTO>> GetAllAsync(int userId);
        Task<CategoryResponseDTO?> GetByIdAsync(int id);
        Task<CategoryResponseDTO> AddAsync(CategoryRequestDTO dto, int userId);
        Task<int> ResolveOrCreateCategoryIdAsync(int userId, string name, Enums.TransactionType type);
    }
}
