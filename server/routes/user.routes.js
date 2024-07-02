const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../utils/auth');

router.get('/profile', auth.verifyToken, userController.getProfile);

module.exports = router;
