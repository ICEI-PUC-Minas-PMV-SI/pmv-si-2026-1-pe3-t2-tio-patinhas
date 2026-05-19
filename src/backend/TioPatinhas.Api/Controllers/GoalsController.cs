using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("goals")]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalService _service;

        public GoalsController(IGoalService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var goals = await _service.GetAllByUserIdAsync(userId);
            return Ok(goals);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateGoalDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var goal = await _service.CreateAsync(dto, userId);

            if (goal == null)
                return BadRequest(new { error = "Dados inválidos. Verifique o tipo (short_term ou long_term) e a data limite." });

            return CreatedAtAction(nameof(GetAll), new { id = goal.Id }, goal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateGoalDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var (goal, notFound, invalidData) = await _service.UpdateAsync(id, dto, userId);

            if (notFound)
                return NotFound(new { error = "Meta não encontrada." });

            if (invalidData)
                return BadRequest(new { error = "Dados inválidos. Verifique o tipo (short_term ou long_term) e a data limite." });

            return Ok(goal);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var deleted = await _service.DeleteAsync(id, userId);

            if (!deleted)
                return NotFound(new { error = "Meta não encontrada." });

            return NoContent();
        }
    }
}
