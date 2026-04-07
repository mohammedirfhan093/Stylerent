import React, { useState } from 'react';
import { aiRecommend, aiSearch } from '../services/api';

function AIRecommend() {
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [searchDesc, setSearchDesc] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await aiRecommend({ occasion, budget, preferences });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setRecommendation('AI service is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await aiSearch({ description: searchDesc });
      setSearchResult(res.data.filters);
    } catch (err) {
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤖 AI Fashion Assistant</h2>

      {/* AI Recommendation */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>✨ Smart Outfit Recommendations</h3>
        <p style={styles.subtitle}>Tell us about your occasion and get AI powered suggestions!</p>
        <input
          style={styles.input}
          type="text"
          placeholder="Occasion (e.g. wedding, party, photoshoot)"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Budget per day (in ₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Preferences (e.g. red, traditional, modern)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleRecommend}
          disabled={loading}
        >
          {loading ? 'Getting Recommendations...' : '🤖 Get AI Recommendations'}
        </button>
        {recommendation && (
          <div style={styles.result}>
            <h4>AI Recommendations:</h4>
            <p style={styles.recommendationText}>{recommendation}</p>
          </div>
        )}
      </div>

      {/* AI Search */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>🔍 Smart Search</h3>
        <p style={styles.subtitle}>Describe what you want and AI will find it!</p>
        <input
          style={styles.input}
          type="text"
          placeholder="e.g. red saree for wedding under ₹500"
          value={searchDesc}
          onChange={(e) => setSearchDesc(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : '🔍 AI Search'}
        </button>
        {searchResult && (
          <div style={styles.result}>
            <h4>Search Filters:</h4>
            <p>Category: <strong>{searchResult.category}</strong></p>
            <p>Keywords: <strong>{searchResult.keywords}</strong></p>
            {searchResult.max_price && <p>Max Price: <strong>₹{searchResult.max_price}</strong></p>}
            {searchResult.size && <p>Size: <strong>{searchResult.size}</strong></p>}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#1a1a2e',
    fontSize: '32px',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  cardTitle: {
    color: '#1a1a2e',
    margin: 0,
  },
  subtitle: {
    color: '#666',
    margin: 0,
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  result: {
    backgroundColor: '#f0f0f0',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #e94560',
  },
  recommendationText: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
  },
};

export default AIRecommend;