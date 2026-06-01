namespace TioPatinhas.Api.Models
{
    public class Investment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Asset { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime Date { get; set; }
    }
}
