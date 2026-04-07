import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Rent Fashion, Look Stunning! 👗</h1>
        <p style={styles.subtitle}>
          Discover thousands of designer outfits for rent. 
          Perfect for weddings, parties, and special occasions.
        </p>
        <div style={styles.buttons}>
          <Link to="/products" style={styles.primaryBtn}>Browse Outfits</Link>
          <Link to="/ai-recommend" style={styles.secondaryBtn}>🤖 AI Recommend</Link>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.card}>
          <h3>👗 Wide Selection</h3>
          <p>Sarees, Lehengas, Gowns and more for every occasion</p>
        </div>
        <div style={styles.card}>
          <h3>🤖 AI Powered</h3>
          <p>Get personalized outfit recommendations using AI</p>
        </div>
        <div style={styles.card}>
          <h3>💰 Affordable</h3>
          <p>Rent designer outfits at a fraction of the buying price</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  hero: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '80px 30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: 0.8,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  primaryBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
    border: '2px solid white',
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    padding: '60px 30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
};

export default Home;