using authGuard.Interface;
using Microsoft.AspNetCore.Mvc;

namespace authGuard.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly Iusers _userService;

        public UsersController(Iusers userService)
        {
            _userService = userService;
        }
            [HttpGet]
            public async Task<IActionResult> GetUsers()
            {
                var users = await _userService.GetUsersAsync();
                
                return Ok(users);
            }
        }
}
