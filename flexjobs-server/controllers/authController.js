const User = require('../models/userModel');

// GET a single user
const registerNewUser = async (req, res) => {
    const { email, identity, phoneNo, password } = req.body;
    console.log(email, identity, phoneNo, password);
    try {
        const user = await User.create({ email, identity, phoneNo, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// UPDATE a single user

// Exporting module
module.exports = {
    registerNewUser
}