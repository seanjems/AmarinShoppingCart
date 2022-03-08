using Microsoft.EntityFrameworkCore.Migrations;

namespace AmarinShoppingCart.Migrations
{
    public partial class AddProductsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    barCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slug = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    productName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    costInclusive = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    priceInclusive = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false),
                    supplierId = table.Column<int>(type: "int", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_products_categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_products_suppliers_supplierId",
                        column: x => x.supplierId,
                        principalTable: "suppliers",
                        principalColumn: "SupplierID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_products_categoryId",
                table: "products",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_products_supplierId",
                table: "products",
                column: "supplierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "products");
        }
    }
}
