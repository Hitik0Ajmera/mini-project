using InventoryAPI.Data;
using InventoryAPI.Models;
using MongoDB.Driver;

namespace InventoryAPI.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(MongoDBContext context)
        {
            _products = context.Products;
        }

        public async Task<List<Product>> GetAll() => await _products.Find(_ => true).ToListAsync();
        public async Task<Product> GetById(string id) => await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
        public async Task Create(Product product) => await _products.InsertOneAsync(product);
        public async Task Update(string id, Product product) => await _products.ReplaceOneAsync(p => p.Id == id, product);
        public async Task Delete(string id) => await _products.DeleteOneAsync(p => p.Id == id);
    }
}
