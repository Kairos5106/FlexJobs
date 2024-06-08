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
 } = require('../controllers/authController');

// --------------------- ROUTES --------------------- //
// TEST ROUTE
router.get('/test', test);

module.exports = router;