const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all teachers
router.get('/', authenticate, async (req, res) => {
  try {
    const teachers = await getAll(
      `SELECT id, name, email, department, avatar, created_at 
       FROM users 
       WHERE role = 'TEACHER' AND is_active = 1 
       ORDER BY name`
    );
    
    res.json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teachers'
    });
  }
});

// Get teacher by ID with details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await getRow(
      `SELECT id, name, email, department, avatar, created_at 
       FROM users 
       WHERE id = ? AND role = 'TEACHER' AND is_active = 1`,
      [id]
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Get subjects taught
    const subjects = await getAll(
      `SELECT DISTINCT s.id, s.name, s.code, s.semester
       FROM timetable t
       JOIN subjects s ON t.subject_id = s.id
       WHERE t.teacher_id = ?`,
      [id]
    );

    // Get timetable
    const timetable = await getAll(
      `SELECT t.id, t.day, t.start_time, t.end_time, t.room, t.batch,
              s.name as subject, s.code as subject_code
       FROM timetable t
       JOIN subjects s ON t.subject_id = s.id
       WHERE t.teacher_id = ?
       ORDER BY 
         CASE t.day
           WHEN 'Monday' THEN 1
           WHEN 'Tuesday' THEN 2
           WHEN 'Wednesday' THEN 3
           WHEN 'Thursday' THEN 4
           WHEN 'Friday' THEN 5
           WHEN 'Saturday' THEN 6
           ELSE 7
         END,
         t.start_time`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...teacher,
        subjects,
        timetable
      }
    });
  } catch (error) {
    console.error('Get teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teacher'
    });
  }
});

// Upload marks (Teacher only)
router.post('/marks', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { student_id, subject_id, exam_type, marks, max_marks, semester } = req.body;

    await runQuery(
      `INSERT INTO marks (student_id, subject_id, exam_type, marks, max_marks, semester, entered_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_id, subject_id, exam_type, marks, max_marks, semester, req.user.id]
    );

    res.json({
      success: true,
      message: 'Marks uploaded successfully'
    });
  } catch (error) {
    console.error('Upload marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload marks'
    });
  }
});

// Update marks (Teacher only)
router.put('/marks/:markId', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { markId } = req.params;
    const { marks, remarks } = req.body;

    await runQuery(
      'UPDATE marks SET marks = ? WHERE id = ?',
      [marks, markId]
    );

    res.json({
      success: true,
      message: 'Marks updated successfully'
    });
  } catch (error) {
    console.error('Update marks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update marks'
    });
  }
});

// Add timetable entry (Teacher/Admin only)
router.post('/timetable', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { subject_id, day, start_time, end_time, room, batch } = req.body;

    await runQuery(
      `INSERT INTO timetable (subject_id, teacher_id, day, start_time, end_time, room, batch) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [subject_id, req.user.id, day, start_time, end_time, room, batch]
    );

    res.json({
      success: true,
      message: 'Timetable entry added successfully'
    });
  } catch (error) {
    console.error('Add timetable error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add timetable entry'
    });
  }
});

module.exports = router;
