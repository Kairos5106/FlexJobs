const Project = require('../models/projectModel');// Import your Project model
const User =  require('../models/userModel');

// PDF API
const PDFGeneratorAPI = require('pdf-generator-api-client');

var defaultClient = PDFGeneratorAPI.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: JSONWebTokenAuth
var JSONWebTokenAuth = defaultClient.authentications['JSONWebTokenAuth'];
JSONWebTokenAuth.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI3YTgwNzNhYTYwNmI0ZDk2MmM0MDZlZjExYWNjNzVmNjVlYmUyZTIyODIxNjBiODAwNTdkYjc3NDRkYjhhZTYwIiwic3ViIjoienlsenlsbG1hb0BnbWFpbC5jb20iLCJleHAiOjE3MTgzNjE1MDh9.Vr_c8HDus_9eOqwD8NS7zU7GIbieiDMKfNSKUKCctBk"

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

//get user totalEarned fromm User collection
const getTotalEarned = async (req, res) => {
  try {
    const userId = req.params.userId;s
    const user = await User.findById(userId);
    res.json(user.totalEarned);
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch total earned' });
  }
}

// get pdf from pdf generator package
const getPdf = async (req, res) => {
  try {
    // Fetch the pdf from the api
    var apiInstance = new PDFGeneratorAPI.DocumentsApi();
    let opts = {
      'start_date': '2024-06-01 00:00:00',
      'end_date': '2024-06-13 23:59:59',
      'page': 1,
      'per_page': 10,
    };

    apiInstance.getDocuments(opts, (error, data, response) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch pdf' });
      } else {
        console.log('API called successfully. Returned data: ' + data);
        res.json(data);
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}

const handlePaymentSucceess = async (lineItems) => {
  let productId = lineItems.data[0].price.product;
  let amountPaid = lineItems.data[0].amount_total;
  [productId, amountPaid] = sortValues(productId, amountPaid);

  try {
    const project = await Project.findById(productId);
    if (!project) {
      console.log(`Project with id ${productId} not found`);
      return;
    }

    if(project.status === 'Completed') {
      console.log(`Project with id ${productId} has already been completed`);
      return;
    }

    project.completionDate = new Date();
    project.status = 'Completed';
    project.paymentStatus = 'Paid';
    project.totalAmountPaid = amountPaid;

    await project.save();

    console.log(`Project with id ${productId} has been updated`);
  } catch (error) {
    console.error(`Error updating project with id ${productId}: `, error);
  }
}








const sortValues = (productId, amountPaid) => {
  const productIds = {
    "prod_QGvfxwU4n4BsGb": "6667539b2906ec87b770a25e"
  }

  amountPaid = amountPaid / 100;

  const value = productIds[productId];
  return [value, amountPaid];
}

//Stripe webhook success payment listener
// const webhooks = async (req, res) => {
//   try {
//     console.log(event)
//     const event = req.body;
//     const paymentIntent = event.data.object;

//      // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         paymentIntent = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//       case 'invoice.payment_succeeded':
//         const invoicePaymentSucceeded = event.data.object;
//         // Then define and call a function to handle the event invoice.payment_succeeded
//         break;
//       case 'payment_intent.succeeded':
//         const paymentIntentSucceeded = event.data.object;
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//     // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     console.log('PaymentIntent was successful!', paymentIntent);
//     res.json({ received: true });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to process request' });
//   }
// }



module.exports = {
  testProjectPayments,
  createProject,
  getAllProjects,
  getProjectsByUserId,
  getUserNameById,
  getTotalEarned,
  getPdf,
  handlePaymentSucceess,
};


