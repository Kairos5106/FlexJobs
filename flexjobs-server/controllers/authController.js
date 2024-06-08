const User = require('../models/userModel');
const mongoose = require('mongoose');

// TEST ROUTE
const test = (req, res) => {
    res.json('test is working');  
}

// Exporting module
module.exports = {
    test
}