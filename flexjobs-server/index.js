// Import the required modules
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Import ObjectId
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');



const app = express();

const port = process.env.PORT || 3000;

// Imports for Module 1
const userAuthRoutes = require('./routes/auth');
const { default: mongoose } = require('mongoose');

//Imports for Module 4
const transactionRoutes = require('./routes/transactionRoutes');


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@flexjobs.73fxfs7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Mongoose connection
const uriAlt = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@flexjobs.73fxfs7.mongodb.net/flexjobs-database?retryWrites=true&w=majority`;
mongoose.connect(uriAlt)
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch((error) => console.log('Error connecting to MongoDB via Mongoose:', error));

let database;

// Connect to MongoDB and set up routes
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');

    // Set up database
    database = client.db("flexjobs-database");

    // Module 1 Routes
    app.use('/auth', userAuthRoutes);
    // app.use('/api/education', educationRoutes); // Add education routes

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
  
    // Module 3 ---------------------------------------------------------------------------------------------------------
    const feedbacksCollection = database.collection("feedback");

    app.post('/feedback', async (req, res) => {
      const feedback = req.body;
      // console.log('Received feedback:', feedback); // Debugging log
      try {
        const feedbackResult = await feedbacksCollection.insertOne(feedback);
        // console.log('Feedback inserted:', feedbackResult); // Debugging log
        res.status(200).json({ message: 'Feedback added successfully!', feedbackId: feedbackResult.insertedId });
      } catch (error) {
        // console.error('Error inserting feedback:', error); // Debugging log
        res.status(500).json({ message: 'Error adding feedback', error });
      }
    });


    // Module 3 ---------------------------------------------------------------------------------------------------------

    // Module 4 Test ---------------------------------------------------------------------------------------------------------

    app.use('/Payments', transactionRoutes);


    // Module 4 Test ---------------------------------------------------------------------------------------------------------
    
//Module 5 test
//const { Experience } = require('./models/educationModel'); // Ensure you import your models correctly
//const educationRoutes = require('./routes/educationRoutes');

    // Module 5 ---------------------------------------------------------------------------------------------------------//

    // 5.2 Set up route to save results
    app.post('/save-results', async (req, res) => {
      try {
        const resultsCollection = database.collection("result");
        const { results } = req.body;
        const newResult = { results, date: new Date() };
        const result = await resultsCollection.insertOne(newResult);
        res.status(200).send(`Result saved with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error saving results:', error);
        res.status(500).send('Error saving results');
      }
    });

    const portfolioCollection = database.collection("portfolio-experience");
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

    const skillCollection = database.collection("portfolio-skill");

    // Create a new skill
    app.post('/skill', async (req, res) => {
      try {
        const newSkill = req.body;
        const result = await skillCollection.insertOne(newSkill);
        res.status(201).send(`Skill created with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).send('Error creating skill');
      }
    });

    // Get all skill
    app.get('/skill', async (req, res) => {
      try {
        const skill = await skillCollection.find().toArray();
        res.status(200).json(skill);
      } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).send('Error fetching skill');
      }
    });

    // Get a specific skill by ID
    app.get('/skill/:id', async (req, res) => {
      try {
        const skill = await skillCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!skill) {
          return res.status(404).send('Skill not found');
        }
        res.status(200).json(skill);
      } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).send('Error fetching skill');
      }
    });

    // Update skill
    app.put('/skill/:id', async (req, res) => {
      try {
        const updatedSkill = req.body;
        const result = await skillCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedSkill }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Skill not found');
        }
        res.status(200).send('Skill updated');
      } catch (error) {
        console.error('Error updating skill:', error);
        res.status(500).send('Error updating skill');
      }
    });

    // Delete skill
    app.delete('/skill/:id', async (req, res) => {
      try {
        const result = await skillCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).send('Skill not found');
        }
        res.status(200).send('SKill deleted');
      } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).send('Error deleting skill');
      }
    });

    const educationCollection = database.collection("portfolio-education");


     // Create a new education
     app.post('/education', async (req, res) => {
      try {
        const newEducation = req.body;
        const result = await educationCollection.insertOne(newEducation);
        res.status(201).send(`Education created with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error creating education:', error);
        res.status(500).send('Error creating education');
      }
    });

    // Get all education
    app.get('/education', async (req, res) => {
      try {
        const education = await educationCollection.find().toArray();
        res.status(200).json(education);
      } catch (error) {
        console.error('Error fetching education:', error);
        res.status(500).send('Error fetching education');
      }
    });

    // Get a specific education by ID
    app.get('/education/:id', async (req, res) => {
      try {
        const education = await educationCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!education) {
          return res.status(404).send('Education not found');
        }
        res.status(200).json(education);
      } catch (error) {
        console.error('Error fetching education:', error);
        res.status(500).send('Error fetching education');
      }
    });

    // Update an education
    app.put('/education/:id', async (req, res) => {
      try {
        const updatedEducation = req.body;
        const result = await educationCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedEducation }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Education not found');
        }
        res.status(200).send('Education updated');
      } catch (error) {
        console.error('Error updating education:', error);
        res.status(500).send('Error updating education');
      }
    });

    // Delete an education
    app.delete('/education/:id', async (req, res) => {
      try {
        const result = await educationCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).send('Education not found');
        }
        res.status(200).send('Education deleted');
      } catch (error) {
        console.error('Error deleting education:', error);
        res.status(500).send('Error deleting education');
      }
    });

    app.post('/experience', async (req, res) => {
      try {
        const { token } = req.cookies;
        if (!token) return res.status(401).send('Unauthorized');
    
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const newExperience = new Experience({ ...req.body, userId: user._id });
    
        await newExperience.save();
        res.status(201).send('Experience created successfully');
      } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).send('Error creating experience');
      }
    });

    app.get('/experience', async (req, res) => {
      try {
        const { token } = req.cookies;
        if (!token) return res.status(401).send('Unauthorized');
    
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const experiences = await Experience.find({ userId: user._id });
    
        res.status(200).json(experiences);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).send('Error fetching experiences');
      }
    });

    const honorCollection = database.collection("portfolio-honor");

    // Create a new honor
    app.post('/honor', async (req, res) => {
      try {
        const newHonor = req.body;
        const result = await honorCollection.insertOne(newHonor);
        res.status(201).send(`Honor created with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error creating honor:', error);
        res.status(500).send('Error creating honor');
      }
    });

    // Get all honors
    app.get('/honor', async (req, res) => {
      try {
        const honor = await honorCollection.find().toArray();
        res.status(200).json(honor);
      } catch (error) {
        console.error('Error fetching honor:', error);
        res.status(500).send('Error fetching honor');
      }
    });

    // Get a specific honor by ID
    app.get('/honor/:id', async (req, res) => {
      try {
        const honor = await honorCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!honor) {
          return res.status(404).send('Honor not found');
        }
        res.status(200).json(honor);
      } catch (error) {
        console.error('Error fetching honor:', error);
        res.status(500).send('Error fetching honor');
      }
    });

    // Update honor
    app.put('/honor/:id', async (req, res) => {
      try {
        const updatedHonor = req.body;
        const result = await honorCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedHonor }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Honor not found');
        }
        res.status(200).send('Honor updated');
      } catch (error) {
        console.error('Error updating honor:', error);
        res.status(500).send('Error updating honor');
      }
    });

    // Delete honor
    app.delete('/honor/:id', async (req, res) => {
      try {
        const result = await honorCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).send('Honor not found');
        }
        res.status(200).send('Honor deleted');
      } catch (error) {
        console.error('Error deleting honor:', error);
        res.status(500).send('Error deleting honor');
      }
    });

    const organizationCollection = database.collection("portfolio-organization");

    // Create a new organization
    app.post('/organization', async (req, res) => {
      try {
        const newOrganization = req.body;
        const result = await organizationCollection.insertOne(newOrganization);
        res.status(201).send(`Organization created with ID: ${result.insertedId}`);
      } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).send('Error creating organization');
      }
    });

    // Get all organizations
    app.get('/organization', async (req, res) => {
      try {
        const organization = await organizationCollection.find().toArray();
        res.status(200).json(organization);
      } catch (error) {
        console.error('Error fetching organization:', error);
        res.status(500).send('Error fetching organization');
      }
    });

    // Get a specific organization by ID
    app.get('/organization/:id', async (req, res) => {
      try {
        const organization = await organizationCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!organization) {
          return res.status(404).send('organization not found');
        }
        res.status(200).json(organization);
      } catch (error) {
        console.error('Error fetching organization:', error);
        res.status(500).send('Error fetching organization');
      }
    });

    // Update organization
    app.put('/organization/:id', async (req, res) => {
      try {
        const updatedOrganization = req.body;
        const result = await organizationCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedOrganization }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Organization not found');
        }
        res.status(200).send('Organization updated');
      } catch (error) {
        console.error('Error updating organization:', error);
        res.status(500).send('Error updating organization');
      }
    });

    // Delete organization
    app.delete('/organization/:id', async (req, res) => {
      try {
        const result = await organizationCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).send('organization not found');
        }
        res.status(200).send('organization deleted');
      } catch (error) {
        console.error('Error deleting organization:', error);
        res.status(500).send('Error deleting organization');
      }
    });

    // 5.3 Job Applied- Get job applications by email
    app.get("/job-applications/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const jobApplications = await jobApplicationsCollection.find({ email: email }).toArray();
        if (jobApplications.length > 0) {
          res.status(200).json(jobApplications);
        } else {
          res.status(404).send({
            message: "No job applications found for this email",
            status: false
          });
        }
      } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).send({
          message: "Internal Server Error",
          status: false
        });
      }
    });
    // Module 5 ---------------------------------------------------------------------------------------------------------
// Module 6 ------------------------------------------------------------------------------------------------------
// Create a new collection for the forum
    const forumCollection = database.collection("forum");

          // Post a forum topic
            
      app.post("/post-forum-topic", async (req, res) => {
        const { title, content } = req.body;
        const newPost = {
          title,
          content,
          upvote: 0,
          downvote: 0,
          timestamp: new Date(),
        };

        try {
          const insertPost = await forumCollection.insertOne(newPost);
          if (insertPost.insertedId) {
            return res.status(200).send(insertPost);
          } else {
            return res.status(404).send({
              message: "Cannot insert. Try again later.",
              status: false,
            });
          }
        } catch (error) {
          return res.status(500).send({
            message: "Internal Server Error",
            status: false,
          });
        }
      });
          


       // Popular Topics Endpoint
    app.get("/popular-topics", async (req, res) => {
      try {
        const popularTopics = await database.collection("forum").find().sort({ upvotes: -1 }).toArray();
        res.status(200).json(popularTopics);
      } catch (error) {
        console.error('Error fetching popular topics:', error);
        res.status(500).send('Error fetching popular topics');
      }
    });

    // Featured Topics Endpoint
    app.get("/featured-topics", async (req, res) => {
      try {
        const featuredTopics = await database.collection("forum").find().sort({ timestamp: 1 }).toArray();
        res.status(200).json(featuredTopics);
      } catch (error) {
        console.error('Error fetching featured topics:', error);
        res.status(500).send('Error fetching featured topics');
      }
    });

      // Route to get a specific forum post by ID
      app.get("/forum/posts/:id", async (req, res) => {
        try {
          const id = req.params.id;
          const forumPost = await forumCollection.findOne({ _id: new ObjectId(id) });
          if (forumPost) {
            res.send(forumPost);
          } else {
            res.status(404).send({
              message: "Forum post not found",
              status: false
            });
          }
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            status: false
          });
        }
      });

      
      const forumCommentCollection = database.collection("forumComments");

      // comments part
      app.post("/post-forum-comments", async (req, res) => {
        const {forumId, content } = req.body;
        const newPost = {
          forumId,
          content,
          upvote: 0,
          downvote: 0,
          timestamp: new Date(),
        };

        try {
          const insertPost = await forumCommentCollection.insertOne(newPost);
          if (insertPost.insertedId) {
            return res.status(200).send(insertPost);
          } else {
            return res.status(404).send({
              message: "Cannot insert. Try again later.",
              status: false,
            });
          }
        } catch (error) {
          return res.status(500).send({
            message: "Internal Server Error",
            status: false,
          });
        }
      });

      
      // Endpoint to get all comments
      app.get('/forum-comments', async (req, res) => {
        try {
            // Retrieve all comments
            const comments = await database.collection('forumComments').find({}).toArray();
            res.status(200).send(comments);
            
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).send({ message: 'Internal server error' });
        }
      });

     // Upvote a comment
     app.patch('/upvote-comment/:id', async (req, res) => {
      const { id } = req.params;
     
      try {
        // findOneAndUpdate operation
        const comment = await forumCommentCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { upvote: 1 } },
            { new: true }
        );
        // Rest of the code...
    } catch (error) {
        console.error("Error updating comment:", error); // Log any errors
        res.status(500).json({ message: "Internal server error" }); // Send an appropriate error response
    }
    
    });
    
    // Upvote a comment
    app.patch('/downvote-comment/:id', async (req, res) => {
      const { id } = req.params;
      console.log(id);
      try {
        // findOneAndUpdate operation
        const comment = await forumCommentCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $inc: { downvote: 1 } },
            { new: true }
        );
        // Rest of the code...
    } catch (error) {
        console.error("Error updating comment:", error); // Log any errors
        res.status(500).json({ message: "Internal server error" }); // Send an appropriate error response
    }
    
    });
    // Remove upvote from a comment
app.patch('/remove-upvote-comment/:id', async (req, res) => {
  const { id } = req.params;
  try {
      // Update the comment to decrement the upvote count and remove user from upvotedBy array
      const comment = await forumCommentCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { downvote: -1 }},
        { new: true }
    );
  } catch (error) {
      console.error("Error removing upvote from comment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Remove downvote from a comment
app.patch('/remove-downvote-comment/:id', async (req, res) => {
  const { id } = req.params;
  try {
      // Update the comment to decrement the downvote count and remove user from downvotedBy array
      const updatedComment = await forumCommentCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $inc: { downvote: -1 }},
          { new: true }
      );

      res.json(updatedComment);
  } catch (error) {
      console.error("Error removing downvote from comment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});





// End of module 6 -----------------------------------
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}



    

// Call the run function
run().catch(console.error);
