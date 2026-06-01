using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionContractResponseDto>> GetAllForContractAsync(int userId);
        Task<TransactionContractResponseDto?> CreateFromContractAsync(TransactionContractRequestDto dto, int userId);
        Task<TransactionContractResponseDto?> UpdateFromContractAsync(int id, TransactionContractRequestDto dto, int userId);
        Task<bool> RemoveAsync(int id, int userId);
        Task<BalanceSummaryDto> GetSummaryAsync(int userId);
        Task<IEnumerable<CategoryExpenseDto>> GetExpensesByCategoryAsync(int userId);
        Task<IEnumerable<MonthlyEvolutionDto>> GetMonthlyEvolutionAsync(int userId);
    }
}
