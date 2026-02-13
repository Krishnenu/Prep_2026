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
            public async Task AddUserAsync(Users user)
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            public async Task<bool> DeleteUserAsync(int id)
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
                    return false;

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return true;
            }


    }

}


