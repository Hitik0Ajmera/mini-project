using InventoryAPI.Data;
using InventoryAPI.Models;
using InventoryAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly MongoDBContext _context;
        private readonly ProductService _productService;
        private readonly CategoryService _categoryService;
        private readonly ILogger<AdminController> _logger;

        public AdminController(MongoDBContext context, ProductService productService, CategoryService categoryService, ILogger<AdminController> logger)
        {
            _context = context;
            _productService = productService;
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var adminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(adminId))
            {
                _logger.LogWarning("Profile access failed: Invalid admin ID.");
                return Unauthorized();
            }

            var admin = await _context.Admins.Find(a => a.Id == adminId).FirstOrDefaultAsync();
            if (admin == null)
            {
                _logger.LogWarning("Profile access failed: Admin not found for ID {AdminId}.", adminId);
                return NotFound("Admin not found.");
            }

            return Ok(new
            {
                admin.Id,
                admin.Name,
                admin.Email,
                admin.Phone,
                admin.Address,
                admin.PhotoUrl
            });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateAdminDto dto)
        {
            var adminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(adminId))
            {
                _logger.LogWarning("Profile update failed: Invalid admin ID.");
                return Unauthorized();
            }

            var admin = await _context.Admins.Find(a => a.Id == adminId).FirstOrDefaultAsync();
            if (admin == null)
            {
                _logger.LogWarning("Profile update failed: Admin not found for ID {AdminId}.", adminId);
                return NotFound("Admin not found.");
            }

            admin.Name = dto.Name ?? admin.Name;
            admin.Phone = dto.Phone ?? admin.Phone;
            admin.Address = dto.Address ?? admin.Address;
            admin.PhotoUrl = dto.PhotoUrl ?? admin.PhotoUrl;

            await _context.Admins.ReplaceOneAsync(a => a.Id == adminId, admin);
            _logger.LogInformation("Profile updated successfully for admin ID {AdminId}.", adminId);
            return Ok("Profile updated successfully.");
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            var products = await _productService.GetAll();
            var categories = await _categoryService.GetAll();
            var totalStock = products.Sum(p => p.Stock);
            var lowStockProducts = products.Where(p => p.Stock < 10).ToList(); // Example threshold

            return Ok(new
            {
                TotalProducts = products.Count,
                TotalCategories = categories.Count,
                TotalStock = totalStock,
                LowStockProducts = lowStockProducts.Select(p => new { p.Id, p.Name, p.Stock }),
                Categories = categories
            });
        }
    }
}