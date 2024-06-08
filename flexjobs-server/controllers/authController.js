const User = require('../models/userModel');
const mongoose = require('mongoose');

// POST a new user
const registerNewUser = async (req, res) => {
    const { name, email, identity, phoneNo, password } = req.body;
    console.log( name, email, identity, phoneNo, password);
    try {
        const user = await User.create({ name, email, identity, phoneNo, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET an existing user
const findExistingUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Finding user with email: ", email);

    // Get the database name and collection names
    const dbName = mongoose.connection.name;
    const collections = mongoose.connection.collections;
    const collectionNames = Object.keys(collections);
    console.log(`Database name: ${dbName}`);
    console.log(`Collections: ${collectionNames.join(', ')}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // If no user is found, send a 404 response
            res.status(404).json({ error: "User not found" });
            console.log("User not found for email: ", email);
            return;
        }

        // Check if the password matches
        if (user.password === password) {
            res.status(200).json("Success");
            console.log("User found: ", user);
        } else {
            res.status(400).json({ error: "Invalid password" });
            console.log("Invalid password for user: ", user);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log("Error finding user: ", error);
    }
};


// Exporting module
module.exports = {
    registerNewUser,
    findExistingUser
}