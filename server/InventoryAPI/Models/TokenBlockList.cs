using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace InventoryAPI.Models
{
    public class TokenBlacklist
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("TokenId")]
        public string TokenId { get; set; } = string.Empty;

        [BsonElement("ExpiryDate")]
        public DateTime ExpiryDate { get; set; }
    }
}