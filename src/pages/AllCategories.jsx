import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import './AllCategories.css';

export default function AllCategories() {
  const { categories } = useCategories();
  const browseable = categories.filter(c => c.id !== 'all');

  return (
    <div className="all-categories-page">
      {/* Hero Banner */}
      <div className="all-cat-hero">
        <div className="all-cat-hero-content">
          <span className="all-cat-label">Explore</span>
          <h1 className="all-cat-title">Shop By<br /><span className="all-cat-gold">Category</span></h1>
          <p className="all-cat-subtitle">
            Browse our complete collection of fine gold jewellery, curated by style and occasion.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container">
        <div className="all-cat-grid">
          {browseable.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="all-cat-card"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="all-cat-card-inner">
                <img
                  src={cat.image || cat.img || 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={cat.label}
                  className="all-cat-card-img"
                />
                <div className="all-cat-card-overlay">
                  <div className="all-cat-card-content">
                    <span className="all-cat-card-name">{cat.label}</span>
                    <span className="all-cat-card-cta">Explore →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
