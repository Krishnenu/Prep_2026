using authGuard.Interface;
using authGuard.Models;
using Microsoft.AspNetCore.Mvc;

namespace authGuard.Controllers
{
    [ApiController]
    [Route("/users")]
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
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Users user)
        {
            if (user == null)
                return BadRequest();

            await _userService.AddUserAsync(user);

            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result)
                return NotFound($"User with id {id} not found");

            return Ok($"User with id {id} deleted successfully");
        }


    }


}
