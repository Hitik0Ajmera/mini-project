using Microsoft.Extensions.Options;
using MongoDB.Driver;
using InventoryAPI.Models;

namespace InventoryAPI.Data
{
    public class MongoDBContext
    {
        private readonly IMongoDatabase _database;

        public MongoDBContext(IConfiguration config)
        {
            var connectionString = config["MongoDB:ConnectionString"] ?? throw new ArgumentNullException("MongoDB connection string is missing.");
            var databaseName = config["MongoDB:DatabaseName"] ?? throw new ArgumentNullException("MongoDB database name is missing.");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Product> Products =>
            _database.GetCollection<Product>("Products");

        public IMongoCollection<Admin> Admins =>
            _database.GetCollection<Admin>("Admins");

        public IMongoCollection<Category> Categories =>
            _database.GetCollection<Category>("Categories");
    }
}