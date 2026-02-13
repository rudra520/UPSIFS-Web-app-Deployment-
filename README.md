# UPSIFS - University Management System

A comprehensive university management platform for students, faculty, and administrators with role-based dashboards, LMS, attendance tracking, and more.

![UPSIFS](https://img.shields.io/badge/UPSIFS-University%20Management-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)

## Features

### For Students
- Dashboard with attendance overview and quick actions
- Attendance tracking with subject-wise analytics
- Study Material (LMS) with downloadable resources
- Assignment submission and tracking
- Results and grade viewing
- Campus notices and announcements
- Grievance/feedback system
- Profile management

### For Teachers
- Dashboard with student statistics
- Mark attendance for classes
- View and manage timetable
- Upload study materials (PPT/PDF)
- Upload and manage student marks
- Student list with detailed profiles
- Query management system

### For Management
- User management (students, teachers)
- Notice/announcement management
- System configuration
- Reports and analytics

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite** - Database
- **bcryptjs** - Password hashing
- **JSON Web Tokens** - Authentication
- **CORS** - Cross-origin requests

## Project Structure

```
upsifs-app/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   │   ├── student/      # Student pages
│   │   │   ├── teacher/      # Teacher pages
│   │   │   └── settings/     # Settings pages
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utilities & constants
│   │   ├── App.tsx           # Main App component
│   │   └── index.tsx         # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # Node.js Backend
│   ├── database/
│   │   ├── connection.js     # DB connection
│   │   ├── init.js           # DB initialization
│   │   └── upsifs.db         # SQLite database file
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   ├── users.js          # User routes
│   │   ├── students.js       # Student routes
│   │   ├── teachers.js       # Teacher routes
│   │   ├── notices.js        # Notice routes
│   │   ├── assignments.js    # Assignment routes
│   │   └── grievances.js     # Grievance routes
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Main server file
│
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   cd upsifs-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```

4. **Start Backend Server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

5. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

6. **Start Frontend**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api/health

## Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | aryan.sharma@upsifs.ac.in | password123 |
| Teacher | sarah.smith@upsifs.ac.in | password123 |
| Management | admin@upsifs.ac.in | password123 |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student details
- `GET /api/students/:id/attendance` - Get student attendance
- `GET /api/students/:id/marks` - Get student marks
- `POST /api/students/attendance` - Mark attendance

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher details
- `POST /api/teachers/marks` - Upload marks
- `PUT /api/teachers/marks/:id` - Update marks
- `POST /api/teachers/timetable` - Add timetable entry

### Notices
- `GET /api/notices` - Get all notices
- `GET /api/notices/:id` - Get notice by ID
- `POST /api/notices` - Create notice (Admin)
- `PUT /api/notices/:id` - Update notice (Admin)
- `DELETE /api/notices/:id` - Delete notice (Admin)

### Assignments
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get assignment by ID
- `POST /api/assignments` - Create assignment (Teacher)
- `POST /api/assignments/:id/submit` - Submit assignment (Student)
- `POST /api/assignments/:id/grade` - Grade assignment (Teacher)
- `DELETE /api/assignments/:id` - Delete assignment (Teacher)

### Grievances
- `GET /api/grievances` - Get all grievances
- `GET /api/grievances/:id` - Get grievance by ID
- `POST /api/grievances` - Create grievance
- `PUT /api/grievances/:id/status` - Update grievance status (Admin)
- `DELETE /api/grievances/:id` - Delete grievance (Admin)

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=./database/upsifs.db
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
# Optional for local development (defaults to http://localhost:5000/api)
VITE_API_URL=http://localhost:5000/api

# For production deployment, set to your backend API URL
# VITE_API_URL=https://your-backend-host.com/api
```

> **Note:** See `frontend/.env.example` for a template. Environment variables prefixed with `VITE_` are exposed to the browser.

## Database Schema

### Tables
- **users** - User accounts (students, teachers, management)
- **subjects** - Academic subjects
- **attendance** - Student attendance records
- **notices** - Campus announcements
- **assignments** - Assignment details
- **assignment_submissions** - Student submissions
- **grievances** - Student complaints/feedback
- **study_materials** - LMS resources
- **timetable** - Class schedules
- **marks** - Student grades

## Authentication Flow

1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server validates credentials and returns a JWT token
3. Frontend stores token in localStorage
4. Subsequent requests include token in Authorization header
5. Server verifies token and attaches user to request

## Role-Based Access Control

| Feature | Student | Teacher | Management |
|---------|---------|---------|------------|
| View Dashboard | | | |
| View Attendance | Own | All | All |
| Mark Attendance | - | | - |
| View LMS | | | |
| Upload Materials | - | | |
| View Assignments | | | |
| Submit Assignments | | - | - |
| Grade Assignments | - | | |
| View Results | Own | All | All |
| Upload Marks | - | | |
| View Notices | | | |
| Create Notices | - | - | |
| View Grievances | Own | All | All |
| Create Grievances | | | |
| Manage Users | - | - | |

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

### Database Reset
```bash
cd backend
npm run init-db
```

## Free Deployment (Vercel/Netlify)

The UPSIFS frontend can be deployed for **free** on platforms like Vercel or Netlify. You'll need to deploy the backend separately.

### Prerequisites

- GitHub account with this repository
- Backend deployed on a free platform (see Backend Deployment below)

### Frontend Deployment Options

#### Option 1: Deploy to Vercel (Recommended)

1. **Connect Your Repository**
   - Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
   - Click "New Project" and import your UPSIFS repository
   - Vercel will automatically detect the configuration from `vercel.json`

2. **Configure Environment Variables**
   - In the Vercel project settings, add the following environment variable:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```
   - Replace `your-backend-url.com` with your deployed backend URL

3. **Deploy**
   - Click "Deploy" - Vercel will build and deploy your frontend
   - Your app will be live at `https://your-project.vercel.app`

4. **Update Backend CORS**
   - Add your Vercel URL to the backend's `CORS_ORIGIN` environment variable
   - Example: `CORS_ORIGIN=https://your-project.vercel.app`

#### Option 2: Deploy to Netlify

1. **Connect Your Repository**
   - Go to [netlify.com](https://netlify.com) and sign up/login with GitHub
   - Click "New site from Git" and select your UPSIFS repository
   - Netlify will automatically detect the configuration from `netlify.toml`

2. **Configure Environment Variables**
   - In Site Settings → Environment Variables, add:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```

3. **Deploy**
   - Click "Deploy site" - Netlify will build and deploy your frontend
   - Your app will be live at `https://your-project.netlify.app`

4. **Update Backend CORS**
   - Add your Netlify URL to the backend's `CORS_ORIGIN` environment variable

### Backend Deployment

The backend must be deployed separately. Here are some **free** options:

#### Render (Recommended for Free Tier)

1. Go to [render.com](https://render.com) and create a free account
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-random-string-here
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   PORT=5000
   ```
6. Deploy - your backend will be available at `https://your-service.onrender.com`
7. Use `https://your-service.onrender.com/api` as your `VITE_API_URL`

⚠️ **Note:** Render's free tier may spin down after 15 minutes of inactivity, causing a 30-60 second cold start on the first request.

#### Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Create a new project from your GitHub repository
3. Set the root directory to `backend`
4. Add the same environment variables as above
5. Railway will auto-deploy your backend

#### Fly.io

1. Install the Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Navigate to the backend folder: `cd backend`
3. Run `fly launch` and follow the prompts
4. Set environment variables using `fly secrets set`

### Important Notes

1. **CORS Configuration:** Always ensure your backend's `CORS_ORIGIN` includes your frontend's deployed URL
2. **Environment Variables:** Never commit `.env` files - use platform environment variable settings
3. **Database:** For production, consider using a managed database instead of SQLite (PostgreSQL, MySQL)
4. **Cold Starts:** Free tier services may have cold start delays - first request after inactivity will be slow
5. **HTTPS:** Both Vercel/Netlify and Render provide free SSL certificates automatically

### Testing Your Deployment

After deploying:
1. Visit your frontend URL
2. Try logging in with the default credentials
3. Check browser console for any API connection errors
4. Verify all features work as expected

### Troubleshooting Deployment

- **API Connection Failed:** Check that `VITE_API_URL` is set correctly and backend is running
- **CORS Errors:** Ensure backend `CORS_ORIGIN` includes your frontend URL
- **404 on Refresh:** This should be handled by `vercel.json`/`netlify.toml` redirects
- **Build Failures:** Check build logs for missing dependencies or TypeScript errors

## Self-Hosted Deployment

If you prefer to self-host:

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```
   The built files will be in `frontend/dist/`

2. **Serve Frontend**
   - Use any static file server (nginx, Apache, etc.)
   - Ensure all routes redirect to `index.html` for SPA routing

3. **Set Environment Variables**
   - Create `frontend/.env.production` with your backend URL:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```
   - Rebuild after changing environment variables

4. **Run Backend**
   - Set environment variables in `backend/.env`
   - Update `JWT_SECRET` with a strong random string
   - Set `NODE_ENV=production`
   - Update `CORS_ORIGIN` with your frontend URL
   - Start the server:
     ```bash
     cd backend
     npm start
     ```

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Change port in `vite.config.ts`

### Database Issues
- Delete `backend/database/upsifs.db` and run `npm run init-db`

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env` to match your frontend URL

## License

MIT License - Feel free to use for educational purposes.

## Support

For issues or questions, please refer to the API documentation at `/api/health` or check the console logs.

---

**Made with for UPSIFS** 🎓
