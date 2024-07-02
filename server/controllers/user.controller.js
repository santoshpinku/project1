const db = require('../config/db.config');

const getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const [rows] = await db.promise().execute('SELECT id, email FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

module.exports = { getProfile };
