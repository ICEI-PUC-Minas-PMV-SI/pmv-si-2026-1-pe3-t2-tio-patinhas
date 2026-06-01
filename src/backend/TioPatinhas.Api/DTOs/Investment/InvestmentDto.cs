using System.Text.Json.Serialization;

namespace TioPatinhas.Api.DTOs
{
    public class InvestmentRequestDto
    {
        [JsonPropertyName("asset")]
        public string Asset { get; set; } = string.Empty;

        [JsonPropertyName("amount")]
        public decimal Amount { get; set; }

        [JsonPropertyName("purchase_price")]
        public decimal PurchasePrice { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; } = string.Empty;
    }

    public record InvestmentResponseDto(
        [property: JsonPropertyName("id")] int Id,
        [property: JsonPropertyName("user_id")] int UserId,
        [property: JsonPropertyName("asset")] string Asset,
        [property: JsonPropertyName("amount")] decimal Amount,
        [property: JsonPropertyName("purchase_price")] decimal PurchasePrice,
        [property: JsonPropertyName("date")] DateTime Date);
}
