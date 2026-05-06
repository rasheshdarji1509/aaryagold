import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <Link 
      to={`/product/${product.id}`}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        
        <div className="product-wishlist-btn">
          <button 
            className={`wishlist-icon ${isWishlisted(product.id) ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
          >
            <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-image"
        />

        <div className="product-actions-overlay">
          <button className="action-btn" title="Quick View">
            <Eye size={18} />
          </button>
          <button className="action-btn" title="See Similar">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category-row">
          {product.category.slice(0, 2).map(cat => (
            <span key={cat} className="product-category-tag">{cat}</span>
          ))}
          <span className="product-purity">{product.purity}</span>
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-footer">
          <span className="product-weight">{product.weight}</span>
          <button className="similar-btn">Similar</button>
        </div>
      </div>
    </Link>
  );
}
