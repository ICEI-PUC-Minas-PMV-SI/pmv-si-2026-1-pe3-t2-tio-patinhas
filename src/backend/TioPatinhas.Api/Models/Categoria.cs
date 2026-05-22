using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public TipoTransacao Tipo { get; set; }
        public int UserId { get; set; }

        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
