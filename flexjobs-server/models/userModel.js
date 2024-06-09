const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    identity: String,
    phoneNo: String,
    password: String
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);