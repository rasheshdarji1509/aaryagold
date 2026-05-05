import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-page" style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="page-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'rgba(201, 168, 76, 0.05)', marginBottom: '1.5rem' }}>
            <Heart size={32} color="var(--gold-primary)" />
          </div>
          <h1 className="section-title">My <span className="gold-text">Wishlist</span></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
            {wishlist.length} item(s) saved in your collection
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="products-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2.5rem',
            paddingBottom: '8rem'
          }}>
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h3 style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '2rem' }}>
              Your wishlist is currently empty.
            </h3>
            <button className="btn-gold" onClick={() => navigate('/products')}>
              <span>Start Exploring</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
