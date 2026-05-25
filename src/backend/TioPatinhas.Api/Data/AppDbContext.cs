using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        
        public DbSet<Categoria> Categorias { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        modelBuilder.Entity<Transacao>()
            .HasMany(t => t.Categorias)
            .WithMany(c => c.Transacoes)
            .UsingEntity(j => j.HasIndex("TransacoesId", "CategoriasId").IsUnique());
        }
        public DbSet<Goal> Goals { get; set; }
    }
}