# UPSIFS - Quick Start Guide

## 🚀 Getting Started (3 Easy Steps)

### Option 1: Automatic Setup (Recommended)

**Windows:**
```bash
double-click setup.bat
```

**Linux/Mac:**
```bash
./setup.sh
```

### Option 2: Manual Setup

```bash
# 1. Install all dependencies
npm run install:all

# 2. Initialize database
npm run init-db

# 3. Start both servers
npm run dev
```

## 📁 Project Structure

```
upsifs-app/
├── frontend/          # React App (Port 3000)
├── backend/           # Node.js API (Port 5000)
└── README.md          # Full Documentation
```

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | aryan.sharma@upsifs.ac.in | password123 |
| Teacher | sarah.smith@upsifs.ac.in | password123 |
| Admin | admin@upsifs.ac.in | password123 |

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

## 📋 Available Scripts

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Initialize/Reset database
npm run init-db

# Build frontend for production
npm run build
```

## 🗄️ Database

- **Type:** SQLite
- **Location:** `backend/database/upsifs.db`
- **Reset:** Delete the `.db` file and run `npm run init-db`

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Change port in `frontend/vite.config.ts` |
| Port 5000 in use | Change `PORT` in `backend/.env` |
| Database errors | Delete `.db` file and run `npm run init-db` |
| CORS errors | Update `CORS_ORIGIN` in `backend/.env` |

## 📚 Documentation

- Full API docs: See `README.md`
- Frontend code: `frontend/src/`
- Backend code: `backend/`

## 🎓 Features

### Student Features
- Dashboard with attendance overview
- View attendance analytics
- Access study materials (LMS)
- Submit assignments
- View results/grades
- Read campus notices
- Submit grievances

### Teacher Features
- Mark student attendance
- View/manage timetable
- Upload study materials
- Upload student marks
- View student list
- Manage student queries

### Admin Features
- Manage users
- Publish notices
- System configuration
- View reports

---

**Happy Coding!** 🚀
