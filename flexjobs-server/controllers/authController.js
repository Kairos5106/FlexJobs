const User = require('../models/userModel');

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
    try{
        await User.findOne({ email: email })
        .then(user => {
            if(user.password === password){
                res.status(200).json("Success");
            } else {
                res.status(400).json({ error: "Invalid password" });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Exporting module
module.exports = {
    registerNewUser,
    findExistingUser
}