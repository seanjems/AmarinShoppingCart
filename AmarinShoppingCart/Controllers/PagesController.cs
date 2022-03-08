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
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly AmarinShoppingCartContext context;
        public PagesController(AmarinShoppingCartContext context)
        {
            this.context = context;
        }

        //GET /api/pages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Page>>> GetPages()
        {
            return await context.pages.OrderBy(x => x.Sorting).ToListAsync();
        }

        //GET /api/pages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Page>> GetPage (int id)
        {
            var page = await context.pages.FindAsync(id);
            if (page==null)
            {
                return NotFound();
            }
            return page;
        }

        //PUT /api/pages/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Page>> PutPage(int id, Page page)
        {
            if (page.Id != id || !ModelState.IsValid)
            {
                return BadRequest();
            }
            context.Entry(page).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return NoContent();
        }
        //POST /api/pages
        [HttpPost]
        public async Task<ActionResult<Page>> PostPage(Page page)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            context.pages.Add(page);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostPage), page);
        }

        //DELETE /api/pages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Page>> DeletePage(int id)
        {
            var page = context.pages.Find(id);
            if (page == null)
            {
                return NotFound();
            }
            context.pages.Remove(page);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
