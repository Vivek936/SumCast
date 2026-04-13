
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SumCard from './components/SumCard';
import HistoryTable from './components/HistoryTable';

const API_URL = 'http://localhost:5000/results';

const REFRESH_INTERVAL = 5000; 

function App() {

  const [results, setResults]     = useState([]);  
  const [loading, setLoading]     = useState(true);  
  const [error, setError]         = useState(null);  
  const [lastUpdated, setLastUpdated] = useState(''); 

  
  const fetchResults = async () => {
    try {
      const response = await axios.get(API_URL);
      setResults(response.data);
      setError(null);

  
      const now = new Date().toLocaleTimeString('en-IN');
      setLastUpdated(now);

    } catch (err) {
      console.error('Fetch error:', err);
      setError('Backend se data nahi aa raha! Node.js server chal raha hai?');
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
  
    fetchResults();

  
    const interval = setInterval(fetchResults, REFRESH_INTERVAL);

  
    return () => clearInterval(interval);
  }, []);

  
  if (loading) {
    return (
      <div className="loading">
        ⏳ Data load ho raha hai...
      </div>
    );
  }

  
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

        {/* History Table */}
        {results.length > 0 && (
          <HistoryTable results={results} />
        )}

      </div>
    </div>
  );
}

export default App;
