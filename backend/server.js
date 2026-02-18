const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const noticeRoutes = require('./routes/notices');
const assignmentRoutes = require('./routes/assignments');
const grievanceRoutes = require('./routes/grievances');

// Import database
const db = require('./database/connection');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/grievances', grievanceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'UPSIFS API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to UPSIFS API',
    documentation: '/api/health',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      students: '/api/students',
      teachers: '/api/teachers',
      notices: '/api/notices',
      assignments: '/api/assignments',
      grievances: '/api/grievances'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database on startup
const { createTables } = require('./database/init');
const initDatabase = async () => {
  try {
    await createTables();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    // Don't exit the server, just log the error
  }
};

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║           UPSIFS Backend Server Running                  ║
║                                                          ║
║   🚀 Server: http://localhost:${PORT}                    ║
║   📚 API Docs: http://localhost:${PORT}/api/health       ║
║   🗄️  Database: SQLite (upsifs.db)                       ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
