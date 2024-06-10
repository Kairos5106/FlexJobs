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

//Get User projects
const getUserProjects = async (req, res) => {
  try {

  } catch (error) {

  }

}

// app.get('/api/transactions/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // 1. Fetch Projects Relevant to the User (Buyer or Seller)
//     const projects = await Project.find({ 
//       $or: [{ clientId: userId }, { freelancerId: userId }],
//     });

//     // 2. Extract and Format Transactions from Projects
//     const transactions = projects.reduce((allTransactions, project) => {
//       // Iterate through the transactions array within each project
//       return allTransactions.concat(project.transactions.map(transaction => ({
//         // Spread the existing transaction data
//         ...transaction._doc, 
//         // Add project-related details for the transaction list view
//         projectId: project._id,
//         projectTitle: project.title, 
//         buyerId: project.clientId,
//         sellerId: project.freelancerId, 
//         completionDate: project.completionDate,
//       })));
//     }, []);

//     // 3. Sort Transactions (Optional, but recommended)
//     transactions.sort((a, b) => b.timestamp - a.timestamp); // Newest to oldest

//     res.json(transactions); 

//   } catch (error) {
//     console.error('Fetch Transactions Error:', error);
//     res.status(500).json({ error: 'Failed to fetch transactions' });
//   }
// });

module.exports = {
  testProjectPayments,
};


