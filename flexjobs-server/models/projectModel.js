const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  clientId: ObjectId,
  freelancerId: ObjectId,
  status: String,
  budget: {
    sort: String,
    amount: Number,
    currency: String
  },
  completionDate: Date,
  paymentStatus: String,
  totalAmountPaid: Number,
  paymentLink: String,
  transactions: [
    {
      transactionId: String,
      amount: Number,
      currency: String,
      status: String,
      timestamp: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);