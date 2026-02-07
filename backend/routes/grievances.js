const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all grievances
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, my_grievances } = req.query;

    let query = `
      SELECT g.id, g.category, g.description, g.status, g.is_anonymous, g.created_at, g.resolved_at,
             CASE 
               WHEN g.is_anonymous = 1 THEN 'Anonymous'
               ELSE u.name 
             END as user_name,
             u.enrollment_no
      FROM grievances g
      LEFT JOIN users u ON g.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Students can only see their own grievances
    if (req.user.role === 'STUDENT' && my_grievances === 'true') {
      query += ' AND g.user_id = ?';
      params.push(req.user.id);
    }

    if (status && status !== 'All') {
      query += ' AND g.status = ?';
      params.push(status);
    }

    query += ' ORDER BY g.created_at DESC';

    const grievances = await getAll(query, params);

    res.json({
      success: true,
      count: grievances.length,
      data: grievances
    });
  } catch (error) {
    console.error('Get grievances error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch grievances'
    });
  }
});

// Get grievance by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const grievance = await getRow(
      `SELECT g.id, g.category, g.description, g.status, g.is_anonymous, g.created_at, g.resolved_at,
              CASE 
                WHEN g.is_anonymous = 1 THEN 'Anonymous'
                ELSE u.name 
              END as user_name,
              u.enrollment_no, u.department
       FROM grievances g
       LEFT JOIN users u ON g.user_id = u.id
       WHERE g.id = ?`,
      [id]
    );

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: 'Grievance not found'
      });
    }

    // Students can only view their own grievances
    if (req.user.role === 'STUDENT') {
      const userGrievance = await getRow('SELECT user_id FROM grievances WHERE id = ?', [id]);
      if (userGrievance.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    res.json({
      success: true,
      data: grievance
    });
  } catch (error) {
    console.error('Get grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch grievance'
    });
  }
});

// Create grievance
router.post('/', authenticate, async (req, res) => {
  try {
    const { category, description, is_anonymous } = req.body;

    const result = await runQuery(
      'INSERT INTO grievances (user_id, category, description, is_anonymous) VALUES (?, ?, ?, ?)',
      [req.user.id, category, description, is_anonymous ? 1 : 0]
    );

    const grievance = await getRow(
      `SELECT g.id, g.category, g.description, g.status, g.is_anonymous, g.created_at,
              CASE 
                WHEN g.is_anonymous = 1 THEN 'Anonymous'
                ELSE u.name 
              END as user_name
       FROM grievances g
       LEFT JOIN users u ON g.user_id = u.id
       WHERE g.id = ?`,
      [result.id]
    );

    res.status(201).json({
      success: true,
      message: 'Grievance submitted successfully',
      data: grievance
    });
  } catch (error) {
    console.error('Create grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit grievance'
    });
  }
});

// Update grievance status (Admin/Management only)
router.put('/:id/status', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const resolvedAt = status === 'Resolved' ? new Date().toISOString() : null;

    await runQuery(
      'UPDATE grievances SET status = ?, resolved_at = ? WHERE id = ?',
      [status, resolvedAt, id]
    );

    const grievance = await getRow(
      `SELECT g.id, g.category, g.description, g.status, g.is_anonymous, g.created_at, g.resolved_at,
              CASE 
                WHEN g.is_anonymous = 1 THEN 'Anonymous'
                ELSE u.name 
              END as user_name
       FROM grievances g
       LEFT JOIN users u ON g.user_id = u.id
       WHERE g.id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Grievance status updated successfully',
      data: grievance
    });
  } catch (error) {
    console.error('Update grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update grievance status'
    });
  }
});

// Delete grievance (Admin only)
router.delete('/:id', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;

    await runQuery('DELETE FROM grievances WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Grievance deleted successfully'
    });
  } catch (error) {
    console.error('Delete grievance error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete grievance'
    });
  }
});

module.exports = router;
