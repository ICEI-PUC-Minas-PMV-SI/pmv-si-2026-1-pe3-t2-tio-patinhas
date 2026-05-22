using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
   
   public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacaoController(ITransacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var transacoes = await _service.ObterTodasAsync(userId);
            return Ok(transacoes);
        }   

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var transacao = await _service.ObterPorIdAsync(id, userId);
            if (transacao == null)
            {
                return NotFound("Transação não encontrada.");
            }
            return Ok(transacao);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransacaoRequestDTO dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            try
            {
                var nova = await _service.AdicionarAsync(dto, userId);
                return CreatedAtAction(nameof(GetById), new { id = nova.Id }, nova);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var removido = await _service.RemoverAsync(id, userId);
            if (!removido) return NotFound("Transação não encontrada.");
            return NoContent();
        }
    }
}