using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface IInvestmentService
    {
        Task<IEnumerable<InvestmentResponseDto>> GetAllAsync(int userId);
        Task<InvestmentResponseDto?> CreateAsync(InvestmentRequestDto dto, int userId);
        Task<InvestmentResponseDto?> UpdateAsync(int id, InvestmentRequestDto dto, int userId);
        Task<bool> DeleteAsync(int id, int userId);
    }
}
