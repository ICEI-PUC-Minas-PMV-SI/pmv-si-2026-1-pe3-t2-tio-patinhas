using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Enums;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class GoalService : IGoalService
    {
        private readonly AppDbContext _context;

        public GoalService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GoalResponseDto>> GetAllByUserIdAsync(int userId)
        {
            var goals = await _context.Goals
                .AsNoTracking()
                .Where(g => g.UserId == userId)
                .OrderBy(g => g.Id)
                .ToListAsync();

            return goals.Select(MapToResponse);
        }

        public async Task<GoalResponseDto?> CreateAsync(CreateGoalDto dto, int userId)
        {
            if (!TryParseGoalType(dto.Type, out var goalType))
                return null;

            if (!TryParseDeadline(dto.Deadline, out var deadline))
                return null;

            var goal = new Goal
            {
                UserId = userId,
                Title = dto.Title,
                TargetAmount = dto.TargetAmount,
                CurrentAmount = dto.CurrentAmount,
                Deadline = deadline,
                Type = goalType
            };

            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            return MapToResponse(goal);
        }

        public async Task<(GoalResponseDto? Goal, bool NotFound, bool InvalidData)> UpdateAsync(
            int id, UpdateGoalDto dto, int userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);

            if (goal == null)
                return (null, true, false);

            if (dto.Title != null)
                goal.Title = dto.Title;

            if (dto.TargetAmount.HasValue)
                goal.TargetAmount = dto.TargetAmount.Value;

            if (dto.CurrentAmount.HasValue)
                goal.CurrentAmount = dto.CurrentAmount.Value;

            if (dto.Deadline != null)
            {
                if (!TryParseDeadline(dto.Deadline, out var deadline))
                    return (null, false, true);

                goal.Deadline = deadline;
            }

            if (dto.Type != null)
            {
                if (!TryParseGoalType(dto.Type, out var goalType))
                    return (null, false, true);

                goal.Type = goalType;
            }

            await _context.SaveChangesAsync();

            return (MapToResponse(goal), false, false);
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);

            if (goal == null)
                return false;

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return true;
        }

        private static GoalResponseDto MapToResponse(Goal goal) =>
            new(
                goal.Id,
                goal.UserId,
                goal.Title,
                goal.TargetAmount,
                goal.CurrentAmount,
                DateTime.SpecifyKind(goal.Deadline, DateTimeKind.Utc),
                ToGoalTypeString(goal.Type));

        private static bool TryParseGoalType(string type, out GoalType goalType)
        {
            goalType = default;

            switch (type)
            {
                case "short_term":
                    goalType = GoalType.ShortTerm;
                    return true;
                case "long_term":
                    goalType = GoalType.LongTerm;
                    return true;
                default:
                    return false;
            }
        }

        private static string ToGoalTypeString(GoalType type) =>
            type switch
            {
                GoalType.ShortTerm => "short_term",
                GoalType.LongTerm => "long_term",
                _ => throw new ArgumentOutOfRangeException(nameof(type))
            };

        private static bool TryParseDeadline(string deadline, out DateTime parsed)
        {
            if (DateTime.TryParse(deadline, out var date))
            {
                parsed = DateTime.SpecifyKind(date.Date, DateTimeKind.Utc);
                return true;
            }

            parsed = default;
            return false;
        }
    }
}
