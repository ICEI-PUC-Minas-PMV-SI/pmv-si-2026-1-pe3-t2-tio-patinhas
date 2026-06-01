using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("investments")]
    public class InvestmentsController : ControllerBase
    {
        private readonly IInvestmentService _service;

        public InvestmentsController(IInvestmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var investments = await _service.GetAllAsync(userId);
            return Ok(investments);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvestmentRequestDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            try
            {
                var created = await _service.CreateAsync(dto, userId);
                return CreatedAtAction(nameof(GetAll), new { id = created!.Id }, created);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InvestmentRequestDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            try
            {
                var updated = await _service.UpdateAsync(id, dto, userId);
                if (updated == null)
                    return NotFound(new { error = "Investimento não encontrado." });
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var deleted = await _service.DeleteAsync(id, userId);
            if (!deleted)
                return NotFound(new { error = "Investimento não encontrado." });
            return NoContent();
        }
    }
}
