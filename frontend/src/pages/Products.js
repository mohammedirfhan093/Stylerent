import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts({ category, search });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Browse Outfits 👗</h2>

      <div style={styles.filters}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search outfits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
        />
        <select
          style={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="saree">Saree</option>
          <option value="lehenga">Lehenga</option>
          <option value="suit">Suit</option>
          <option value="gown">Gown</option>
          <option value="jewellery">Jewellery</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : products.length === 0 ? (
        <div style={styles.empty}>
          <p>No products found! 😔</p>
          <p>Be the first to list an outfit!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} style={styles.card}>
              <div style={styles.imagePlaceholder}>👗</div>
              <div style={styles.cardBody}>
                <h3 style={styles.productTitle}>{product.title}</h3>
                <p style={styles.category}>{product.category}</p>
                <p style={styles.price}>₹{product.price_per_day}/day</p>
                <p style={styles.size}>Size: {product.size}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
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
    marginBottom: '30px',
    fontSize: '32px',
  },
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '300px',
  },
  select: {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '250px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'black',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    backgroundColor: '#1a1a2e',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '60px',
  },
  cardBody: {
    padding: '15px',
  },
  productTitle: {
    margin: '0 0 5px 0',
    color: '#1a1a2e',
  },
  category: {
    color: '#666',
    margin: '0 0 5px 0',
    textTransform: 'capitalize',
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  size: {
    color: '#666',
    margin: 0,
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
  },
  empty: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#666',
  },
};

export default Products;