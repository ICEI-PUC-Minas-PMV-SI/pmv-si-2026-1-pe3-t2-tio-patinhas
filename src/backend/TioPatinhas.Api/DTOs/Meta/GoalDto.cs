using System.Text.Json.Serialization;

namespace TioPatinhas.Api.DTOs
{
    public record CreateGoalDto(
        [property: JsonPropertyName("title")] string Title,
        [property: JsonPropertyName("target_amount")] decimal TargetAmount,
        [property: JsonPropertyName("current_amount")] decimal CurrentAmount,
        [property: JsonPropertyName("deadline")] string Deadline,
        [property: JsonPropertyName("type")] string Type);

    public class UpdateGoalDto
    {
        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("target_amount")]
        public decimal? TargetAmount { get; set; }

        [JsonPropertyName("current_amount")]
        public decimal? CurrentAmount { get; set; }

        [JsonPropertyName("deadline")]
        public string? Deadline { get; set; }

        [JsonPropertyName("type")]
        public string? Type { get; set; }
    }

    public record GoalResponseDto(
        [property: JsonPropertyName("id")] int Id,
        [property: JsonPropertyName("user_id")] int UserId,
        [property: JsonPropertyName("title")] string Title,
        [property: JsonPropertyName("target_amount")] decimal TargetAmount,
        [property: JsonPropertyName("current_amount")] decimal CurrentAmount,
        [property: JsonPropertyName("deadline")] DateTime Deadline,
        [property: JsonPropertyName("type")] string Type);
}
