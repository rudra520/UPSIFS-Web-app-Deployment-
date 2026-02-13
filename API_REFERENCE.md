# UPSIFS API Reference

Complete API reference for the UPSIFS University Management System.

**Base URL**: `https://your-backend.onrender.com/api` (production) or `http://localhost:5000/api` (development)

---

## Authentication

### Register User
Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role": "STUDENT",
  "department": "Computer Science",
  "semester": 4,
  "enrollmentNo": "CS2024001"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "STUDENT"
    }
  }
}
```

---

### Login
Authenticate a user and receive a JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "aryan.sharma@upsifs.ac.in",
  "password": "password123",
  "role": "STUDENT"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "id": 1,
      "name": "Aryan Sharma",
      "email": "aryan.sharma@upsifs.ac.in",
      "role": "STUDENT",
      "department": "Computer Science & Engineering",
      "semester": 4,
      "enrollment_no": "CS2021001"
    }
  }
}
```

---

### Get Current User
Get the currently authenticated user's profile.

**Endpoint**: `GET /auth/me`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Aryan Sharma",
    "email": "aryan.sharma@upsifs.ac.in",
    "role": "STUDENT",
    "department": "Computer Science & Engineering",
    "semester": 4,
    "enrollment_no": "CS2021001",
    "avatar": null,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Change Password
Change the authenticated user's password.

**Endpoint**: `POST /auth/change-password`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "currentPassword": "password123",
  "newPassword": "newSecurePassword456"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Users

### Get All Users
Get all users (Management role only).

**Endpoint**: `GET /users`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "name": "Aryan Sharma",
      "email": "aryan.sharma@upsifs.ac.in",
      "role": "STUDENT",
      "department": "Computer Science & Engineering",
      "semester": 4,
      "enrollment_no": "CS2021001",
      "is_active": true
    }
  ]
}
```

---

### Get User by ID
Get a specific user's profile.

**Endpoint**: `GET /users/:id`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Aryan Sharma",
    "email": "aryan.sharma@upsifs.ac.in",
    "role": "STUDENT",
    "department": "Computer Science & Engineering",
    "semester": 4,
    "enrollment_no": "CS2021001"
  }
}
```

---

## Students

### Get All Students
Get list of all students.

**Endpoint**: `GET /students`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Aryan Sharma",
      "email": "aryan.sharma@upsifs.ac.in",
      "enrollment_no": "CS2021001",
      "department": "Computer Science & Engineering",
      "semester": 4
    }
  ]
}
```

---

### Get Student Attendance
Get attendance records for a student.

**Endpoint**: `GET /students/:id/attendance`

**Query Parameters**:
- `subject_id` (optional): Filter by subject
- `month` (optional): Filter by month (format: YYYY-MM)

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "student_id": 1,
    "overall_attendance": 85,
    "subject_breakdown": [
      {
        "subject_id": 1,
        "subject_name": "Database Management",
        "attendance_percentage": 88,
        "total_classes": 20,
        "present": 18
      }
    ],
    "records": [
      {
        "date": "2024-01-15",
        "status": "PRESENT",
        "subject": "Database Management"
      }
    ]
  }
}
```

---

### Get Student Marks
Get marks for a student.

**Endpoint**: `GET /students/:id/marks`

**Query Parameters**:
- `semester` (optional): Filter by semester

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "student_id": 1,
    "semester": 4,
    "gpa": 3.8,
    "subjects": [
      {
        "subject_id": 1,
        "subject_name": "Database Management",
        "exam_type": "Mid-Semester",
        "marks": 45,
        "max_marks": 50,
        "percentage": 90
      }
    ]
  }
}
```

---

### Mark Attendance
Mark attendance for students (Teacher only).

**Endpoint**: `POST /students/attendance`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "student_id": 1,
  "subject_id": 1,
  "date": "2024-01-15",
  "status": "PRESENT"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "id": 101,
    "student_id": 1,
    "subject_id": 1,
    "date": "2024-01-15",
    "status": "PRESENT"
  }
}
```

---

## Teachers

### Get All Teachers
Get list of all teachers.

**Endpoint**: `GET /teachers`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 3,
      "name": "Dr. Sarah Smith",
      "email": "sarah.smith@upsifs.ac.in",
      "department": "Computer Science & Engineering"
    }
  ]
}
```

---

### Upload Marks
Upload marks for a student (Teacher only).

**Endpoint**: `POST /teachers/marks`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "student_id": 1,
  "subject_id": 1,
  "exam_type": "Mid-Semester",
  "marks": 45,
  "max_marks": 50,
  "semester": 4
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Marks uploaded successfully",
  "data": {
    "id": 201,
    "student_id": 1,
    "subject_id": 1,
    "exam_type": "Mid-Semester",
    "marks": 45,
    "max_marks": 50
  }
}
```

---

### Add Timetable Entry
Add a timetable entry (Teacher only).

