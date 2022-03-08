
using AmarinShoppingCart.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmarinShoppingCart.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AmarinShoppingCartContext
                (serviceProvider.GetRequiredService<DbContextOptions<AmarinShoppingCartContext>>()))
            {
                if (context.pages.Any())
                {
                    return;
                }

                context.pages.AddRange(
                    new Page
                    {
                        Title = "Home",
                        Slug = "home",
                        Content = "This is the default home page Please customise it. All static files for the home page can be injected here via CK editor.",
                        Sorting = 0
                    },
                     new Page
                     {
                         Title = "About us",
                         Slug = "about-us",
                         Content = "This page holds all the static files related to about us",
                         Sorting = 100
                     }
                    

                    );
                context.SaveChanges();
            }
        }
    }
}
