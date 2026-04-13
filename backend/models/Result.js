
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({

  clientValues: {
    type: [Number],
    required: true
  },

 
  sum: {
    type: Number,   
    required: true
  },


  timestamp: {
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model('Result', ResultSchema);
