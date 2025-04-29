using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Csw.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSentToEpnFromAnimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "sent_to_epn",
                table: "animal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "sent_to_epn",
                table: "animal",
                type: "datetime2",
                nullable: true);
        }
    }
}
