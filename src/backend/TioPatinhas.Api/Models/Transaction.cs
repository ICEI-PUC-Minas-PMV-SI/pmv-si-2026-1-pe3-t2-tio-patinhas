using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateOnly Date { get; set; }
        public decimal Value { get; set; }
        public int UserId { get; set; }

        // Many-to-Many relationship with Category
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }
}
