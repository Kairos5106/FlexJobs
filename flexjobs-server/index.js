require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Import ObjectId

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@flexjobs.73fxfs7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let database;

// Function to connect to MongoDB and set up routes
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');

    // Set up database
    database = client.db("flexjobs-database");

// Sample Data for Users Collection
const sampleUsers = [
  { name: "John Doe", phone: "1234567890", email: "john@example.com" },
  { name: "Jane Smith", phone: "9876543210", email: "jane@example.com" },
  { name: "Alice Johnson", phone: "5555555555", email: "alice@example.com" }
];

 // Insert sample users into the users collection
 const usersCollection = database.collection("user");
 await usersCollection.insertMany(sampleUsers);
 console.log("Sample users inserted successfully.");

      // Module 2 ---------------------------------------------------------------------------------------------------------
      const jobsCollection = database.collection("jobs");
    
      // Post a job
      app.post("/post-job", async (req, res) => {
        const body = req.body;
        body.createdAt = new Date();
        try {
          const insertJob = await jobsCollection.insertOne(body);
          if (insertJob.insertedId) {
            return res.status(200).send(insertJob);
          } else {
            return res.status(404).send({
              message: "Cannot insert. Try again later.",
              status: false
            });
          }
        } catch (error) {
          return res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });
  
      // Get all jobs
      app.get("/all-jobs", async (req, res) => {
        try {
          const jobs = await jobsCollection.find({}).toArray();
          res.send(jobs);
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });
  
      // Get a single job using id (to be displayed in JobDetails.jsx)
      const { ObjectId } = require('mongodb');
  
      app.get("/all-jobs/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const job = await jobsCollection.findOne({
            _id: new ObjectId(id)
          });
          res.send(job);
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });
  
      // Apply for job
      const jobApplicationsCollection = database.collection("jobApplications");
      app.post("/post-job-application", async (req, res) => {
        const body = req.body;
        body.createdAt = new Date();
        try {
          const insertApplication = await jobApplicationsCollection.insertOne(body);
          if (insertApplication.insertedId) {
            return res.status(200).send(insertApplication);
          } else {
            return res.status(404).send({
              message: "Cannot insert. Try again later.",
              status: false
            });
          }
        } catch (error) {
          return res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });
  
      // Get all job application
      app.get("/all-job-applications", async (req, res) => {
        try {
          const jobApplications = await jobApplicationsCollection.find({}).toArray();
          res.send(jobApplications);
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });
  
  // Module 2 ---------------------------------------------------------------------------------------------------------
  

    // Module 5 ---------------------------------------------------------------------------------------------------------//

    const portfolioCollection = database.collection("portfolio-experience");

       // Set up route to save results
       app.post('/save-results', async (req, res) => {
        try {
          const resultsCollection = database.collection("result");
          const { username, results } = req.body;
          const newResult = { username, results, date: new Date() };
          const result = await resultsCollection.insertOne(newResult);
          res.status(200).send(`Result saved with ID: ${result.insertedId}`);
        } catch (error) {
          console.error('Error saving results:', error);
          res.status(500).send('Error saving results');
        }
      });
  

    // Create a new experience
    app.post('/experience', async (req, res) => {
      try {
        const newExperience = req.body;
        const result = await portfolioCollection.insertOne(newExperience);
        res.status(201).send(`Experience created with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).send('Error creating experience');
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Kevin!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})