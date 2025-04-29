using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Csw.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IdentificationEpnDateInsertDateUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "epn_date_insert",
                table: "identification",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "epn_date_update",
                table: "identification",
                type: "datetime",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IDX_epn_date_insert",
                table: "identification",
                column: "epn_date_insert");

            migrationBuilder.CreateIndex(
                name: "IDX_epn_date_update",
                table: "identification",
                column: "epn_date_update");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IDX_epn_date_insert",
                table: "identification");

            migrationBuilder.DropIndex(
                name: "IDX_epn_date_update",
                table: "identification");

            migrationBuilder.DropColumn(
                name: "epn_date_insert",
                table: "identification");

            migrationBuilder.DropColumn(
                name: "epn_date_update",
                table: "identification");
        }
    }
}
