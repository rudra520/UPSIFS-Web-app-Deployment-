const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all assignments
router.get('/', authenticate, async (req, res) => {
  try {
    const { subject_id, status } = req.query;

    let query = `
      SELECT a.id, a.title, a.description, a.deadline, a.created_at,
             s.name as subject, s.code as subject_code,
             u.name as created_by_name
      FROM assignments a
      JOIN subjects s ON a.subject_id = s.id
      LEFT JOIN users u ON a.created_by = u.id
      WHERE 1=1
    `;
    const params = [];

    if (subject_id) {
      query += ' AND a.subject_id = ?';
      params.push(subject_id);
    }

    query += ' ORDER BY a.deadline ASC';

    const assignments = await getAll(query, params);

    // If student, get their submission status
    if (req.user.role === 'STUDENT') {
      for (let assignment of assignments) {
        const submission = await getRow(
          `SELECT id, status, marks, remarks, submitted_at 
           FROM assignment_submissions 
           WHERE assignment_id = ? AND student_id = ?`,
          [assignment.id, req.user.id]
        );
        assignment.submission = submission || null;
      }
    }

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments'
    });
  }
});

// Get assignment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await getRow(
      `SELECT a.id, a.title, a.description, a.deadline, a.created_at,
              s.name as subject, s.code as subject_code,
              u.name as created_by_name
       FROM assignments a
       JOIN subjects s ON a.subject_id = s.id
       LEFT JOIN users u ON a.created_by = u.id
       WHERE a.id = ?`,
      [id]
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Get student's submission if exists
    if (req.user.role === 'STUDENT') {
      const submission = await getRow(
        `SELECT id, status, marks, remarks, submitted_at 
         FROM assignment_submissions 
         WHERE assignment_id = ? AND student_id = ?`,
        [id, req.user.id]
      );
      assignment.submission = submission || null;
    }

    // Get all submissions for teachers
    if (req.user.role === 'TEACHER' || req.user.role === 'MANAGEMENT') {
      const submissions = await getAll(
        `SELECT asub.id, asub.status, asub.marks, asub.remarks, asub.submitted_at,
                u.name as student_name, u.enrollment_no
         FROM assignment_submissions asub
         JOIN users u ON asub.student_id = u.id
         WHERE asub.assignment_id = ?`,
        [id]
      );
      assignment.submissions = submissions;
    }

    res.json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error('Get assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignment'
    });
  }
});

// Create assignment (Teacher/Admin only)
router.post('/', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { title, subject_id, description, deadline } = req.body;

    const result = await runQuery(
      'INSERT INTO assignments (title, subject_id, description, deadline, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, subject_id, description, deadline, req.user.id]
    );

    const assignment = await getRow(
      `SELECT a.id, a.title, a.description, a.deadline, a.created_at,
              s.name as subject, s.code as subject_code
       FROM assignments a
       JOIN subjects s ON a.subject_id = s.id
       WHERE a.id = ?`,
      [result.id]
    );

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create assignment'
    });
  }
});

// Submit assignment (Student only)
router.post('/:id/submit', authenticate, authorize('STUDENT'), async (req, res) => {
  try {
    const { id } = req.params;
    const { submission_url } = req.body;

    // Check if already submitted
    const existing = await getRow(
      'SELECT id FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?',
      [id, req.user.id]
    );

    if (existing) {
      // Update submission
      await runQuery(
        'UPDATE assignment_submissions SET submission_url = ?, status = "Submitted" WHERE id = ?',
        [submission_url, existing.id]
      );
    } else {
      // Create new submission
      await runQuery(
        'INSERT INTO assignment_submissions (assignment_id, student_id, submission_url, status) VALUES (?, ?, ?, "Submitted")',
        [id, req.user.id, submission_url]
      );
    }

    res.json({
      success: true,
      message: 'Assignment submitted successfully'
    });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit assignment'
    });
  }
});

// Grade assignment (Teacher/Admin only)
router.post('/:id/grade', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, marks, remarks } = req.body;

    await runQuery(
      'UPDATE assignment_submissions SET marks = ?, remarks = ?, status = "Graded" WHERE assignment_id = ? AND student_id = ?',
      [marks, remarks, id, student_id]
    );

    res.json({
      success: true,
      message: 'Assignment graded successfully'
    });
  } catch (error) {
    console.error('Grade assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to grade assignment'
    });
  }
});

// Delete assignment (Teacher/Admin only)
router.delete('/:id', authenticate, authorize('TEACHER', 'MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;

    await runQuery('DELETE FROM assignments WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete assignment'
    });
  }
});

module.exports = router;
