using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize] // 🔒 Requires JWT token for all endpoints in this controller
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        /// <summary>
        /// Get weather forecast - Protected endpoint requiring JWT token
        /// </summary>
        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get()
        {
            // Extract user information from JWT token claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value ?? User.Identity?.Name;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            var forecast = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();

            // Return weather data along with user info from JWT token
            return Ok(new
            {
                message = $"Weather forecast for {username}",
                userId = userId,
                username = username,
                email = email,
                forecast = forecast
            });
        }

        /// <summary>
        /// Get current weather - Another protected endpoint example
        /// </summary>
        [HttpGet("current")]
        public IActionResult GetCurrent()
        {
            var username = User.Identity?.Name;

            return Ok(new
            {
                message = $"Current weather for {username}",
                temperature = Random.Shared.Next(-20, 55),
                summary = Summaries[Random.Shared.Next(Summaries.Length)],
                timestamp = DateTime.UtcNow
            });
        }

        /// <summary>
        /// Public endpoint - No authorization required
        /// Demonstrates mixing public and protected endpoints
        /// </summary>
        [AllowAnonymous]
        [HttpGet("public")]
        public IActionResult GetPublicWeather()
        {
            return Ok(new
            {
                message = "This is a public endpoint - no JWT token required",
                temperature = Random.Shared.Next(-20, 55),
                summary = Summaries[Random.Shared.Next(Summaries.Length)]
            });
        }
    }
}
