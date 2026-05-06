import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2, Star } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-gold">Back to Products</Link>
      </div>
    );
  }

  const whatsappMsg = `Hi Aarya Gold, I'm interested in the ${product.name} (Weight: ${product.weight}, Purity: ${product.purity}). Can you provide more details?`;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="product-breadcrumbs">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Collection</span>
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* Left: Images */}
          <div className="product-gallery">
            <div className="main-image-container">
              {product.badge && <span className="detail-badge">{product.badge}</span>}
              <img src={product.images[activeImg]} alt={product.name} className="main-image" />
              <button 
                className={`detail-wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={20} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="thumbnail-grid">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumb-box ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-main-info">
            <div className="info-header">
              <div className="category-tags">
                {product.category.map(cat => (
                  <span key={cat} className="detail-cat-tag">{cat}</span>
                ))}
              </div>
              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "var(--gold-primary)" : "none"} color="var(--gold-primary)" />)}
                </div>
                <span className="review-count">(12 reviews)</span>
              </div>
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Weight</span>
                <span className="spec-val">{product.weight}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Purity</span>
                <span className="spec-val">{product.purity}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <span className="spec-val">Pure Gold</span>
              </div>
            </div>

            <div className="detail-description">
              <h3>Overview</h3>
              <p>{product.description}</p>
            </div>

            <div className="detail-actions">
              <a 
                href={`https://wa.me/917304421336?text=${encodeURIComponent(whatsappMsg)}`} 
                className="btn-gold-large"
                target="_blank"
                rel="noreferrer"
              >
                <span>Inquire on WhatsApp</span>
              </a>
              <button className="btn-outline-large" onClick={() => toggleWishlist(product)}>
                <Heart size={18} />
                <span>{isWishlisted(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <div className="trust-badges">
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>Hallmark Certified</span>
              </div>
              <div className="trust-item">
                <Truck size={18} />
                <span>Secure Shipping</span>
              </div>
              <div className="trust-item">
                <RotateCcw size={18} />
                <span>Easy Return Policy</span>
              </div>
            </div>

            <div className="product-tags-footer">
              <span className="footer-label">Tags:</span>
              <div className="footer-tags">
                {product.tags.map(t => <span key={t}>#{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
