using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Csw.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateTableEpnSyncLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "epn_sync_log",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    identification_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    processing_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    transaction_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_missing = table.Column<bool>(type: "bit", nullable: false),
                    is_success = table.Column<bool>(type: "bit", nullable: false),
                    error_code_list = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EpnSyncLog", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "epn_sync_log");
        }
    }
}
