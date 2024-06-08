const express = require('express');
const User = require('../models/userModel');
const { 
    registerNewUser,
    findExistingUser
 } = require('../controllers/authController');

const router = express.Router();

// POST a new user 
router.post('/register', registerNewUser);

// GET an existing user
router.post('/login', findExistingUser);

module.exports = router;