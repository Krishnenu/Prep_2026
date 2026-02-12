using authGuard.Data;
using authGuard.Interface;
using authGuard.Models;
using Microsoft.EntityFrameworkCore;

namespace authGuard.Services
{
    public class UserImplimentation: Iusers
  
        {
            private readonly AppDbContext _context;

            public UserImplimentation(AppDbContext context)
            {
                _context = context;
            }

            public async Task<List<Users>> GetUsersAsync()
            {
                return await _context.Users.Where(u => u.Username != null && u.Password != null).ToListAsync();
        }
        }

    }


