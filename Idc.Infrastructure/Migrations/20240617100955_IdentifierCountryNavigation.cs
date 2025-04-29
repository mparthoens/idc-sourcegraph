using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Csw.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IdentifierCountryNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK__identifier__country_c__45943E77",
                table: "identifier",
                column: "country_code",
                principalTable: "country",
                principalColumn: "code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__identifier__country_c__45943E77",
                table: "identifier");
        }
    }
}
