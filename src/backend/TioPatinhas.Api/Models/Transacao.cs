using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateOnly Data { get; set; }
        public decimal Valor { get; set; }
        public int UserId { get; set; }

        // Relacionamento N:N com Categoria
        public ICollection<Categoria> Categorias { get; set; } = new List<Categoria>();
    }
}   