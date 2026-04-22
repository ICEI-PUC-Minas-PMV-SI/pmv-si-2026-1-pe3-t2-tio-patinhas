using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Data;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoriaResponseDTO>> ObterTodasAsync()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return categorias.Select(c => new CategoriaResponseDTO(c.Id, c.Nome, c.Tipo));
        }

        public async Task<CategoriaResponseDTO?> ObterPorIdAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) return null;

            return new CategoriaResponseDTO(categoria.Id, categoria.Nome, categoria.Tipo);
        }

        public async Task<CategoriaResponseDTO> AdicionarAsync(CategoriaRequestDTO dto, int usuarioId)
        {
            var categoria = new Categoria
            {
                Nome = dto.Nome,
                Tipo = dto.Tipo,
                UsuarioId = usuarioId // Fixo até ter o login
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return new CategoriaResponseDTO(categoria.Id, categoria.Nome, categoria.Tipo);
        }
    }
}