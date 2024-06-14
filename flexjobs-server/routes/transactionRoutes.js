const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Import controller

// Define the API endpoint and HTTP method
// router.get('/', transactionController.getUserTransactions); // Handle GET requests 

// TEST ROUTE
router.get('/test-message', transactionController.testProjectPayments);

router.get('/getAllProjects', transactionController.getAllProjects);

router.post('/createProject', transactionController.createProject);

router.get('/getProjectsByUserId/:userId', transactionController.getProjectsByUserId);

router.get('/getUsernameById/:userId', transactionController.getUserNameById);


// get user totalEarned
router.get('/getTotalEarned/:userId', transactionController.getTotalEarned);

module.exports = router;