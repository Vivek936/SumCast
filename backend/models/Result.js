// backend/models/Result.js
// ✅ MongoDB mein data ka structure define karta hai

const mongoose = require('mongoose');

// Schema = MongoDB collection ka blueprint
const ResultSchema = new mongoose.Schema({

  // Teeno clients ke numbers (array mein)
  clientValues: {
    type: [Number],   // e.g. [5, 3, 7]
    required: true
  },

  // Calculated sum
  sum: {
    type: Number,     // e.g. 15
    required: true
  },

  // Automatically current time save hogi
  timestamp: {
    type: Date,
    default: Date.now
  }

});

// Model export karo — server.js mein use hoga
module.exports = mongoose.model('Result', ResultSchema);