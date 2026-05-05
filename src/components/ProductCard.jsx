import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const interval = setInterval(() => {
      if (product.images.length > 1) {
        setCurrentImg(prev => (prev + 1) % product.images.length);
      }
    }, 3000); // Cycle every 3 seconds automatically
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div 
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
          src={product.images[currentImg]} 
          alt={product.name} 
          className="product-image"
          key={currentImg} /* Key helps with smooth transition */
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
    </div>
  );
}
