using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// Example controller demonstrating advanced JWT authorization patterns
    /// This is a TEMPLATE for future enhancements - not currently active
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // All endpoints require authentication
    public class ExampleAuthController : ControllerBase
    {
        /// <summary>
        /// Basic protected endpoint - Any authenticated user can access
        /// </summary>
        [HttpGet("basic")]
        public IActionResult BasicProtectedEndpoint()
        {
            var username = User.Identity?.Name;
            return Ok(new
            {
                message = $"Hello {username}, you are authenticated!",
                endpoint = "basic-protected"
            });
        }

        /// <summary>
        /// Public endpoint - No authentication required
        /// Overrides the controller-level [Authorize] attribute
        /// </summary>
        [AllowAnonymous]
        [HttpGet("public")]
        public IActionResult PublicEndpoint()
        {
            return Ok(new
            {
                message = "This is a public endpoint - no JWT token required",
                endpoint = "public"
            });
        }

        /// <summary>
        /// Get current user information from JWT claims
        /// </summary>
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var username = User.Identity?.Name;
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;

            return Ok(new
            {
                userId = userId,
                username = username,
                email = email,
                isAuthenticated = User.Identity?.IsAuthenticated ?? false
            });
        }

        // ============================================
        // FUTURE ENHANCEMENTS - Role-Based Authorization
        // ============================================
        // Uncomment and implement when you add roles to your User model

        /*
        /// <summary>
        /// Admin-only endpoint - Requires "Admin" role
        /// To implement: Add Roles property to User model and include role claim in JWT
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]
        public IActionResult AdminOnlyEndpoint()
        {
            return Ok(new
            {
                message = "This endpoint is only accessible to admins",
                endpoint = "admin-only"
            });
        }

        /// <summary>
        /// Multiple roles - User must have either Admin or Manager role
        /// </summary>
        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("admin-or-manager")]
        public IActionResult AdminOrManagerEndpoint()
        {
            var roles = User.Claims
                .Where(c => c.Type == System.Security.Claims.ClaimTypes.Role)
                .Select(c => c.Value);

            return Ok(new
            {
                message = "Accessible to Admin or Manager",
                userRoles = roles
            });
        }
        */

        // ============================================
        // FUTURE ENHANCEMENTS - Policy-Based Authorization
        // ============================================
        // Uncomment when you configure policies in Program.cs

        /*
        /// <summary>
        /// Policy-based authorization example
        /// Configure in Program.cs:
        /// builder.Services.AddAuthorization(options =>
        /// {
        ///     options.AddPolicy("MinimumAge", policy =>
        ///         policy.RequireClaim("age", "18", "19", "20", ...));
        /// });
        /// </summary>
        [Authorize(Policy = "MinimumAge")]
        [HttpGet("age-restricted")]
        public IActionResult AgeRestrictedEndpoint()
        {
            return Ok(new
            {
                message = "You meet the age requirement",
                endpoint = "age-restricted"
            });
        }
        */

        // ============================================
        // FUTURE ENHANCEMENTS - Custom Claims
        // ============================================

        /*
        /// <summary>
        /// Example of using custom claims
        /// Add custom claims in AuthService.cs when generating JWT:
        /// new Claim("department", user.Department),
        /// new Claim("subscription", user.SubscriptionLevel)
        /// </summary>
        [HttpGet("subscription-info")]
        public IActionResult GetSubscriptionInfo()
        {
            var subscription = User.FindFirst("subscription")?.Value;
            var department = User.FindFirst("department")?.Value;

            return Ok(new
            {
                subscription = subscription ?? "Free",
                department = department ?? "None",
                message = "Custom claims from JWT token"
            });
        }
        */

        // ============================================
        // USEFUL PATTERNS
        // ============================================

        /// <summary>
        /// Example: Check if user owns a resource before allowing access
        /// </summary>
        [HttpGet("resource/{id}")]
        public IActionResult GetUserResource(int id)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            // In real app, check if resource belongs to user
            // var resource = _repository.GetById(id);
            // if (resource.UserId != int.Parse(userId))
            //     return Forbid(); // 403 Forbidden

            return Ok(new
            {
                message = $"Resource {id} belongs to user {userId}",
                resourceId = id,
                userId = userId
            });
        }

        /// <summary>
        /// Example: Return different data based on authentication status
        /// </summary>
        [AllowAnonymous]
        [HttpGet("conditional")]
        public IActionResult ConditionalData()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var username = User.Identity.Name;
                return Ok(new
                {
                    message = $"Welcome back, {username}!",
                    data = "Full data for authenticated users",
                    premium = true
                });
            }
            else
            {
                return Ok(new
                {
                    message = "Welcome, guest!",
                    data = "Limited data for anonymous users",
                    premium = false
                });
            }
        }

        /// <summary>
        /// Example: Manual authorization check
        /// </summary>
        [HttpGet("manual-check")]
        public IActionResult ManualAuthorizationCheck()
        {
            // Check if user is authenticated
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Unauthorized(new { message = "You must be logged in" });
            }

            // Check specific claim
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return Forbid(); // 403 Forbidden
            }

            // Check custom business logic
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (int.Parse(userId ?? "0") < 1)
            {
                return BadRequest(new { message = "Invalid user ID" });
            }

            return Ok(new
            {
                message = "All authorization checks passed",
                userId = userId,
                email = email
            });
        }
    }
}
