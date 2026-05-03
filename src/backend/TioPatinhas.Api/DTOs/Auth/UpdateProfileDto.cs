using System.ComponentModel.DataAnnotations;

namespace TioPatinhas.Api.DTOs.Auth
{
    public class UpdateProfileDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
