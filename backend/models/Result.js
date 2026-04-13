
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({

  clientValues: {
    type: [Number],   // e.g. [5, 3, 7]
    required: true
  },

  // Calculated sum
  sum: {
    type: Number,     // e.g. 15
    required: true
  },


  timestamp: {
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('Result', ResultSchema);
