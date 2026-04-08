// backend/server.js
// ✅ Express server with 2 APIs:
//    POST /save   → Python se data receive karo, MongoDB mein save karo
//    GET  /results → Saare results return karo

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Result = require('./models/Result');  // Hamara schema

const app = express();
const PORT = 5000;

// ─── MIDDLEWARE ──────────────────────────────────────────
app.use(cors());              // React frontend allow karo
app.use(express.json());      // JSON body parse karo
// ─────────────────────────────────────────────────────────

// ─── MONGODB CONNECTION ──────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB se connect ho gaya!'))
  .catch((err) => console.log('❌ MongoDB error:', err));
// ─────────────────────────────────────────────────────────


// ─── API 1: POST /save ───────────────────────────────────
// Python UDP server yahan data bhejega
app.post('/save', async (req, res) => {
  try {
    console.log('\n📩 Python se data aaya:', req.body);

    const { clientValues, sum } = req.body;

    // Validate karo
    if (!clientValues || sum === undefined) {
      return res.status(400).json({ error: 'clientValues aur sum required hai!' });
    }

    // MongoDB mein naya document banao
    const newResult = new Result({
      clientValues,
      sum
    });

    // Database mein save karo
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
// ─────────────────────────────────────────────────────────


// ─── API 2: GET /results ─────────────────────────────────
// React frontend yahan se data fetch karega
app.get('/results', async (req, res) => {
  try {
    // Saare results lo, latest pehle (-1 = descending order)
    const results = await Result.find().sort({ timestamp: -1 });

    console.log(`📤 ${results.length} results bhej rahe hain frontend ko`);
    res.status(200).json(results);

  } catch (error) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ error: 'Server error aaya' });
  }
});
// ─────────────────────────────────────────────────────────


// ─── SERVER START ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Node.js server chal raha hai: http://localhost:${PORT}`);
  console.log('📌 Available APIs:');
  console.log(`   POST http://localhost:${PORT}/save`);
  console.log(`   GET  http://localhost:${PORT}/results`);
});