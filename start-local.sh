#!/bin/bash

# UPSIFS Local Development Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting UPSIFS Development Environment..."
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Initialize backend database if it doesn't exist
if [ ! -f "backend/database/upsifs.db" ]; then
    echo "📦 Initializing database..."
    cd backend
    npm run init-db
    cd ..
    echo "✅ Database initialized"
else
    echo "✅ Database already exists"
fi

echo ""

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo ""
echo "🎯 Starting servers..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start backend server
echo "🔧 Starting Backend Server (http://localhost:5000)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting Frontend Server (http://localhost:3000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Both servers are running!"
echo ""
echo "📱 Frontend:  http://localhost:3000"
echo "🔧 Backend:   http://localhost:5000"
echo "📚 API Docs:  http://localhost:5000/api/health"
echo ""
echo "💡 Login credentials:"
echo "   Student: aryan.sharma@upsifs.ac.in / password123"
echo "   Teacher: sarah.smith@upsifs.ac.in / password123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Function to kill both processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up trap to cleanup on Ctrl+C
trap cleanup INT TERM

# Wait for both processes
wait
