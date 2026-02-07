@echo off
echo ==========================================
echo    UPSIFS Setup Script
echo ==========================================
echo.

echo Installing root dependencies...
call npm install

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo Initializing database...
cd backend
node database/init.js
cd ..

echo.
echo ==========================================
echo    Setup Complete!
echo ==========================================
echo.
echo To start the application:
echo   1. Start Backend:  cd backend ^&^& npm start
echo   2. Start Frontend: cd frontend ^&^& npm run dev
echo.
echo Or use: npm run dev (starts both)
echo.
pause
