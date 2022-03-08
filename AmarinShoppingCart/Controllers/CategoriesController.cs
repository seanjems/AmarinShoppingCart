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
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AmarinShoppingCartContext context;
        public CategoriesController(AmarinShoppingCartContext context)
        {
            this.context = context;
        }

        //GET /api/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await context.categories.OrderBy(x => x.Sorting).ToListAsync();
        }

        //GET /api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategories(int id)
        {
            var category = await context.categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        //PUT /api/categories/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> PutCategory(int id, Category category)
        {
            if (category.Id != id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            context.Entry(category).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }
        //POST /api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            context.categories.Add(category);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostCategory), category);
        }

        //DELETE /api/categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = context.categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            context.categories.Remove(category);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
