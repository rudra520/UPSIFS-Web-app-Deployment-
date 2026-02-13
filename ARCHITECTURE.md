# UPSIFS Architecture Overview

System architecture and data flow for the UPSIFS University Management System.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Users                                    │
│  (Students, Teachers, Management, Parents)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Vercel)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React 18 + TypeScript + Vite                          │   │
│  │  - Single Page Application (SPA)                       │   │
│  │  - Client-side routing                                 │   │
│  │  - Tailwind CSS for styling                            │   │
│  │  - Lucide React for icons                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                     │
│                             │ HTTPS + JWT                         │
│                             ▼                                     │
└─────────────────────────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (Render)                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Express.js + Node.js                                  │   │
│  │  - RESTful API                                         │   │
│  │  - JWT Authentication                                   │   │
│  │  - CORS Configuration                                   │   │
│  │  - Request Validation                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                     │
│                             ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  SQLite Database                                        │   │
│  │  - Persistent Storage (Render Disk)                     │   │
│  │  - 10 Tables                                            │   │
│  │  - Foreign Key Constraints                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

### 1. Authentication Flow

```
User → Frontend → API Call (/auth/login)
                 ↓
           Backend (Verify Credentials)
                 ↓
           Generate JWT Token
                 ↓
           Return Token + User Data
                 ↓
           Frontend (Store in localStorage)
                 ↓
           Redirect to Dashboard
```

### 2. Protected API Request Flow

```
User Action → Frontend
                 ↓
           Get Token from localStorage
                 ↓
           API Request (Authorization: Bearer token)
                 ↓
           Backend (Middleware verifies token)
                 ↓
           Attach user to request
                 ↓
           Process request
                 ↓
           Query Database
                 ↓
           Return Response
                 ↓
           Frontend (Update UI)
```

### 3. Data Creation Flow (Example: Grievance)

```
User (Fill Form) → Frontend
                      ↓
                API Call (/api/grievances)
                      ↓
                Backend (Validate + Auth)
                      ↓
                Insert into Database
                      ↓
                Return Created Resource
                      ↓
                Frontend (Show Success)
```

---

## 🗄️ Database Schema

```
┌────────────────────────────────────────────────────────────────────┐
│                           USERS                                    │
│  ├─ id (PK)                                                        │
│  ├─ name                                                           │
│  ├─ email (UNIQUE)                                                 │
│  ├─ password (hashed)                                              │
│  ├─ role (STUDENT/TEACHER/PARENT/MANAGEMENT)                       │
│  ├─ department                                                     │
│  ├─ semester                                                       │
│  ├─ enrollment_no                                                  │
│  └─ is_active                                                      │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                          SUBJECTS                                 │
│  ├─ id (PK)                                                        │
│  ├─ name                                                           │
│  ├─ code (UNIQUE)                                                  │
│  ├─ department                                                     │
│  └─ semester                                                       │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                        ATTENDANCE                                  │
│  ├─ id (PK)                                                        │
│  ├─ student_id (FK → users)                                      │
│  ├─ subject_id (FK → subjects)                                   │
│  ├─ date                                                           │
│  ├─ status (PRESENT/ABSENT/LEAVE)                                │
│  └─ marked_by (FK → users)                                        │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                          NOTICES                                   │
│  ├─ id (PK)                                                        │
│  ├─ title                                                          │
│  ├─ content                                                        │
│  ├─ category (Exam/Event/Holiday/General)                          │
│  ├─ is_pinned                                                      │
│  └─ created_by (FK → users)                                       │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                        ASSIGNMENTS                                 │
│  ├─ id (PK)                                                        │
│  ├─ title                                                          │
│  ├─ subject_id (FK → subjects)                                    │
│  ├─ description                                                    │
│  ├─ deadline                                                       │
│  └─ created_by (FK → users)                                       │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                  ASSIGNMENT_SUBMISSIONS                            │
│  ├─ id (PK)                                                        │
│  ├─ assignment_id (FK → assignments)                              │
│  ├─ student_id (FK → users)                                      │
│  ├─ submission_url                                                 │
│  ├─ marks                                                          │
│  ├─ remarks                                                        │
│  ├─ status (Pending/Submitted/Graded)                              │
│  └─ submitted_at                                                   │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                        GRIEVANCES                                  │
│  ├─ id (PK)                                                        │
│  ├─ user_id (FK → users)                                          │
│  ├─ category                                                       │
│  ├─ description                                                    │
│  ├─ status (Open/In Progress/Resolved)                           │
│  ├─ is_anonymous                                                   │
│  ├─ created_at                                                     │
│  └─ resolved_at                                                    │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                     STUDY_MATERIALS                                │
│  ├─ id (PK)                                                        │
│  ├─ subject_id (FK → subjects)                                    │
│  ├─ unit_title                                                     │
│  ├─ resource_name                                                  │
│  ├─ resource_type (PDF/VIDEO/LINK)                                 │
│  ├─ resource_url                                                   │
│  └─ uploaded_by (FK → users)                                      │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                         TIMETABLE                                  │
│  ├─ id (PK)                                                        │
│  ├─ subject_id (FK → subjects)                                    │
│  ├─ teacher_id (FK → users)                                      │
│  ├─ day                                                            │
│  ├─ start_time                                                     │
│  ├─ end_time                                                       │
│  ├─ room                                                           │
│  └─ batch                                                          │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                            MARKS                                   │
│  ├─ id (PK)                                                        │
│  ├─ student_id (FK → users)                                      │
│  ├─ subject_id (FK → subjects)                                    │
│  ├─ exam_type                                                      │
│  ├─ marks                                                          │
│  ├─ max_marks                                                      │
│  ├─ semester                                                       │
│  └─ entered_by (FK → users)                                      │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Architecture

### Authentication Layers

1. **Password Hashing**
   - bcryptjs with 10 salt rounds
   - Plain passwords never stored

2. **JWT Token**
   - 7-day expiration
   - Signed with JWT_SECRET
   - Contains userId in payload

3. **Middleware Protection**
   - `authenticate` - Verifies JWT token
   - `authorize` - Checks user role
   - `optionalAuth` - Optional authentication

4. **CORS**
   - Configurable origin
   - Credentials enabled
   - Prevents unauthorized cross-origin requests

5. **Input Validation**
   - express-validator
   - Type checking
   - Sanitization

### Request Flow with Security

```
Request → CORS Check
         → Authentication Middleware (verify JWT)
         → Authorization Middleware (check role)
         → Input Validation
         → Business Logic
         → Response
