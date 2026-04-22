using Microsoft.AspNetCore.Mvc;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriasController(ICategoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categorias = await _service.ObterTodasAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var categoria = await _service.ObterPorIdAsync(id);
            if (categoria == null) return NotFound("Categoria não encontrada.");
            
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoriaRequestDTO dto)
        {
            // O UsuarioId será fixo em 1 para permitir testes antes de implementarmos a Autenticação
            var novaCategoria = await _service.AdicionarAsync(dto, usuarioId: 1);
            
            return CreatedAtAction(nameof(GetById), new { id = novaCategoria.Id }, novaCategoria);
        }
    }
}