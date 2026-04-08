// src/App.js
// ✅ Main app — data fetch karo, components dikhao

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SumCard from './components/SumCard';
import HistoryTable from './components/HistoryTable';

// Node.js backend ka URL
const API_URL = 'http://localhost:5000/results';

// Auto refresh interval (milliseconds)
const REFRESH_INTERVAL = 5000; // 5 seconds

function App() {

  const [results, setResults]     = useState([]);   // Saare results
  const [loading, setLoading]     = useState(true);  // Loading state
  const [error, setError]         = useState(null);  // Error state
  const [lastUpdated, setLastUpdated] = useState(''); // Last fetch time

  // ─── Data Fetch Function ──────────────────────────
  const fetchResults = async () => {
    try {
      const response = await axios.get(API_URL);
      setResults(response.data);
      setError(null);

      // Last updated time set karo
      const now = new Date().toLocaleTimeString('en-IN');
      setLastUpdated(now);

    } catch (err) {
      console.error('Fetch error:', err);
      setError('Backend se data nahi aa raha! Node.js server chal raha hai?');
    } finally {
      setLoading(false);
    }
  };

  // ─── Auto Refresh — Har 5 Sec Mein ──────────────
  useEffect(() => {
    // Pehli baar turant fetch karo
    fetchResults();

    // Phir har 5 seconds mein
    const interval = setInterval(fetchResults, REFRESH_INTERVAL);

    // Cleanup — component unmount hone pe interval band karo
    return () => clearInterval(interval);
  }, []);

  // ─── Loading Screen ───────────────────────────────
  if (loading) {
    return (
      <div className="loading">
        ⏳ Data load ho raha hai...
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────
  return (
    <div>

      {/* Header */}
      <div className="header">
        <h1>📡 UDP Sum Dashboard</h1>
        <p>Real-time results from UDP clients → Server → MongoDB</p>
      </div>

      <div className="container">

        {/* Status Bar */}
        <div className="status-bar">
          <span>
            <span className="status-dot"></span>
            Live — Auto refresh har 5 seconds
          </span>
          <span>🕐 Last updated: {lastUpdated}</span>
          <span>📊 Total records: {results.length}</span>
        </div>

        {/* Error Box */}
        {error && (
          <div className="error-box">
            ❌ {error}
          </div>
        )}

        {/* Latest Sum Card */}
        <SumCard data={results[0]} />

        {/* History Table — sirf tab dikhao jab data ho */}
        {results.length > 0 && (
          <HistoryTable results={results} />
        )}

      </div>
    </div>
  );
}

export default App;