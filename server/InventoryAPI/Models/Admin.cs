using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace InventoryAPI.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;

        [Phone]
        public string Phone { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string PhotoUrl { get; set; } = null!;
    }
}