namespace TioPatinhas.Api.DTOs
{
    public record TransacaoRequestDTO(
        string Descricao,
        DateOnly Data,
        decimal Valor,
        List<int> CategoriaIds
    );

    public record TransacaoResponseDTO(
        int Id,
        string Descricao,
        DateOnly Data,
        decimal Valor,
        List<CategoriaResponseDTO> Categorias
    );
}