```

---

## 🌐 Deployment Architecture

### Development Environment

```
┌──────────────────┐
│  Frontend (3000) │  npm run dev
│   Vite Dev Server│  with proxy to /api
└────────┬─────────┘
         │
         │ http://localhost:5000/api
         ▼
┌──────────────────┐
│  Backend (5000)  │  npm run dev
│   Express Server │  with hot reload
└────────┬─────────┘
         │
         │ SQLite file
         ▼
┌──────────────────┐
│   Local DB       │  backend/database/upsifs.db
└──────────────────┘
```

### Production Environment

```
┌─────────────────────────────────┐
│   Frontend (Vercel)             │
│   https://upsifs.vercel.app     │
│   - Global CDN                  │
│   - Automatic HTTPS             │
│   - Edge caching                │
└────────────┬────────────────────┘
             │
             │ HTTPS
             ▼
┌─────────────────────────────────┐
│   Backend (Render)             │
│   https://upsifs-backend.onrender.com│
│   - Auto-scaling                │
│   - Automatic HTTPS             │
│   - Persistent disk storage    │
└────────────┬────────────────────┘
             │
             │ SQLite on persistent disk
             ▼
┌─────────────────────────────────┐
│   Database (Render Disk)        │
│   /opt/render/project/data/     │
│   upsifs.db (1 GB)             │
└─────────────────────────────────┘
```

---

## 🔄 State Management

### Frontend State

```
App.tsx
  ├─ user: User | null (authentication state)
  ├─ currentPage: string (routing state)
  ├─ selectedStudentId: string | null (navigation state)
  └─ isDrawerOpen: boolean (UI state)

Page Components
  ├─ Local state (useState)
  ├─ API calls (useEffect)
  └─ Form state (controlled inputs)
```

### Backend State

```
Request Context
  ├─ req.user (attached by auth middleware)
  ├─ req.body (parsed request data)
  └─ req.params (URL parameters)

Session-less (RESTful)
  └─ All state in JWT token or database
