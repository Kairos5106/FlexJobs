const User = require('../models/userModel');
const mongoose = require('mongoose');

// TEST ROUTE
const test = (req, res) => {
    res.json('test is working');  
}

// REGISTER ROUTE
const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        // Check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }
        // Check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }
        // Check if email is valid
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is already in use'
            })
        }

        const user = await User.create({
            name,
            email,
            identity,
            phoneNo,
            password,
        })

        return res.json(user);
    } catch (err) {
        console.log(err);
    }
}
// Exporting module
module.exports = {
    test,
    registerUser,
}