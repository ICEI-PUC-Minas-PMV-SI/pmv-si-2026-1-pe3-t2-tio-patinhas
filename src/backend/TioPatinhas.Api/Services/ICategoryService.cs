using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponseDTO>> GetAllAsync();
        Task<CategoryResponseDTO?> GetByIdAsync(int id);
        Task<CategoryResponseDTO> AddAsync(CategoryRequestDTO dto, int userId);
    }
}