```

---

## 📡 API Architecture

### RESTful Design Principles

1. **Resource-Based URLs**
   - `/api/users` - User resources
   - `/api/notices` - Notice resources
   - `/api/grievances` - Grievance resources

2. **HTTP Methods**
   - GET - Fetch resources
   - POST - Create resources
   - PUT - Update resources
   - DELETE - Remove resources

3. **Status Codes**
   - 200 OK - Successful GET/PUT/DELETE
   - 201 Created - Successful POST
   - 400 Bad Request - Validation errors
   - 401 Unauthorized - No/invalid token
   - 403 Forbidden - Insufficient permissions
   - 404 Not Found - Resource not found
   - 500 Internal Server Error - Server error

4. **Response Format**
   ```json
   {
     "success": true/false,
     "message": "Description",
     "data": { ... },
     "token": "..." (for auth)
   }
   ```

---

## 🎯 Role-Based Access Control

```
┌─────────────────────────────────────────────────────────┐
│                   STUDENT                                │
│  ├─ View own attendance                                  │
│  ├─ View study materials                                 │
│  ├─ Submit assignments                                   │
│  ├─ View marks                                           │
│  ├─ Create grievances                                    │
│  ├─ Update own profile                                   │
│  └─ Cannot: Mark attendance, Upload marks, Create notices│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   TEACHER                                 │
│  ├─ Mark attendance                                      │
│  ├─ Upload study materials                               │
│  ├─ Upload marks                                         │
│  ├─ View student marks                                   │
│  ├─ View grievances                                      │
│  ├─ Create assignments                                   │
│  ├─ Update own profile                                   │
│  └─ Cannot: Delete users, Create notices                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 MANAGEMENT                               │
│  ├─ View all users                                       │
│  ├─ Create/Update/Delete notices                         │
│  ├─ View all grievances                                  │
│  ├─ Update grievance status                              │
│  ├─ Full system access                                   │
│  └─ All privileges                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Performance Considerations

### Frontend Optimization

1. **Code Splitting**
   - Vite automatic code splitting
   - Lazy route loading

2. **Asset Optimization**
   - Minification
   - Tree shaking
   - Image optimization (future enhancement)

3. **Caching**
   - Vercel edge caching
   - Browser caching headers

### Backend Optimization

1. **Database Indexing**
   - Primary keys indexed
   - Unique constraints indexed
   - Add indexes for frequent queries

2. **Query Optimization**
   - Parameterized queries
   - Avoid N+1 queries
   - Use prepared statements

3. **Connection Pooling**
   - SQLite handles automatically
   - Single connection (file-based)

---

## 📈 Scalability

### Current Architecture Supports

- **Users**: 1000+ (SQLite limit)
- **Concurrent Requests**: 100+ (Node.js async)
- **Storage**: 1 GB (Render free tier)

### Future Enhancements

1. **Database Migration**
   - Move to PostgreSQL/MySQL
   - Better for large-scale deployments
   - Improved query performance

2. **Caching Layer**
   - Redis for session storage
   - Cache frequent queries
   - Reduce database load

3. **Load Balancing**
   - Multiple backend instances
   - Horizontal scaling
   - Better availability

4. **CDN for Static Assets**
   - Serve images/PDFs from CDN
   - Reduce backend load
   - Faster content delivery

---

## 🔧 Monitoring & Logging

### Current Implementation

1. **Backend Logging**
   - Morgan HTTP logger
   - Console logging
   - Error tracking

2. **Frontend Logging**
   - Browser console
   - Network tab debugging

### Future Enhancements

1. **Error Tracking**
   - Sentry integration
   - Stack trace capture
   - User context

2. **Performance Monitoring**
   - API response times
   - Database query times
   - Frontend load times

3. **Analytics**
   - User behavior tracking
   - Feature usage
   - Conversion tracking

---

## 🔄 Data Backup & Recovery

### Current Setup

1. **Render Backups**
   - Automatic daily backups
   - Point-in-time recovery
   - 7-day retention (free tier)

2. **Manual Backup**
   - Export database
   - Backup configuration files
   - Version control (git)

### Backup Strategy

```
Daily:
  - Render automatic backups
  - Monitor backup completion

Weekly:
  - Export critical data
  - Test restore process
  - Review backup logs

Monthly:
  - Full system backup
  - Disaster recovery drill
  - Update backup documentation
```

---

## 📚 Technology Stack Summary

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Library | 18.2.0 |
| TypeScript | Type Safety | 5.2.2 |
| Vite | Build Tool | 5.0.8 |
| Tailwind CSS | Styling | 3.3.6 |
| Lucide React | Icons | 0.294.0 |
| Recharts | Charts | 2.10.3 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | 18+ |
| Express.js | Web Framework | 4.18.2 |
| SQLite | Database | 5.1.6 |
| bcryptjs | Password Hashing | 2.4.3 |
| jsonwebtoken | JWT | 9.0.2 |
| cors | CORS Middleware | 2.8.5 |
| morgan | Logging | 1.10.0 |
| express-validator | Validation | 7.0.1 |
| dotenv | Environment | 16.3.1 |

### Deployment

| Platform | Purpose | Plan |
|----------|---------|------|
| Vercel | Frontend Hosting | Free |
| Render | Backend Hosting | Free |
| GitHub | Version Control | Free |

---

**Last Updated**: February 2024
**Version**: 1.0.0
