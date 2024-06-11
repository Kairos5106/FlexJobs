const Project = require('../models/projectModel');// Import your Project model
const User =  require('../models/userModel');

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

//Create project
const createProject = async (req, res) => {
  try {
    const project = req.body;
    const newProject = new Project(project);
    await newProject.save();
    
    res.json(project);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
}

//Get User projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
    console.log(res)
  } catch (error) {
    console.log('hi')
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

//Get projects by user id
const getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.find({ $or: [{ clientId: userId }, { freelancerId: userId }] });
    res.json(projects);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}


//Get username by id
const getUserNameById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.json(user.name);
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch username' });
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
  createProject,
  getAllProjects,
  getProjectsByUserId,
  getUserNameById,
};


