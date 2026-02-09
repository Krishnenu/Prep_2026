# JWT Token Authorization Guide

## 🔐 Overview

Your application now uses **JWT (JSON Web Token)** for authorization. This means:
- Users receive a token after login/registration
- The token must be included in API requests to access protected endpoints
- The token contains user information (claims) that can be extracted server-side

---

## 🎯 How JWT Authorization Works

### 1. **User Login/Registration**
```
User → POST /api/auth/login → Server validates → Returns JWT token
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huX2RvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImp0aSI6IjEyMzQ1Njc4LTkwYWItY2RlZi0xMjM0LTU2Nzg5MGFiY2RlZiIsIm5hbWVpZCI6IjEiLCJuYmYiOjE3MDc0NzQwMDAsImV4cCI6MTcwNzU2MDQwMCwiaWF0IjoxNzA3NDc0MDAwLCJpc3MiOiJXZWJBcHBsaWNhdGlvbjEiLCJhdWQiOiJXZWJBcHBsaWNhdGlvbjFDbGllbnQifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "username": "john_doe",
  "email": "john@example.com"
}
```

### 2. **Client Stores Token**
The frontend stores the token in `localStorage`:
```javascript
localStorage.setItem('token', data.token);
```

### 3. **Client Sends Token with Requests**
For protected endpoints, include the token in the `Authorization` header:
```javascript
fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

### 4. **Server Validates Token**
The `[Authorize]` attribute automatically:
- Validates the token signature
- Checks expiration
- Extracts user claims
- Allows or denies access

---

## 🔑 JWT Token Structure

Your JWT token contains these **claims** (user information):

```json
{
  "sub": "john_doe",              // Username (Subject)
  "email": "john@example.com",    // Email
  "jti": "unique-token-id",       // JWT ID
  "nameid": "1",                  // User ID
  "nbf": 1707474000,              // Not Before timestamp
  "exp": 1707560400,              // Expiration (24 hours)
  "iat": 1707474000,              // Issued At
  "iss": "WebApplication1",       // Issuer
  "aud": "WebApplication1Client"  // Audience
}
```

**Token Lifetime:** 24 hours (configured in `AuthService.cs`)

---

## 🛡️ Protected Endpoints in Your Application

### 1. **AuthController - Profile Endpoint**

**File:** `Controllers/AuthController.cs`

```csharp
[Authorize]
[HttpGet("profile")]
public IActionResult GetProfile()
{
    var username = User.Identity?.Name;
    var email = User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

    return Ok(new
    {
        username = username,
        email = email,
        message = "This is a protected endpoint"
    });
}
```

**Usage:**
```bash
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 2. **WeatherForecastController - All Endpoints Protected**

**File:** `Controllers/WeatherForecastController.cs`

The entire controller is protected with `[Authorize]` at the class level:

```csharp
[ApiController]
[Route("[controller]")]
[Authorize] // 🔒 All endpoints require JWT token
public class WeatherForecastController : ControllerBase
{
    // ... endpoints
}
```

#### **Endpoint 1: Get Weather Forecast**
```csharp
[HttpGet(Name = "GetWeatherForecast")]
public IActionResult Get()
{
    // Extract user info from JWT claims
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var username = User.FindFirst(ClaimTypes.Name)?.Value ?? User.Identity?.Name;
    var email = User.FindFirst(ClaimTypes.Email)?.Value;

    // Return personalized data
    return Ok(new
    {
        message = $"Weather forecast for {username}",
        userId = userId,
        username = username,
        email = email,
        forecast = forecast
    });
}
```

**Usage:**
```bash
GET http://localhost:5000/weatherforecast
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Weather forecast for john_doe",
  "userId": "1",
  "username": "john_doe",
  "email": "john@example.com",
  "forecast": [
    {
      "date": "2026-02-10",
      "temperatureC": 15,
      "temperatureF": 59,
      "summary": "Warm"
    }
  ]
}
```

---

#### **Endpoint 2: Get Current Weather**
```csharp
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
```

**Usage:**
```bash
GET http://localhost:5000/weatherforecast/current
Authorization: Bearer YOUR_JWT_TOKEN
```

---

#### **Endpoint 3: Public Weather (No Auth Required)**
```csharp
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
```

**Usage:**
```bash
GET http://localhost:5000/weatherforecast/public
# No Authorization header needed!
```

---

## 🔧 How to Extract User Information from JWT

In any protected endpoint, you can access user information from the JWT token:

### **Method 1: Using User.Identity**
```csharp
var username = User.Identity?.Name;
var isAuthenticated = User.Identity?.IsAuthenticated;
```

### **Method 2: Using Claims**
```csharp
using System.Security.Claims;

var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
var username = User.FindFirst(ClaimTypes.Name)?.Value;
var email = User.FindFirst(ClaimTypes.Email)?.Value;
```

