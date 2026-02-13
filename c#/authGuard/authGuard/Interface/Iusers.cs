using authGuard.Models;

namespace authGuard.Interface
{
    public interface Iusers
    {
        Task<List<Users>> GetUsersAsync();
        Task AddUserAsync(Users user);
        Task<bool> DeleteUserAsync(int id);

    }

}
