using TioPatinhas.Api.DTOs;

namespace TioPatinhas.Api.Services
{
    public interface ITransacaoService
    {
        Task<IEnumerable<TransacaoResponseDTO>> ObterTodasAsync(int usuarioId);
        Task<TransacaoResponseDTO?> ObterPorIdAsync(int id, int usuarioId);
        Task<TransacaoResponseDTO> AdicionarAsync(TransacaoRequestDTO dto, int usuarioId);
        Task<bool> RemoverAsync(int id, int usuarioId);
    }
}