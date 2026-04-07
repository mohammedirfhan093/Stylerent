import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createBooking } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getProduct(id);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await createBooking({
        product: id,
        start_date: startDate,
        end_date: endDate,
      });
      setMessage('🎉 Booking successful!');
    } catch (err) {
      setMessage('❌ Booking failed! Please try again.');
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!product) return <p style={styles.loading}>Product not found!</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {product.image ? (
  <img
    src={`http://127.0.0.1:8000${product.image}`}
    alt={product.title}
    style={styles.detailImage}
  />
) : (
  <div style={styles.imagePlaceholder}>👗</div>
)}
        <div style={styles.details}>
          <h2 style={styles.title}>{product.title}</h2>
          <p style={styles.category}>Category: {product.category}</p>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.price}>₹{product.price_per_day}/day</p>
          <p style={styles.info}>Size: {product.size}</p>
          <p style={styles.info}>Deposit: ₹{product.deposit}</p>

          <div style={styles.booking}>
            <h3>Book This Outfit</h3>
            {message && <p style={styles.message}>{message}</p>}
            <input
              style={styles.input}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              style={styles.input}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button style={styles.button} onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
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
  detailImage: {
  width: '300px',
  minHeight: '300px',
  maxHeight: '400px',
  objectFit: 'cover',
  objectPosition: 'top',
},
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
  },
  imagePlaceholder: {
    backgroundColor: '#1a1a2e',
    width: '300px',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '100px',
  },
  details: {
    padding: '30px',
    flex: 1,
  },
  title: {
    color: '#1a1a2e',
    marginBottom: '10px',
  },
  category: {
    color: '#666',
    textTransform: 'capitalize',
  },
  description: {
    color: '#444',
    lineHeight: '1.6',
  },
  price: {
    color: '#e94560',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  info: {
    color: '#666',
  },
  booking: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
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
  message: {
    color: 'green',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '20px',
  },
};

export default ProductDetail;