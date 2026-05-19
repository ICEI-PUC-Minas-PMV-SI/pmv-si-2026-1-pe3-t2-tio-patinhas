using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface IGoalService
    {
        Task<IEnumerable<GoalResponseDto>> GetAllByUserIdAsync(int userId);
        Task<GoalResponseDto?> CreateAsync(CreateGoalDto dto, int userId);
        Task<(GoalResponseDto? Goal, bool NotFound, bool InvalidData)> UpdateAsync(int id, UpdateGoalDto dto, int userId);
        Task<bool> DeleteAsync(int id, int userId);
    }
}
