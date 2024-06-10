// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { collection: 'forumComments' });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
