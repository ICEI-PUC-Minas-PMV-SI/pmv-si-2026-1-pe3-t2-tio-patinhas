using System.Text.Json.Serialization;

namespace TioPatinhas.Api.DTOs
{
    public class TransactionContractRequestDto
    {
        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("category")]
        public string Category { get; set; } = string.Empty;

        [JsonPropertyName("date")]
        public string Date { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public decimal Amount { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; } = string.Empty;
    }

    public record TransactionContractResponseDto(
        [property: JsonPropertyName("id")] int Id,
        [property: JsonPropertyName("user_id")] int UserId,
        [property: JsonPropertyName("description")] string Description,
        [property: JsonPropertyName("category")] string Category,
        [property: JsonPropertyName("date")] DateTime Date,
        [property: JsonPropertyName("amount")] decimal Amount,
        [property: JsonPropertyName("type")] string Type);

    public record BalanceSummaryDto(
        [property: JsonPropertyName("income")] decimal Income,
        [property: JsonPropertyName("expense")] decimal Expense,
        [property: JsonPropertyName("balance")] decimal Balance);

    public record CategoryExpenseDto(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("value")] decimal Value);

    public record MonthlyEvolutionDto(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("income")] decimal Income,
        [property: JsonPropertyName("expense")] decimal Expense,
        [property: JsonPropertyName("balance")] decimal Balance);
}
