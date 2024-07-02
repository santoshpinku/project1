const db = require('../config/db.config');

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.promise().execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
};

module.exports = User;
