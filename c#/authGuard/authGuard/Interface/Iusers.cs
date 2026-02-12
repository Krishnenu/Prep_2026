using authGuard.Models;

namespace authGuard.Interface
{
    public interface Iusers
    {
        Task<List<Users>> GetUsersAsync();

    }
}
