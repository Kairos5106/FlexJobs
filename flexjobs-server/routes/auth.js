const express = require('express');
const User = require('../models/userModel');
const { 
    registerNewUser
 } = require('../controllers/authController');

const router = express.Router();

// POST a new user 
router.post('/registerNewUser', registerNewUser);

// Testing routing
router.post('/test', async (req, res) => {
    res.json({ message: 'Hello from server!' });
});

module.exports = router;