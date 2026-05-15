import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';

import './CategorySection.css';

import ringImg from '../assets/ring1.jpg';
import necklaceImg from '../assets/neckless.jpg';
import earringImg from '../assets/earrings.jpg';
import braceletImg from '../assets/braclet.jpg';
import bangleImg from '../assets/bangals.avif';
import pendantImg from '../assets/pendats.jpg';
import chainImg from '../assets/chain.avif';
import setImg from '../assets/bridal.avif';
import herImg from '../assets/earrings.jpg';
import himImg from '../assets/ring.jpg';
import diamondImg from '../assets/diamond.avif';



export default function CategorySection({ activeCategory, onCategoryChange }) {
  const { categories: dynamicCategories } = useCategories();
  
  // Combine "All" with dynamic categories
  const categoriesList = [
    { id: 'all', label: 'All', image: ringImg },
    ...dynamicCategories.filter(c => c.id !== 'all')
  ];

  return (
    <section className="category-section">
      <div className="container">
        <div className="category-header">
          <span className="section-label">LATEST COLLECTIONS</span>
          <h2 className="section-title">Shop By <span className="gold-text">Category</span></h2>
          <div className="divider-gold"></div>
        </div>

        <div className="category-grid">
          {categoriesList.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/products' : `/category/${cat.id}`}
              className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                if (onCategoryChange) onCategoryChange(cat.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="category-card-inner">
                <img src={cat.image || cat.img || cat.icon || ringImg} alt={cat.label} className="category-card-img" />
                <div className="category-card-overlay">
                  <div className="category-card-content">
                    <span className="category-card-title">{cat.label}</span>
                    <span className="category-card-count">Explore Designs</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
