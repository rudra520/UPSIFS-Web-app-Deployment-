const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all notices
router.get('/', authenticate, async (req, res) => {
  try {
    const { category, limit = 20 } = req.query;

    let query = `
      SELECT n.id, n.title, n.content, n.category, n.is_pinned, n.created_at,
             u.name as created_by_name
      FROM notices n
      LEFT JOIN users u ON n.created_by = u.id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'All') {
      query += ' AND n.category = ?';
      params.push(category);
    }

    query += ' ORDER BY n.is_pinned DESC, n.created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const notices = await getAll(query, params);

    res.json({
      success: true,
      count: notices.length,
      data: notices
    });
  } catch (error) {
    console.error('Get notices error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notices'
    });
  }
});

// Get notice by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await getRow(
      `SELECT n.id, n.title, n.content, n.category, n.is_pinned, n.created_at,
              u.name as created_by_name
       FROM notices n
       LEFT JOIN users u ON n.created_by = u.id
       WHERE n.id = ?`,
      [id]
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    console.error('Get notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notice'
    });
  }
});

// Create notice (Admin/Management only)
router.post('/', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { title, content, category, is_pinned } = req.body;

    const result = await runQuery(
      'INSERT INTO notices (title, content, category, is_pinned, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, content, category, is_pinned ? 1 : 0, req.user.id]
    );

    const notice = await getRow(
      `SELECT n.id, n.title, n.content, n.category, n.is_pinned, n.created_at,
              u.name as created_by_name
       FROM notices n
       LEFT JOIN users u ON n.created_by = u.id
       WHERE n.id = ?`,
      [result.id]
    );

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    console.error('Create notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notice'
    });
  }
});

// Update notice (Admin/Management only)
router.put('/:id', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, is_pinned } = req.body;

    await runQuery(
      'UPDATE notices SET title = ?, content = ?, category = ?, is_pinned = ? WHERE id = ?',
      [title, content, category, is_pinned ? 1 : 0, id]
    );

    const notice = await getRow(
      `SELECT n.id, n.title, n.content, n.category, n.is_pinned, n.created_at,
              u.name as created_by_name
       FROM notices n
       LEFT JOIN users u ON n.created_by = u.id
       WHERE n.id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    console.error('Update notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notice'
    });
  }
});

// Delete notice (Admin/Management only)
router.delete('/:id', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;

    await runQuery('DELETE FROM notices WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notice'
    });
  }
});

module.exports = router;
