using AmarinShoppingCart.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmarinShoppingCart.Infrastructure
{
    public class AmarinShoppingCartContext:DbContext
    {
        public AmarinShoppingCartContext(DbContextOptions<AmarinShoppingCartContext> options) : base(options)
        {

        }

        public DbSet<Page> pages { get; set; }
        public DbSet<Category> categories { get; set; }
    }
}
