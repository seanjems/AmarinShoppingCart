using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AmarinShoppingCart.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierID { get; set; }
        public string AccountNumber { get; set; }
        [Required]
        [MinLength(2, ErrorMessage = "Minimum length is 2")]
        public string FullName { get; set; }
        public string Contact { get; set; }
        public string CardNumber { get; set; }
        public string VatNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal creditLimit { get; set; }
        public bool deleted { get; set; }
        public string Company { get; set; }
    }
}
