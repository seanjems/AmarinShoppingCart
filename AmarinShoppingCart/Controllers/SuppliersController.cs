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
    [Route("api/[Controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly AmarinShoppingCartContext context;
        public SuppliersController(AmarinShoppingCartContext context)
        {
            this.context = context;
        }

        //GET /api/suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplier()
        {
            return await context.suppliers.ToListAsync();
        }

        //GET /api/suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await context.suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return supplier;
        }

        //PUT /api/suppliers/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Supplier>> PutSupplier(int id, Supplier supplier)
        {
            if (supplier.SupplierID != id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            context.Entry(supplier).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }
        //POST /api/suppliers
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier supplier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            context.suppliers.Add(supplier);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostSupplier), supplier);
        }

        //DELETE /api/suppliers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Supplier>> DeleteSupplier(int id)
        {
            var supplier = context.suppliers.Find(id);
            if (supplier==null)
            {
                return NotFound();
            }
            context.suppliers.Remove(supplier);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
