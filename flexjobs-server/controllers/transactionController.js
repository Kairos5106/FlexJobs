const Project = require('../models/projectModel'); // Import your Project model

// TEST ROUTE
const testProjectPayments = (req, res) => {
  try {
    // Fetch or generate the data you want to send
    const data = {
      message: 'This is a test response',
      // Add more data as needed
    };

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}

// Controller function for getting transactions
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have authentication middleware 
    const { fromDate, toDate, paymentStatus } = req.query; // Get filters

    // 1. Build the Query (start with base query)
    let query = { 
        $or: [ // Query for projects where the user is either client or freelancer
          { clientId: userId },
          { freelancerId: userId }
        ]
    };

    // 2. Apply Filters (if provided in the request)
    if (fromDate && toDate) {
      query.completionDate = { // Add date range filter
        $gte: new Date(fromDate),
        $lte: new Date(toDate) 
      };
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    // 3. Fetch Projects with Population
    const projects = await Project.find(query)
                                  .populate('clientId', 'firstName lastName') // Populate client info
                                  .populate('freelancerId', 'firstName lastName'); // Populate freelancer info

    // 4. Format Data for Frontend (you can customize the structure)
    const transactions = projects.map(project => ({
      projectId: project._id,
      projectTitle: project.title,
      clientName: project.clientId.firstName + ' ' + project.clientId.lastName,
      freelancerName: project.freelancerId.firstName + ' ' + project.freelancerId.lastName,
      completionDate: project.completionDate,
      paymentStatus: project.paymentStatus,
      paymentAmount: project.budget.amount, // Adjust based on your project model
      currency: project.budget.currency,  // Adjust based on your project model
      // ... add other necessary fields ...
    }));

    res.json(transactions); // Send the formatted data as JSON

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = {
  getUserTransactions,
  testProjectPayments,
};