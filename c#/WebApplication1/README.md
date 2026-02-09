# Authentication Project

A full-stack authentication system with ASP.NET Core Web API backend and React frontend.

## Features

### Backend (ASP.NET Core)
- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Password hashing (SHA256)
- ✅ Protected API endpoints
- ✅ SQL Server database with Entity Framework Core
- ✅ CORS configuration for React frontend

### Frontend (React + Vite)
- ✅ Modern, beautiful UI with glassmorphism effects
- ✅ Login page
- ✅ Registration page
- ✅ Dashboard with user profile
- ✅ Token-based authentication
- ✅ Protected routes
- ✅ Smooth animations and transitions
- ✅ Responsive design

## Prerequisites

- .NET 10.0 SDK
- Node.js (v18 or higher)
- SQL Server LocalDB (comes with Visual Studio) or SQL Server

## Database Setup

The application uses **SQL Server** with the following connection string (configured in `appsettings.json`):

```
Server=(localdb)\\mssqllocaldb;Database=AuthDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True
```

### Alternative SQL Server Configurations

If you want to use a different SQL Server instance, update the connection string in `WebApplication1/appsettings.json`:

**For SQL Server Express:**
```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=AuthDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
```

**For SQL Server with username/password:**
```json
"DefaultConnection": "Server=YOUR_SERVER;Database=AuthDb;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;MultipleActiveResultSets=true;TrustServerCertificate=True"
```

**For Azure SQL:**
```json
"DefaultConnection": "Server=tcp:YOUR_SERVER.database.windows.net,1433;Database=AuthDb;User ID=YOUR_USERNAME;Password=YOUR_PASSWORD;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```

## Running the Application

### 1. Start the Backend (ASP.NET Core API)

```bash
cd WebApplication1
dotnet restore
dotnet run
```

The API will start on `http://localhost:5000` (or `https://localhost:5001`)

**Note:** The database will be created automatically on first run using `EnsureCreated()`.

### 2. Start the Frontend (React)

Open a new terminal:

```bash
cd auth-frontend
npm install  # if not already installed
npm run dev
```

The React app will start on `http://localhost:5173`

## API Endpoints

### Public Endpoints

- **POST** `/api/auth/register` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **POST** `/api/auth/login` - Login
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Protected Endpoints

- **GET** `/api/auth/profile` - Get user profile (requires JWT token)
  - Header: `Authorization: Bearer <token>`

## Project Structure

```
WebApplication1/
├── Controllers/
│   └── AuthController.cs          # Authentication endpoints
├── Data/
│   └── ApplicationDbContext.cs    # EF Core DbContext
├── Models/
│   ├── User.cs                    # User entity
│   ├── LoginRequest.cs            # Login DTO
│   ├── RegisterRequest.cs         # Registration DTO
│   └── AuthResponse.cs            # Auth response DTO
├── Services/
│   ├── IAuthService.cs            # Auth service interface
│   └── AuthService.cs             # Auth service implementation
├── Program.cs                     # App configuration
└── appsettings.json               # Configuration

auth-frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Login component
│   │   ├── Register.jsx           # Registration component
│   │   └── Dashboard.jsx          # Dashboard component
│   ├── services/
│   │   └── authService.js         # API service
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Styles
└── index.html                     # HTML template
```

## Database Migrations (Optional)

If you want to use migrations instead of `EnsureCreated()`:

1. Install EF Core tools (if not already installed):
   ```bash
   dotnet tool install --global dotnet-ef
   ```

2. Create initial migration:
   ```bash
   cd WebApplication1
   dotnet ef migrations add InitialCreate
   ```

3. Update database:
   ```bash
   dotnet ef database update
   ```

4. Remove `EnsureCreated()` from `Program.cs` (lines 60-64)

## Security Notes

⚠️ **Important for Production:**

1. **Change the JWT Secret Key** in `appsettings.json` to a strong, random value
2. **Use a stronger password hashing algorithm** (e.g., BCrypt, Argon2) instead of SHA256
3. **Enable HTTPS** in production
4. **Add rate limiting** to prevent brute force attacks
5. **Implement refresh tokens** for better security
6. **Add email verification** for registration
7. **Store sensitive configuration** in environment variables or Azure Key Vault

## Testing the Application

1. Open the React app at `http://localhost:5173`
2. Click "Sign up" to create a new account
3. Fill in the registration form (username, email, password)
4. After successful registration, you'll be logged in automatically
5. You'll see the dashboard with your profile information
6. Click "Sign Out" to logout
7. Use "Sign in" to login with your credentials

## Troubleshooting

### Backend Issues

- **Database connection error**: Make sure SQL Server LocalDB is installed
- **Port already in use**: Change the port in `Properties/launchSettings.json`
- **CORS error**: Verify the CORS policy in `Program.cs` includes your frontend URL

### Frontend Issues

- **API connection error**: Make sure the backend is running on port 5000
- **Module not found**: Run `npm install` in the auth-frontend directory
- **Port already in use**: Vite will automatically suggest a different port

## Technologies Used

### Backend
- ASP.NET Core 10.0
- Entity Framework Core 10.0
- SQL Server
- JWT Bearer Authentication
- System.IdentityModel.Tokens.Jwt

### Frontend
- React 18
- Vite
- Modern CSS with Glassmorphism
- Google Fonts (Inter)

## License

This is a demonstration project for learning purposes.
