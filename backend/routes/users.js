const express = require('express');
const { getAll, getRow, runQuery } = require('../database/connection');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const users = await getAll(
      'SELECT id, name, email, role, department, semester, enrollment_no, avatar, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Users can only view their own profile unless they're admin
    if (req.user.id != id && req.user.role !== 'MANAGEMENT') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await getRow(
      'SELECT id, name, email, role, department, semester, enrollment_no, avatar, is_active, created_at FROM users WHERE id = ?',
      [id]
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
});

// Update user
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, semester, avatar } = req.body;

    // Users can only update their own profile unless they're admin
    if (req.user.id != id && req.user.role !== 'MANAGEMENT') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await runQuery(
      'UPDATE users SET name = ?, department = ?, semester = ?, avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, department, semester, avatar, id]
    );

    const updatedUser = await getRow(
      'SELECT id, name, email, role, department, semester, enrollment_no, avatar FROM users WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize('MANAGEMENT'), async (req, res) => {
  try {
    const { id } = req.params;

    await runQuery('UPDATE users SET is_active = 0 WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate user'
    });
  }
});

module.exports = router;
