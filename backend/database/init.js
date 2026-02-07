const { db } = require('./connection');

// Create tables
const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('STUDENT', 'TEACHER', 'PARENT', 'MANAGEMENT')),
          department TEXT,
          semester INTEGER,
          enrollment_no TEXT,
          avatar TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Subjects table
      db.run(`
        CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          code TEXT UNIQUE NOT NULL,
          department TEXT,
          semester INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Attendance table
      db.run(`
        CREATE TABLE IF NOT EXISTS attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          subject_id INTEGER NOT NULL,
          date DATE NOT NULL,
          status TEXT NOT NULL CHECK(status IN ('PRESENT', 'ABSENT', 'LEAVE')),
          marked_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES users(id),
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (marked_by) REFERENCES users(id)
        )
      `);

      // Notices table
      db.run(`
        CREATE TABLE IF NOT EXISTS notices (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          category TEXT NOT NULL CHECK(category IN ('Exam', 'Event', 'Holiday', 'General')),
          is_pinned BOOLEAN DEFAULT 0,
          created_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (created_by) REFERENCES users(id)
        )
      `);

      // Assignments table
      db.run(`
        CREATE TABLE IF NOT EXISTS assignments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          subject_id INTEGER NOT NULL,
          description TEXT,
          deadline DATE,
          created_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (created_by) REFERENCES users(id)
        )
      `);

      // Assignment submissions table
      db.run(`
        CREATE TABLE IF NOT EXISTS assignment_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          assignment_id INTEGER NOT NULL,
          student_id INTEGER NOT NULL,
          submission_url TEXT,
          marks INTEGER,
          remarks TEXT,
          status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Submitted', 'Graded')),
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assignment_id) REFERENCES assignments(id),
          FOREIGN KEY (student_id) REFERENCES users(id)
        )
      `);

      // Grievances table
      db.run(`
        CREATE TABLE IF NOT EXISTS grievances (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          category TEXT NOT NULL,
          description TEXT NOT NULL,
          status TEXT DEFAULT 'Open' CHECK(status IN ('Open', 'In Progress', 'Resolved')),
          is_anonymous BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          resolved_at DATETIME,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

      // Study materials table
      db.run(`
        CREATE TABLE IF NOT EXISTS study_materials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subject_id INTEGER NOT NULL,
          unit_title TEXT NOT NULL,
          resource_name TEXT NOT NULL,
          resource_type TEXT NOT NULL CHECK(resource_type IN ('PDF', 'VIDEO', 'LINK')),
          resource_url TEXT,
          uploaded_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (uploaded_by) REFERENCES users(id)
        )
      `);

      // Timetable table
      db.run(`
        CREATE TABLE IF NOT EXISTS timetable (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subject_id INTEGER NOT NULL,
          teacher_id INTEGER NOT NULL,
          day TEXT NOT NULL,
          start_time TEXT NOT NULL,
          end_time TEXT NOT NULL,
          room TEXT,
          batch TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (teacher_id) REFERENCES users(id)
        )
      `);

      // Student marks table
      db.run(`
        CREATE TABLE IF NOT EXISTS marks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          subject_id INTEGER NOT NULL,
          exam_type TEXT NOT NULL,
          marks INTEGER NOT NULL,
          max_marks INTEGER NOT NULL,
          semester INTEGER,
          entered_by INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES users(id),
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (entered_by) REFERENCES users(id)
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ All tables created successfully');
          resolve();
        }
      });
    });
  });
};

// Insert sample data
const insertSampleData = async () => {
  const bcrypt = require('bcryptjs');
  
  try {
    // Check if data already exists
    const { getRow } = require('./connection');
    const existingUser = await getRow('SELECT id FROM users LIMIT 1');
    
    if (existingUser) {
      console.log('ℹ️  Sample data already exists, skipping...');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert sample users
    await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO users (name, email, password, role, department, semester, enrollment_no) VALUES
        ('Aryan Sharma', 'aryan.sharma@upsifs.ac.in', ?, 'STUDENT', 'Computer Science & Engineering', 4, 'CS2021001'),
        ('Priya Das', 'priya.das@upsifs.ac.in', ?, 'STUDENT', 'Computer Science & Engineering', 4, 'CS2021002'),
        ('Dr. Sarah Smith', 'sarah.smith@upsifs.ac.in', ?, 'TEACHER', 'Computer Science & Engineering', NULL, NULL),
        ('Prof. Rajesh Kumar', 'rajesh.kumar@upsifs.ac.in', ?, 'TEACHER', 'Computer Science & Engineering', NULL, NULL),
        ('Admin User', 'admin@upsifs.ac.in', ?, 'MANAGEMENT', 'Administration', NULL, NULL)
      `, [hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword], function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Sample users inserted');

    // Insert sample subjects
    await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO subjects (name, code, department, semester) VALUES
        ('Database Management', 'CS301', 'Computer Science & Engineering', 4),
        ('Machine Learning', 'CS302', 'Computer Science & Engineering', 4),
        ('Web Development', 'CS303', 'Computer Science & Engineering', 4),
        ('Data Structures', 'CS304', 'Computer Science & Engineering', 4)
      `, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Sample subjects inserted');

    // Insert sample notices
    await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO notices (title, content, category, is_pinned, created_by) VALUES
        ('Mid-Semester Examination Schedule Released', 'The mid-semester examinations will commence from March 15, 2026. All students are required to check their individual schedules on the portal.', 'Exam', 1, 5),
        ('Annual Tech Fest - Registrations Open', 'Join us for the annual technical festival "TechNova 2026". Exciting competitions, workshops, and prizes await!', 'Event', 0, 5),
        ('Holiday Notice - Republic Day', 'The university will remain closed on January 26, 2026, on account of Republic Day.', 'Holiday', 0, 5),
        ('Library Timing Changes', 'The central library will now operate from 8:00 AM to 10:00 PM on all working days.', 'General', 0, 5)
      `, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Sample notices inserted');

    // Insert sample assignments
    await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO assignments (title, subject_id, description, deadline, created_by) VALUES
        ('SQL Query Optimization', 1, 'Optimize the given SQL queries for better performance', '2026-02-15', 3),
        ('Linear Regression Model', 2, 'Build a linear regression model using Python', '2026-02-20', 3),
        ('Responsive Portfolio', 3, 'Create a responsive portfolio website', '2026-02-25', 4)
      `, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Sample assignments inserted');

    // Insert sample grievances
    await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO grievances (user_id, category, description, status, is_anonymous) VALUES
        (1, 'Infrastructure', 'Projector not working in Lab 4 for the past week.', 'In Progress', 0),
        (2, 'Academic', 'Request for re-evaluation of mid-semester answer sheet.', 'Resolved', 0),
        (1, 'Canteen', 'Quality of food has deteriorated in the main canteen.', 'Open', 1)
      `, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('✅ Sample grievances inserted');

    console.log('✅ All sample data inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
};

// Initialize database
const initDatabase = async () => {
  try {
    console.log('\n🚀 Initializing database...\n');
    await createTables();
    await insertSampleData();
    console.log('\n✅ Database initialization completed!\n');
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error);
  } finally {
    db.close();
  }
};

// Run if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase, createTables, insertSampleData };
