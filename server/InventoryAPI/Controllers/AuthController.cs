using Microsoft.AspNetCore.Mvc;
using InventoryAPI.Models;

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            return Ok("User registered"); // Placeholder response
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            return Ok("JWT token"); // Placeholder response
        }
    }
}
