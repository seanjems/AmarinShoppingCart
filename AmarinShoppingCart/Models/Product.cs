using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AmarinShoppingCart.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Barcode")]
        [MinLength(2, ErrorMessage = "Minimum length is 2")]
        public string barCode { get; set; }

        [DisplayName("slug")]
        public string Slug { get; set; }

        public string Description { get; set; }

        [Required]
        [DisplayName("ProductName")]
        public string productName { get; set; }

        [DisplayName("CostInc")]
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal costInclusive { get; set; }

        [DisplayName("PriceInc"), Column(TypeName = "decimal(18,2)")]
        public decimal priceInclusive { get; set; }

        [DisplayName("Category")]
        [Range(1, int.MaxValue, ErrorMessage = "Category is required")]
        public int categoryId { get; set; }

        [ForeignKey("categoryId")]
        public virtual Category Category { get; set; }
        [DisplayName("Supplier")]
        public int supplierId { get; set; }
        [ForeignKey("supplierId")]
        public virtual Supplier Supplier { get; set; }
        
        public bool isDeleted { get; set; }
        
    }
}
