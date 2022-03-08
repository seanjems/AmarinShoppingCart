using AmarinShoppingCart.Infrastructure;
using AmarinShoppingCart.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmarinShoppingCart.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AmarinShoppingCartContext context;
        public ProductsController(AmarinShoppingCartContext context)
        {
            this.context = context;
        }

        //GET /api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await context.products.Take(50).ToListAsync();
        }

        //GET /api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProducts(int id)
        {
            var product = await context.products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        //PUT /api/products/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(int id, Product product)
        {
            if (product.Id != id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            context.Entry(product).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }
        //POST /api/products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            context.products.Add(product);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostProduct), product);
        }

        //DELETE /api/products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = context.products.Find(id);
            context.products.Remove(product);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
