using InventoryAPI.Data;
using InventoryAPI.Models;
using InventoryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MongoDBContext _context;
        private readonly JwtService _jwt;
        private readonly ILogger<AuthController> _logger;

        public AuthController(MongoDBContext context, JwtService jwt, ILogger<AuthController> logger)
        {
            _context = context;
            _jwt = jwt;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            _logger.LogInformation("Register attempt for email: {Email}", dto.Email);

            var existingAdmin = await _context.Admins.Find(a => a.Email == dto.Email).FirstOrDefaultAsync();
            if (existingAdmin != null)
            {
                _logger.LogWarning("Registration failed: Email {Email} already in use.", dto.Email);
                return BadRequest("Email already in use.");
            }

            var admin = new Admin
            {
                Name = dto.Name ?? string.Empty,
                Email = dto.Email ?? string.Empty,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone ?? string.Empty,
                Address = dto.Address ?? string.Empty,
                PhotoUrl = dto.PhotoUrl ?? string.Empty
            };

            await _context.Admins.InsertOneAsync(admin);
            _logger.LogInformation("Admin registered successfully: {Email}", dto.Email);
            return Ok("Registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            _logger.LogInformation("Login attempt for email: {Email}", dto.Email);

            var admin = await _context.Admins.Find(a => a.Email == dto.Email).FirstOrDefaultAsync();
            if (admin == null)
            {
                _logger.LogWarning("Login failed: Admin with email {Email} not found.", dto.Email);
                return Unauthorized("Invalid credentials.");
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash))
            {
                _logger.LogWarning("Login failed: Invalid password for email {Email}.", dto.Email);
                return Unauthorized("Invalid credentials.");
            }

            var token = _jwt.GenerateToken(admin);
            _logger.LogInformation("Login successful for email: {Email}", dto.Email);
            return Ok(new { token });
        }
    }
}