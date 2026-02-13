@echo off
REM UPSIFS Local Development Startup Script (Windows)

echo 🚀 Starting UPSIFS Development Environment...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

REM Initialize backend database if it doesn't exist
if not exist "backend\database\upsifs.db" (
    echo 📦 Initializing database...
    cd backend
    call npm run init-db
    cd ..
    echo ✅ Database initialized
) else (
    echo ✅ Database already exists
)

echo.

REM Install dependencies if needed
if not exist "backend\node_modules" (
    echo 📦 Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo 🎯 Starting servers...
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Start backend server in new window
echo 🔧 Starting Backend Server (http://localhost:5000)...
start "UPSIFS Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in new window
echo 🎨 Starting Frontend Server (http://localhost:3000)...
start "UPSIFS Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ✅ Both servers are starting in new windows!
echo.
echo 📱 Frontend:  http://localhost:3000
echo 🔧 Backend:   http://localhost:5000
echo 📚 API Docs:  http://localhost:5000/api/health
echo.
echo 💡 Login credentials:
echo    Student: aryan.sharma@upsifs.ac.in / password123
echo    Teacher: sarah.smith@upsifs.ac.in / password123
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Press any key to close this window (servers will continue running in their windows)...
pause >nul
