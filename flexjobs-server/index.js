const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Import ObjectId
require('dotenv').config();

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

    const portfolioCollection = database.collection("portfolio");

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

    // Get all experiences
    app.get('/experience', async (req, res) => {
      try {
        const experiences = await portfolioCollection.find().toArray();
        res.status(200).json(experiences);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).send('Error fetching experiences');
      }
    });

    // Get a specific experience by ID
    app.get('/experience/:id', async (req, res) => {
      try {
        const experience = await portfolioCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!experience) {
          return res.status(404).send('Experience not found');
        }
        res.status(200).json(experience);
      } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).send('Error fetching experience');
      }
    });

    // Update an experience
    app.put('/experience/:id', async (req, res) => {
      try {
        const updatedExperience = req.body;
        const result = await portfolioCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedExperience }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Experience not found');
        }
        res.status(200).send('Experience updated');
      } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).send('Error updating experience');
      }
    });

    // Delete an experience
    app.delete('/experience/:id', async (req, res) => {
      try {
        const result = await portfolioCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).send('Experience not found');
        }
        res.status(200).send('Experience deleted');
      } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).send('Error deleting experience');
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

// Call the run function
run().catch(console.error);
