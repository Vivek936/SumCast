const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Result = require('./models/Result');

const app = express();
const PORT = 5000;


app.use(cors());              
app.use(express.json());      



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB se connect ho gaya!'))
  .catch((err) => console.log('❌ MongoDB error:', err));




app.post('/save', async (req, res) => {
  try {
    console.log('\n📩 Python se data aaya:', req.body);

    const { clientValues, sum } = req.body;


    if (!clientValues || sum === undefined) {
      return res.status(400).json({ error: 'clientValues aur sum required hai!' });
    }

    const newResult = new Result({
      clientValues,
      sum
    });

    await newResult.save();

    console.log('💾 MongoDB mein save ho gaya!');
    res.status(201).json({
      message: '✅ Result save ho gaya!',
      data: newResult
    });

  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(500).json({ error: 'Server error aaya' });
  }
});




app.get('/results', async (req, res) => {
  try {

    const results = await Result.find().sort({ timestamp: -1 });

    console.log(`📤 ${results.length} results bhej rahe hain frontend ko`);
    res.status(200).json(results);

  } catch (error) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ error: 'Server error aaya' });
  }
});




app.listen(PORT, () => {
  console.log(`\n🚀 Node.js server chal raha hai: http://localhost:${PORT}`);
  console.log('📌 Available APIs:');
  console.log(`   POST http://localhost:${PORT}/save`);
  console.log(`   GET  http://localhost:${PORT}/results`);
});
