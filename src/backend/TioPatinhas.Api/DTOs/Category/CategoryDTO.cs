using TioPatinhas.Api.Enums;

namespace TioPatinhas.Api.DTOs
{
    // Data required to create/update a category
    public record CategoryRequestDTO(string Name, TransactionType Type);
    
    // Data returned to the client after creating/updating a category or when listing categories
    public record CategoryResponseDTO(int Id, string Name, TransactionType Type);
}
