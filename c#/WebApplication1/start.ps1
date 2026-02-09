# Authentication Project - Quick Start Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Authentication Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .NET is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✓ .NET SDK installed: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ .NET SDK not found. Please install .NET 10.0 SDK" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Backend (ASP.NET Core API)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\WebApplication1'; Write-Host 'Starting ASP.NET Core API...' -ForegroundColor Green; dotnet run"

Write-Host "✓ Backend starting in new window..." -ForegroundColor Green
Write-Host "  API will be available at: http://localhost:5000" -ForegroundColor Cyan

# Wait a bit for backend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Frontend (React + Vite)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "$PSScriptRoot\auth-frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\auth-frontend"
    npm install
}

# Start frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\auth-frontend'; Write-Host 'Starting React Frontend...' -ForegroundColor Green; npm run dev"

Write-Host "✓ Frontend starting in new window..." -ForegroundColor Green
Write-Host "  App will be available at: http://localhost:5173" -ForegroundColor Cyan

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Both applications are starting in separate windows." -ForegroundColor White
Write-Host "Please wait a few seconds for them to fully start." -ForegroundColor White
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
