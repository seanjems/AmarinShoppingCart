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

        public async Task<ActionResult<IEnumerable<Page>>> GetPages()
        {
            return await context.pages.OrderBy(x => x.Sorting).ToListAsync();
        }
    }
}
