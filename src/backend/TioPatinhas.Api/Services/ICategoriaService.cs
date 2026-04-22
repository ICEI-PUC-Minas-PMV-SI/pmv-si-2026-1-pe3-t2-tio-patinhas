using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ICategoriaService
    {
        Task<IEnumerable<CategoriaResponseDTO>> ObterTodasAsync();
        Task<CategoriaResponseDTO?> ObterPorIdAsync(int id);
        Task<CategoriaResponseDTO> AdicionarAsync(CategoriaRequestDTO dto, int usuarioId);
    }
}