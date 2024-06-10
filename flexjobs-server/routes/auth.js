const express = require('express');
const router = express.Router();
const cors = require('cors');

// Middleware
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Importing controller functions
const { 
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
 } = require('../controllers/authController');

// --------------------- ROUTES --------------------- //
// TEST ROUTE
router.get('/test', test);

// REGISTER ROUTE
router.post('/register', registerUser);

// LOGIN ROUTE
router.post('/login', loginUser);

// LOGOUT ROUTE
router.post('/logout', logoutUser);

// PROFILE ROUTE
router.get('/profile', getProfile);

module.exports = router;