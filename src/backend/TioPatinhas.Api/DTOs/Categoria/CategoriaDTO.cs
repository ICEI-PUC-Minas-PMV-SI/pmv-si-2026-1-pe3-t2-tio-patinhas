using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.DTOs
{
    // Dados necessários para criar/atualizar uma categoria
    public record CategoriaRequestDTO(string Nome, TipoTransacao Tipo);
    
    // Dados que serão devolvidos para o cliente após criar/atualizar uma categoria ou ao listar categorias
    public record CategoriaResponseDTO(int Id, string Nome, TipoTransacao Tipo);
}