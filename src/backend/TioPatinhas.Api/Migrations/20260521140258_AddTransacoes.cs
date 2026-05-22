using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TioPatinhas.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTransacoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Categorias",
                newName: "UserId");

            migrationBuilder.CreateTable(
                name: "Transacoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Valor = table.Column<decimal>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transacoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoriaTransacao",
                columns: table => new
                {
                    CategoriasId = table.Column<int>(type: "INTEGER", nullable: false),
                    TransacoesId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaTransacao", x => new { x.CategoriasId, x.TransacoesId });
                    table.ForeignKey(
                        name: "FK_CategoriaTransacao_Categorias_CategoriasId",
                        column: x => x.CategoriasId,
                        principalTable: "Categorias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoriaTransacao_Transacoes_TransacoesId",
                        column: x => x.TransacoesId,
                        principalTable: "Transacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoriaTransacao_TransacoesId_CategoriasId",
                table: "CategoriaTransacao",
                columns: new[] { "TransacoesId", "CategoriasId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriaTransacao");

            migrationBuilder.DropTable(
                name: "Transacoes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Categorias",
                newName: "UsuarioId");
        }
    }
}
