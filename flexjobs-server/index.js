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

    // Set up route to save results
    app.post('/save-results', async (req, res) => {
      try {
        console.log('Received request to save results:', req.body);
        const resultsCollection = database.collection("results");
        const usersCollection = database.collection("users");
        const { userId, results } = req.body;

        // Find the user by ID
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
          return res.status(404).send('User not found');
        }

        // Save results linked to the user ID
        const newResult = { userId: new ObjectId(userId), results, date: new Date() };
        const result = await resultsCollection.insertOne(newResult);
        console.log('Result saved with ID:', result.insertedId);
        res.status(200).send(`Result saved with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error saving results:', error);
        res.status(500).send('Error saving results');
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
