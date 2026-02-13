# UPSIFS Backend API

RESTful API server for the UPSIFS University Management System built with Node.js, Express, and SQLite.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Initialize database with sample data
npm run init-db

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── database/
│   ├── connection.js       # SQLite database connection
│   ├── init.js             # Database initialization & sample data
│   └── upsifs.db           # SQLite database file (created after init)
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── routes/
│   ├── auth.js             # Authentication endpoints
│   ├── users.js            # User management endpoints
│   ├── students.js         # Student-specific endpoints
│   ├── teachers.js         # Teacher-specific endpoints
│   ├── notices.js          # Notice management endpoints
│   ├── assignments.js      # Assignment management endpoints
│   └── grievances.js      # Grievance management endpoints
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── server.js               # Express server entry point
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory (copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
DB_PATH=./database/upsifs.db
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=*
```

### Environment Variables Description

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `DB_PATH` | Path to SQLite database file | ./database/upsifs.db |
| `JWT_SECRET` | Secret key for JWT token signing | (Required) |
| `CORS_ORIGIN` | Allowed CORS origin URL | * |

## 📚 API Endpoints

### Health Check

```
GET /api/health
```

Returns API status and version.

### Authentication

```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user
POST   /api/auth/change-password  # Change password
```

### Users

```
GET    /api/users            # Get all users
GET    /api/users/:id        # Get user by ID
PUT    /api/users/:id        # Update user
DELETE /api/users/:id        # Delete user
```

### Students

```
GET    /api/students                    # Get all students
GET    /api/students/:id                # Get student by ID
GET    /api/students/:id/attendance      # Get student attendance
GET    /api/students/:id/marks           # Get student marks
POST   /api/students/attendance         # Mark attendance
```

### Teachers

```
GET    /api/teachers           # Get all teachers
GET    /api/teachers/:id       # Get teacher by ID
POST   /api/teachers/marks     # Upload marks
PUT    /api/teachers/marks/:id # Update marks
POST   /api/teachers/timetable # Add timetable entry
```

### Notices

```
GET    /api/notices            # Get all notices
GET    /api/notices/:id        # Get notice by ID
POST   /api/notices            # Create notice
PUT    /api/notices/:id        # Update notice
DELETE /api/notices/:id        # Delete notice
```

### Assignments

```
GET    /api/assignments           # Get all assignments
GET    /api/assignments/:id       # Get assignment by ID
POST   /api/assignments           # Create assignment
POST   /api/assignments/:id/submit  # Submit assignment
POST   /api/assignments/:id/grade   # Grade assignment
DELETE /api/assignments/:id       # Delete assignment
```

### Grievances

```
GET    /api/grievances               # Get all grievances
GET    /api/grievances/:id           # Get grievance by ID
POST   /api/grievances               # Create grievance
PUT    /api/grievances/:id/status    # Update grievance status
DELETE /api/grievances/:id           # Delete grievance
```

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Example Request

```bash
# Login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"aryan.sharma@upsifs.ac.in","password":"password123","role":"STUDENT"}'

# Use token for authenticated request
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token-from-login>"
```

## 🗄️ Database

The backend uses SQLite with the following tables:

- **users**: User accounts (students, teachers, parents, management)
- **subjects**: Academic subjects
- **attendance**: Student attendance records
- **notices**: University notices and announcements
- **assignments**: Academic assignments
- **assignment_submissions**: Student assignment submissions
- **grievances**: Student grievances/support tickets
- **study_materials**: Educational resources
- **timetable**: Class schedules
- **marks**: Student marks and grades

### Database Initialization

Run the init script to create tables and insert sample data:

```bash
npm run init-db
```

The server will also automatically create tables on startup if they don't exist.

## 🧪 Sample Data

After initialization, the database contains:

**Users:**
- 2 Students (Aryan Sharma, Priya Das)
- 2 Teachers (Dr. Sarah Smith, Prof. Rajesh Kumar)
- 1 Admin user

**Sample credentials:**
- Email: `aryan.sharma@upsifs.ac.in`
- Password: `password123`

**Additional data:**
- 4 Subjects
- 4 Notices
- 3 Assignments
- 3 Grievances

## 🛠️ Development

### Running in Development Mode

```bash
npm run dev
```

Uses `nodemon` for auto-restart on file changes.

### Database Management

```bash
# Reinitialize database (deletes all data)
npm run init-db

# Database file location
./database/upsifs.db
```

### Testing API Endpoints

You can use:
- **cURL**: Command-line HTTP client
- **Postman**: GUI API testing tool
- **Insomnia**: Alternative to Postman

Example using cURL:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all notices
curl http://localhost:5000/api/notices

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"aryan.sharma@upsifs.ac.in","password":"password123","role":"STUDENT"}'
```

## 🚢 Deployment

For production deployment instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md).

Quick summary for Render:

1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add disk storage for persistent database
6. Configure environment variables

## 📝 API Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

**Authentication Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "data": { "user": { ... } }
}
```

## 🔒 Security Features

- **JWT Authentication**: Token-based authentication
- **Password Hashing**: Using bcryptjs
- **CORS**: Configurable CORS origins
- **Input Validation**: Using express-validator
- **SQL Injection Protection**: Using parameterized queries
- **Role-based Authorization**: Middleware for role checking

## 📊 Monitoring

- Request logging with Morgan
- Error handling middleware
- Health check endpoint at `/api/health`

## 🤝 Contributing

When adding new features:

1. Add routes in the `routes/` directory
2. Follow existing patterns for responses
3. Add authentication middleware where needed
4. Update this README with new endpoints
5. Test thoroughly before committing

## 📄 License

MIT License - See LICENSE file for details
