using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("transactions")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _service;

        public TransactionsController(ITransactionService service)
        {
            _service = service;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var summary = await _service.GetSummaryAsync(userId);
            return Ok(summary);
        }

        [HttpGet("expenses-by-category")]
        public async Task<IActionResult> GetExpensesByCategory()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var data = await _service.GetExpensesByCategoryAsync(userId);
            return Ok(data);
        }

        [HttpGet("monthly-evolution")]
        public async Task<IActionResult> GetMonthlyEvolution()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var data = await _service.GetMonthlyEvolutionAsync(userId);
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var transactions = await _service.GetAllForContractAsync(userId);
            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransactionContractRequestDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            try
            {
                var created = await _service.CreateFromContractAsync(dto, userId);
                return CreatedAtAction(nameof(Get), new { id = created!.Id }, created);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TransactionContractRequestDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            try
            {
                var updated = await _service.UpdateFromContractAsync(id, dto, userId);
                if (updated == null)
                    return NotFound(new { error = "Transação não encontrada." });
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
            var removed = await _service.RemoveAsync(id, userId);
            if (!removed)
                return NotFound(new { error = "Transação não encontrada." });
            return NoContent();
        }
    }
}
