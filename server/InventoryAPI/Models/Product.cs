using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace InventoryAPI.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, 100)]
        public decimal Discount { get; set; }

        public decimal FinalPrice { get; set; }

        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        public string Description { get; set; } = null!;

        public string ImageUrl { get; set; } = null!;

        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; } = null!;
    }
}