using Microsoft.AspNetCore.Mvc;
using TioPatinhas.Api.DTOs.Auth;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                var token = await _service.RegisterAsync(dto);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var token = await _service.LoginAsync(dto);

            if (token == null)
                return Unauthorized(new { error = "Credenciais inválidas" });

            return Ok(new { token });
        }
    }
}