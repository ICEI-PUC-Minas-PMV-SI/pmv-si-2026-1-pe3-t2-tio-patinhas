using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransacaoResponseDTO>> ObterTodasAsync(int usuarioId)
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Categorias)
                .Where(t => t.UserId == usuarioId)
                .ToListAsync();

            return transacoes.Select(MapToDTO);
        }

        public async Task<TransacaoResponseDTO?> ObterPorIdAsync(int id, int usuarioId)
        {
            var transacao = await _context.Transacoes
                .Include(t => t.Categorias)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == usuarioId);

            return transacao == null ? null : MapToDTO(transacao);
        }

        public async Task<TransacaoResponseDTO> AdicionarAsync(TransacaoRequestDTO dto, int usuarioId)
        {
            var categorias = await _context.Categorias
                .Where(c => dto.CategoriaIds.Contains(c.Id) && c.UserId == usuarioId)
                .ToListAsync();

            if (categorias.Count != dto.CategoriaIds.Count)
            {
                throw new InvalidOperationException("Uma ou mais categorias não foram encontradas.");
            }

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Data = dto.Data,
                UserId = usuarioId,
                Categorias = categorias
            };

            return MapToDTO(transacao);
        }

        public async Task<bool> RemoverAsync(int id, int usuarioId)
        {
            var transacao = await _context.Transacoes
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == usuarioId);

            if (transacao == null)
                return false;

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }

        private static TransacaoResponseDTO MapToDTO(Transacao t) => 
            new(
                t.Id,
                t.Descricao,
                t.Data,
                t.Valor,
                t.Categorias.Select(c => new CategoriaResponseDTO(c.Id, c.Nome, c.Tipo)).ToList());
    }
}