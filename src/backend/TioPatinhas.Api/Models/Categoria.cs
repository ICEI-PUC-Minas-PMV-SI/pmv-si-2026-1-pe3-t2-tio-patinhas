using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public TipoTransacao Tipo { get; set; }

        // Futuramente será feito o relacionamento com a tabela de Usuários.
        public int UsuarioId { get; set; }
    }
}
