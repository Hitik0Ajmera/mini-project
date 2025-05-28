using Microsoft.AspNetCore.Mvc;
using InventoryAPI.Models;
using InventoryAPI.Services;

namespace InventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get() => await _productService.GetAll();

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(string id)
        {
            var product = await _productService.GetById(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpPost]
        public async Task<ActionResult> Post(Product product)
        {
            await _productService.Create(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, Product product)
        {
            var existing = await _productService.GetById(id);
            if (existing == null) return NotFound();
            product.Id = id;
            await _productService.Update(id, product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var existing = await _productService.GetById(id);
            if (existing == null) return NotFound();
            await _productService.Delete(id);
            return NoContent();
        }
    }
}
