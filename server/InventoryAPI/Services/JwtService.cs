using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InventoryAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace InventoryAPI.Services
{
    public class JwtService
    {
        private readonly string _key;

        public JwtService(IConfiguration config)
        {
            _key = config["Jwt:Key"] ?? throw new ArgumentNullException("JWT key is missing.");
            if (_key.Length < 32) throw new ArgumentException("JWT key must be at least 32 characters long.");
        }

        public string GenerateToken(Admin admin)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id ?? string.Empty),
                new Claim(ClaimTypes.Name, admin.Name ?? string.Empty),
                new Claim(ClaimTypes.Email, admin.Email ?? string.Empty),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "InventoryAPI",
                audience: "InventoryAPI",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}