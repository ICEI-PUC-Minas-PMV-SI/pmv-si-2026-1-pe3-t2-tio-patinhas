namespace TioPatinhas.Api.DTOs
{
    public record TransactionRequestDTO(
        string Description,
        DateOnly Date,
        decimal Value,
        List<int> CategoryIds
    );

    public record TransactionResponseDTO(
        int Id,
        string Description,
        DateOnly Date,
        decimal Value,
        List<CategoryResponseDTO> Categories
    );
}
