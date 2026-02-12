using Microsoft.EntityFrameworkCore;
using authGuard.Models;

namespace authGuard.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Users> Users => Set<Users>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Users>()
            .ToTable("UserInfo");

        base.OnModelCreating(modelBuilder);
    }
}
