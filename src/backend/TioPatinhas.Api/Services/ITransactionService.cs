using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionResponseDTO>> GetAllAsync(int userId);
        Task<TransactionResponseDTO?> GetByIdAsync(int id, int userId);
        Task<TransactionResponseDTO> AddAsync(TransactionRequestDTO dto, int userId);
        Task<bool> RemoveAsync(int id, int userId);
    }
}
