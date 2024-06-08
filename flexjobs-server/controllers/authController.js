const User = require('../models/userModel');
const mongoose = require('mongoose');

// TEST ROUTE
const test = (req, res) => {
    res.json('test is working');  
}

// REGISTER ROUTE
const registerUser = async (req, res) => {
    try{
        const {name, email, identity, phoneNo, password} = req.body;
        // Check if name was entered
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }
        // Check if email was entered
        if(!email){
            return res.json({
                error: 'Email is required'
            });
        }
        // Check if identity was selected
        if(identity === ''){
            return res.json({
                error: 'Please choose your identity'
            });
        }
        // Check if phone number was entered
        if(!phoneNo){
            return res.json({
                error: 'Phone number is required'
            });
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
    } catch (error) {
        console.log(error);
    }
}
// Exporting module
module.exports = {
    test,
    registerUser,
}