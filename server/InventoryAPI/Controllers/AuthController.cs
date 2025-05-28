using InventoryAPI.Data;
using InventoryAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Text.RegularExpressions;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using InventoryAPI.Models;
using System.Security.Claims;

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
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            _logger.LogInformation("Register attempt for email: {Email}", dto.Email);

            // Validate model using data annotations
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(dto);
            bool isValid = Validator.TryValidateObject(dto, validationContext, validationResults, true);

            var errors = new List<string>();

            if (!isValid)
            {
                errors.AddRange(validationResults.Select(r => r.ErrorMessage!));
            }

            // Custom password complexity validation
            if (!string.IsNullOrEmpty(dto.Password))
            {
                if (!Regex.IsMatch(dto.Password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"))
                {
                    errors.Add("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
                }
            }

            // Check email uniqueness
            var existingAdmin = await _context.Admins.Find(a => a.Email == dto.Email).FirstOrDefaultAsync();
            if (existingAdmin != null)
            {
                errors.Add("Email already in use.");
            }

            if (errors.Any())
            {
                _logger.LogWarning("Registration failed for email {Email}: {Errors}", dto.Email, string.Join("; ", errors));
                return BadRequest(new { Errors = errors });
            }

            var admin = new Admin
            {
                Name = dto.Name!,
                Email = dto.Email!,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Phone = dto.Phone!,
                Address = dto.Address!,
                PhotoUrl = dto.PhotoUrl ?? string.Empty
            };

            await _context.Admins.InsertOneAsync(admin);
            _logger.LogInformation("Admin registered successfully: {Email}", dto.Email);
            return Ok(new { Message = "Registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            _logger.LogInformation("Login attempt for email: {Email}", dto.Email);

            var admin = await _context.Admins.Find(a => a.Email == dto.Email).FirstOrDefaultAsync();
            if (admin == null)
            {
                _logger.LogWarning("Login failed: Admin with email {Email} not found.", dto.Email);
                return Unauthorized(new { Errors = new[] { "Invalid credentials." } });
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash))
            {
                _logger.LogWarning("Login failed: Invalid password for email {Email}.", dto.Email);
                return Unauthorized(new { Errors = new[] { "Invalid credentials." } });
            }

            var token = _jwt.GenerateToken(admin);
            _logger.LogInformation("Login successful for email: {Email}", dto.Email);
            return Ok(new { Token = token });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var jti = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti)?.Value;
            var expiry = jwtToken.ValidTo;

            if (string.IsNullOrEmpty(jti) || expiry == default)
            {
                _logger.LogWarning("Logout failed: Invalid token.");
                return BadRequest(new { Errors = new[] { "Invalid token." } });
            }

            var blacklistedToken = new TokenBlacklist
            {
                TokenId = jti,
                ExpiryDate = expiry
            };

            await _context.TokenBlacklist.InsertOneAsync(blacklistedToken);
            _logger.LogInformation("Token blacklisted successfully for admin ID {AdminId}.", User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(new { Message = "Logged out successfully." });
        }
    }
}