**Endpoint**: `POST /teachers/timetable`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "subject_id": 1,
  "day": "Monday",
  "start_time": "09:00",
  "end_time": "10:30",
  "room": "Lab 1",
  "batch": "A"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Timetable entry added successfully",
  "data": {
    "id": 301,
    "subject_id": 1,
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:30",
    "room": "Lab 1"
  }
}
```

---

## Notices

### Get All Notices
Get all notices.

**Endpoint**: `GET /notices`

**Query Parameters**:
- `category` (optional): Filter by category (Exam, Event, Holiday, General)
- `limit` (optional): Limit number of results

**Response** (200):
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": 1,
      "title": "Mid-Semester Examination Schedule Released",
      "content": "The mid-semester examinations will commence from March 15, 2026...",
      "category": "Exam",
      "is_pinned": true,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Notice by ID
Get a specific notice.

**Endpoint**: `GET /notices/:id`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Mid-Semester Examination Schedule Released",
    "content": "The mid-semester examinations will commence from March 15, 2026...",
    "category": "Exam",
    "is_pinned": true,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Create Notice
Create a new notice (Management role only).

**Endpoint**: `POST /notices`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Holiday Notice",
  "content": "The university will remain closed on January 26, 2026.",
  "category": "Holiday",
  "is_pinned": false
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Notice created successfully",
  "data": {
    "id": 5,
    "title": "Holiday Notice",
    "content": "The university will remain closed on January 26, 2026.",
    "category": "Holiday",
    "is_pinned": false,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Assignments

### Get All Assignments
Get all assignments.

**Endpoint**: `GET /assignments`

**Query Parameters**:
- `subject_id` (optional): Filter by subject
- `status` (optional): Filter by status

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "SQL Query Optimization",
      "subject_id": 1,
      "subject_name": "Database Management",
      "description": "Optimize the given SQL queries...",
      "deadline": "2026-02-15",
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Assignment by ID
Get a specific assignment.

**Endpoint**: `GET /assignments/:id`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "SQL Query Optimization",
    "subject_id": 1,
    "subject_name": "Database Management",
    "description": "Optimize the given SQL queries...",
    "deadline": "2026-02-15",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Create Assignment
Create a new assignment (Teacher only).

**Endpoint**: `POST /assignments`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Build a REST API",
  "subject_id": 1,
  "description": "Create a RESTful API using Node.js and Express",
  "deadline": "2026-03-01"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Assignment created successfully",
  "data": {
    "id": 4,
    "title": "Build a REST API",
    "subject_id": 1,
    "description": "Create a RESTful API using Node.js and Express",
    "deadline": "2026-03-01",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Submit Assignment
Submit an assignment (Student only).

**Endpoint**: `POST /assignments/:id/submit`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "submission_url": "https://github.com/username/assignment-submission"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Assignment submitted successfully",
  "data": {
    "id": 501,
    "assignment_id": 1,
    "student_id": 1,
    "submission_url": "https://github.com/username/assignment-submission",
    "status": "Submitted",
    "submitted_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Grade Assignment
Grade an assignment submission (Teacher only).

**Endpoint**: `POST /assignments/:id/grade`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "student_id": 1,
  "marks": 45,
  "remarks": "Good work! Well optimized queries."
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Assignment graded successfully",
  "data": {
    "id": 501,
    "marks": 45,
    "remarks": "Good work! Well optimized queries.",
    "status": "Graded"
  }
}
```

---

## Grievances

### Get All Grievances
Get all grievances.

**Endpoint**: `GET /grievances`

**Query Parameters**:
- `status` (optional): Filter by status (Open, In Progress, Resolved)
- `my_grievances` (optional): Set to `true` to get only current user's grievances

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "user_name": "Aryan Sharma",
      "category": "Infrastructure",
      "description": "Projector not working in Lab 4...",
      "status": "In Progress",
      "is_anonymous": false,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Get Grievance by ID
Get a specific grievance.

**Endpoint**: `GET /grievances/:id`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "category": "Infrastructure",
    "description": "Projector not working in Lab 4 for the past week.",
    "status": "In Progress",
    "is_anonymous": false,
    "created_at": "2024-01-15T10:30:00.000Z",
    "resolved_at": null
  }
}
```

---

### Create Grievance
Create a new grievance.

**Endpoint**: `POST /grievances`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "category": "Academic",
  "description": "Request for re-evaluation of mid-semester answer sheet.",
  "is_anonymous": false
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Grievance created successfully",
  "data": {
    "id": 4,
    "user_id": 1,
    "category": "Academic",
    "description": "Request for re-evaluation of mid-semester answer sheet.",
    "status": "Open",
    "is_anonymous": false,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Update Grievance Status
Update grievance status (Management role only).

**Endpoint**: `PUT /grievances/:id/status`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "status": "Resolved"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Grievance status updated successfully",
  "data": {
    "id": 1,
    "status": "Resolved",
    "resolved_at": "2024-01-16T10:30:00.000Z"
  }
}
```

---

## Health Check

### Health Check
Check API health and version.

**Endpoint**: `GET /health`

**Response** (200):
```json
{
  "success": true,
  "message": "UPSIFS API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**403 Forbidden**:
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Something went wrong!"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider implementing rate limiting for production deployment.

---

## Pagination

Most list endpoints support pagination via query parameters (implementation pending):

```
?page=1&limit=20
```

---

## Filtering & Sorting

List endpoints support filtering via query parameters as documented in each endpoint.

---

## Authentication Details

### JWT Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": 1,
    "iat": 1705301400,
    "exp": 1705906200
  }
}
```

### Token Expiration

JWT tokens expire after 7 days. Users must re-authenticate after expiration.

### Including the Token

Include the token in the `Authorization` header with the `Bearer` prefix:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aryan.sharma@upsifs.ac.in",
    "password": "password123",
    "role": "STUDENT"
  }'
```

### Authenticated Request Example
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Grievance Example
```bash
curl -X POST http://localhost:5000/api/grievances \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Infrastructure",
    "description": "AC not working in Lab 3",
    "is_anonymous": false
  }'
```

---

## Versioning

Current API version: `1.0.0`

API versioning is included in the health check response and can be used for future compatibility checks.

---

**Last Updated**: January 2024
