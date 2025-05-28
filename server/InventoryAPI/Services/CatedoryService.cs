using InventoryAPI.Data;
using InventoryAPI.Models;
using MongoDB.Driver;

namespace InventoryAPI.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryService(MongoDBContext context)
        {
            _categories = context.Categories;
        }

        public async Task<List<Category>> GetAll() => await _categories.Find(_ => true).ToListAsync();
        public async Task<Category> GetById(string id) => await _categories.Find(c => c.Id == id).FirstOrDefaultAsync();
        public async Task Create(Category category) => await _categories.InsertOneAsync(category);
        public async Task Update(string id, Category category) => await _categories.ReplaceOneAsync(c => c.Id == id, category);
        public async Task Delete(string id) => await _categories.DeleteOneAsync(c => c.Id == id);
    }
}