using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        
        public DbSet<Categoria> Categorias { get; set; }
    }
}