### **Method 3: Get All Claims**
```csharp
var claims = User.Claims.Select(c => new 
{
    Type = c.Type,
    Value = c.Value
});
```

---

## 🧪 Testing JWT Authorization

### **Using Postman or Thunder Client**

#### 1. **Login to Get Token**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Copy the token from the response.**

#### 2. **Call Protected Endpoint**
```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. **Test Without Token (Should Fail)**
```http
GET http://localhost:5000/api/auth/profile
# No Authorization header
```

**Expected Response:** `401 Unauthorized`

---

### **Using cURL**

```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'

# 2. Use token (replace YOUR_TOKEN)
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Test weather endpoint
curl http://localhost:5000/weatherforecast \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Test public endpoint (no token needed)
curl http://localhost:5000/weatherforecast/public
```

---

### **Using JavaScript (Frontend)**

```javascript
// Get token from localStorage
const token = localStorage.getItem('token');

// Call protected endpoint
const response = await fetch('http://localhost:5000/weatherforecast', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data);
```

---

## 🎨 Frontend Integration

Your React frontend already handles JWT authorization automatically in `authService.js`:

```javascript
async getProfile() {
  const token = this.getToken();
  
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}
```

---

## 🔒 Authorization Attributes

### **[Authorize]** - Requires Authentication
```csharp
[Authorize]
[HttpGet("protected")]
public IActionResult ProtectedEndpoint()
{
    // Only authenticated users can access
}
```

### **[AllowAnonymous]** - Public Access
```csharp
[AllowAnonymous]
[HttpGet("public")]
public IActionResult PublicEndpoint()
{
    // Anyone can access, even without token
}
```

### **Controller-Level Authorization**
```csharp
[Authorize] // All endpoints in this controller require auth
public class SecureController : ControllerBase
{
    [HttpGet("endpoint1")] // Protected
    public IActionResult Endpoint1() { }

    [HttpGet("endpoint2")] // Protected
    public IActionResult Endpoint2() { }

    [AllowAnonymous] // Override: This one is public
    [HttpGet("public")]
    public IActionResult PublicEndpoint() { }
}
```

---

## ⚙️ JWT Configuration

**File:** `Program.cs`

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});
```

**File:** `appsettings.json`

```json
{
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "WebApplication1",
    "Audience": "WebApplication1Client"
  }
}
```

---

## 🚨 Common Authorization Errors

### **401 Unauthorized**
**Cause:** No token provided or invalid token
```json
{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401
}
```

**Solution:** 
- Ensure you're sending the token in the `Authorization` header
- Check token format: `Bearer YOUR_TOKEN`
- Verify token hasn't expired

### **403 Forbidden**
**Cause:** Token is valid but user doesn't have permission
**Solution:** Check role-based authorization (if implemented)

---

## 📋 Complete API Endpoint Summary

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/auth/register` | POST | ❌ No | Register new user |
| `/api/auth/login` | POST | ❌ No | Login user |
| `/api/auth/profile` | GET | ✅ Yes | Get user profile |
| `/weatherforecast` | GET | ✅ Yes | Get weather forecast |
| `/weatherforecast/current` | GET | ✅ Yes | Get current weather |
| `/weatherforecast/public` | GET | ❌ No | Public weather data |

---

## 🎯 Next Steps: Advanced Authorization

### **1. Role-Based Authorization**
```csharp
[Authorize(Roles = "Admin")]
[HttpGet("admin-only")]
public IActionResult AdminEndpoint()
{
    return Ok("Only admins can see this");
}
```

### **2. Policy-Based Authorization**
```csharp
[Authorize(Policy = "MinimumAge")]
[HttpGet("age-restricted")]
public IActionResult AgeRestrictedEndpoint()
{
    return Ok("Must be 18+");
}
```

### **3. Custom Authorization Handlers**
Create custom logic for complex authorization scenarios.

---

## ✅ Summary

Your application now has **complete JWT authorization** implemented:

✅ **Token Generation** - Users get JWT tokens on login/register  
✅ **Token Validation** - Automatic validation on protected endpoints  
✅ **Claims Extraction** - Access user info from tokens  
✅ **Protected Endpoints** - `/api/auth/profile`, `/weatherforecast/*`  
✅ **Public Endpoints** - `/api/auth/login`, `/api/auth/register`, `/weatherforecast/public`  
✅ **Frontend Integration** - React app automatically sends tokens  

**Test it now:**
1. Login via the React app or Postman
2. Copy the JWT token
3. Call protected endpoints with the token
4. See personalized responses with your user data!

---

**For more information, see:**
- `Controllers/AuthController.cs` - Auth endpoints
- `Controllers/WeatherForecastController.cs` - Protected weather endpoints
- `Services/AuthService.cs` - JWT token generation
- `Program.cs` - JWT configuration
