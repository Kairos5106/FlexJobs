const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Import controller

// Define the API endpoint and HTTP method
router.get('/', transactionController.getUserTransactions); // Handle GET requests 

// TEST ROUTE
router.get('/test-project-payment', transactionController.testProjectPayments);

module.exports = router;