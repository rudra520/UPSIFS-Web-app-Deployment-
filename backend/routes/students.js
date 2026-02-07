const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all students
router.get('/', authenticate, async (req, res) => {
  try {
    const students = await getAll(
      `SELECT id, name, email, department, semester, enrollment_no, avatar, created_at 
       FROM users 
       WHERE role = 'STUDENT' AND is_active = 1 
       ORDER BY name`
    );
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students'
    });
  }
});

// Get student by ID with details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const student = await getRow(
      `SELECT id, name, email, department, semester, enrollment_no, avatar, created_at 
       FROM users 
       WHERE id = ? AND role = 'STUDENT' AND is_active = 1`,
      [id]
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get attendance summary
    const attendanceSummary = await getAll(
      `SELECT s.name as subject, 
              ROUND(AVG(CASE WHEN a.status = 'PRESENT' THEN 100 ELSE 0 END), 0) as attendance_percentage
       FROM subjects s
       LEFT JOIN attendance a ON s.id = a.subject_id AND a.student_id = ?
       GROUP BY s.id`,
      [id]
    );

    // Get marks summary
    const marksSummary = await getAll(
      `SELECT s.name as subject, 
              AVG(m.marks) as average_marks,
              MAX(m.max_marks) as max_marks
       FROM subjects s
       LEFT JOIN marks m ON s.id = m.subject_id AND m.student_id = ?
       GROUP BY s.id`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...student,
        attendance: attendanceSummary,
        marks: marksSummary
      }
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student'
    });
  }
});

// Get student attendance
router.get('/:id/attendance', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { subject_id, month } = req.query;

    let query = `
      SELECT a.id, a.date, a.status, s.name as subject, s.code as subject_code
      FROM attendance a
      JOIN subjects s ON a.subject_id = s.id
      WHERE a.student_id = ?
    `;
    const params = [id];

    if (subject_id) {
      query += ' AND a.subject_id = ?';
      params.push(subject_id);
    }

    if (month) {
      query += " AND strftime('%Y-%m', a.date) = ?";
      params.push(month);
    }

    query += ' ORDER BY a.date DESC';

    const attendance = await getAll(query, params);

    // Calculate summary
    const summary = await getRow(
      `SELECT 
        COUNT(*) as total_classes,
        SUM(CASE WHEN status = 'PRESENT' THEN 1 ELSE 0 END) as present_count,
        ROUND(AVG(CASE WHEN status = 'PRESENT' THEN 100 ELSE 0 END), 0) as attendance_percentage
       FROM attendance 
       WHERE student_id = ?`,
      [id]
    );

    res.json({
      success: true,
      data: attendance,
      summary
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance'
    });
  }
});

// Get student marks
router.get('/:id/marks', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { semester } = req.query;

    let query = `
      SELECT m.id, m.exam_type, m.marks, m.max_marks, m.semester,
             s.name as subject, s.code as subject_code
      FROM marks m
      JOIN subjects s ON m.subject_id = s.id
      WHERE m.student_id = ?
    `;
    const params = [id];

    if (semester) {
      query += ' AND m.semester = ?';
      params.push(semester);
    }

    query += ' ORDER BY m.created_at DESC';

    const marks = await getAll(query, params);

    // Calculate CGPA
    const cgpaData = await getRow(
      `SELECT ROUND(AVG(CAST(marks AS FLOAT) / max_marks * 10), 2) as cgpa
       FROM marks 
       WHERE student_id = ?`,
      [id]
    );

    res.json({
      success: true,
      data: marks,
      cgpa: cgpaData?.cgpa || 0
    });
  } catch (error) {
    console.error('Get marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch marks'
    });
  }
});

// Mark attendance (Teacher only)
router.post('/attendance', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { student_id, subject_id, date, status } = req.body;

    // Check if attendance already marked
    const existing = await getRow(
      'SELECT id FROM attendance WHERE student_id = ? AND subject_id = ? AND date = ?',
      [student_id, subject_id, date]
    );

    if (existing) {
      // Update existing
      await runQuery(
        'UPDATE attendance SET status = ?, marked_by = ? WHERE id = ?',
        [status, req.user.id, existing.id]
      );
    } else {
      // Insert new
      await runQuery(
        'INSERT INTO attendance (student_id, subject_id, date, status, marked_by) VALUES (?, ?, ?, ?, ?)',
        [student_id, subject_id, date, status, req.user.id]
      );
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully'
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance'
    });
  }
});

module.exports = router;
