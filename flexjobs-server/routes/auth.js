const express = require('express');
const router = express.Router();
const cors = require('cors');

// Middleware
router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Importing controller functions
const { 
    test,
    registerUser,
 } = require('../controllers/authController');

// --------------------- ROUTES --------------------- //
// TEST ROUTE
router.get('/test', test);

// REGISTER ROUTE
router.post('/register', registerUser);

module.exports = router;