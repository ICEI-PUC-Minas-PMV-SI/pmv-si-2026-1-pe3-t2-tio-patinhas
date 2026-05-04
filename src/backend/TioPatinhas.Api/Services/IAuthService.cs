using TioPatinhas.Api.DTOs.Auth;

namespace TioPatinhas.Api.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(LoginDto dto);
    }
}