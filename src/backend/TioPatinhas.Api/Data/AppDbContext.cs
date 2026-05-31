using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.Models;

namespace TioPatinhas.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        
        public DbSet<Category> Categories { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                .HasMany(t => t.Categories)
                .WithMany(c => c.Transactions)
                .UsingEntity(j => j.HasIndex("TransactionsId", "CategoriesId").IsUnique());
        }
        public DbSet<Goal> Goals { get; set; }
    }
}