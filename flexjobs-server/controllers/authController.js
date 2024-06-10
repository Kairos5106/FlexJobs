const User = require('../models/userModel');
const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// TEST ROUTE
const test = (req, res) => {
    res.json('test is working');  
}

// REGISTER ENDPOINT
const registerUser = async (req, res) => {
    try{
        const {name, email, identity, phoneNo, password, passwordConfirm} = req.body;
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
        // Check if confirm password matches initial password
        if(password != passwordConfirm){
            return res.json({
                error: 'Passwords do not match'
            })
        }
        // Check if email is valid
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is already in use'
            })
        }

        const hashedPassword = await hashPassword(password);

        // Create user in database
        const user = await User.create({
            name,
            email,
            identity,
            phoneNo,
            password: hashedPassword,
        })

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

// LOGIN ENDPOINT
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({ // 401 is for unauthorized
                error: 'User with corresponding email does not exist'
            })
        }
        // Prompt user to enter password if password is not entered
        if(!password){
            return res.json({
                error: 'Please enter your password'
            })
        }
        // Check if password matches email
        const match = await comparePassword(password, user.password);
        // if(match){
        //     jwt.sign(
        //         {_id: user._id}, 
        //         process.env.JWTPRIVATEKEY, {}, 
        //         (error, token) => {

        //             if(error) throw error;

        //             res.cookie('token', token).json(user)
                    
        //             console.log(token);

        //         }

        //     );
        //     res.json('Password matches email. Logging user in...');
        if(match){
            jwt.sign(
                {_id: user._id}, 
                process.env.JWTPRIVATEKEY, {}, 
                (error, token) => {
                    if(error) throw error;
        
                    console.log(token);
                    res.cookie('token', token).json({
                        message: 'Password matches email. Logging user in...',
                        user
                    });
                }
            );
        } else {
            return res.json({
                error: 'Password does not match email'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// LOGOUT ENDPOINT
const logoutUser = async (req, res) => {
    res.clearCookie('token').json('Logged out');
    res.json('Logged out');
    console.log('Logged out');
    res.redirect('/Login');
    console.log('Redirected to login page');
}

// PROFILE ENDPOINT
const getProfile = async (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (error, user) => {
            if (error) throw error;
            res.json(user);
        });
    }
}

// Exporting module
module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
}