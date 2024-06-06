const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()

// middleware
app.use(express.json())
app.use(cors())


// MongoDB Setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@flexjobs.73fxfs7.mongodb.net/?retryWrites=true&w=majority&appName=FlexJobs`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create database
    const database = client.db("flexjobs-database");
    const users = database.collection("users");

    /*
    // Create a document to insert
    const personOne = {
        username: "sample_username",
        status: "admin"
    }

    // Insert the document into the collection
    const result = await users.insertOne(personOne);

    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    */

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

    // Module 2 ---------------------------------------------------------------------------------------------------------


    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Kevin!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})