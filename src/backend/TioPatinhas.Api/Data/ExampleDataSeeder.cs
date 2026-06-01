using Microsoft.EntityFrameworkCore;
using TioPatinhas.Api.DTOs;
using TioPatinhas.Api.Models;
using TioPatinhas.Api.Services;

namespace TioPatinhas.Api.Data
{
    /// <summary>
    /// Popula o SQLite com usuário e dados de demonstração (apenas se ainda não existir).
    /// Login: demo@tiopatinhas.dev / Demo@123
    /// </summary>
    public static class ExampleDataSeeder
    {
        public const string DemoEmail = "demo@tiopatinhas.dev";
        public const string DemoPassword = "Demo@123";

        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            if (await db.Users.AnyAsync(u => u.Email == DemoEmail))
                return;

            var user = new User
            {
                Name = "Usuário Demo",
                Email = DemoEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(DemoPassword)
            };
            db.Users.Add(user);
            await db.SaveChangesAsync();

            var tx = scope.ServiceProvider.GetRequiredService<ITransactionService>();
            var inv = scope.ServiceProvider.GetRequiredService<IInvestmentService>();
            var goals = scope.ServiceProvider.GetRequiredService<IGoalService>();

            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var samples = new[]
            {
                ("Salário", "Receitas Principais", today.AddMonths(-5), 4500m, "income"),
                ("Freelance", "Lucros e Dividendos", today.AddMonths(-4), 1200m, "income"),
                ("Salário", "Receitas Principais", today.AddMonths(-3), 4500m, "income"),
                ("Salário", "Receitas Principais", today.AddMonths(-2), 4500m, "income"),
                ("Salário", "Receitas Principais", today.AddMonths(-1), 4500m, "income"),
                ("Salário", "Receitas Principais", today, 4500m, "income"),
                ("Aluguel", "Moradia", today.AddMonths(-5), 1500m, "expense"),
                ("Supermercado", "Alimentação", today.AddMonths(-4), 800m, "expense"),
                ("Transporte", "Transporte", today.AddMonths(-3), 350m, "expense"),
                ("Restaurantes", "Alimentação", today.AddMonths(-2), 420m, "expense"),
                ("Conta de luz", "Moradia", today.AddMonths(-1), 280m, "expense"),
                ("Combustível", "Transporte", today, 200m, "expense"),
            };

            foreach (var (desc, cat, date, amount, type) in samples)
            {
                await tx.CreateFromContractAsync(
                    new TransactionContractRequestDto
                    {
                        Description = desc,
                        Category = cat,
                        Date = date.ToString("yyyy-MM-dd"),
                        Amount = amount,
                        Type = type
                    },
                    user.Id);
            }

            await inv.CreateAsync(
                new InvestmentRequestDto
                {
                    Asset = "BTC",
                    Amount = 0.01m,
                    PurchasePrice = 320000m,
                    Date = today.AddMonths(-2).ToString("yyyy-MM-dd")
                },
                user.Id);

            await inv.CreateAsync(
                new InvestmentRequestDto
                {
                    Asset = "Tesouro Direto",
                    Amount = 5m,
                    PurchasePrice = 1000m,
                    Date = today.AddMonths(-1).ToString("yyyy-MM-dd")
                },
                user.Id);

            await goals.CreateAsync(
                new CreateGoalDto(
                    "Reserva de emergência",
                    10000m,
                    3500m,
                    today.AddMonths(6).ToString("yyyy-MM-dd"),
                    "short_term"),
                user.Id);

            await goals.CreateAsync(
                new CreateGoalDto(
                    "Viagem internacional",
                    25000m,
                    8000m,
                    today.AddYears(2).ToString("yyyy-MM-dd"),
                    "long_term"),
                user.Id);
        }
    }
}
