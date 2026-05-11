import React from 'react';
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
          <span className="section-label">Browse By</span>
          <h2 className="section-title">Exclusive <span className="gold-text">Categories</span></h2>
        </div>

        <div className="category-grid">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <div className="category-img-box">
                <div className="category-ring"></div>
                <img src={cat.image || cat.img || cat.icon || ringImg} alt={cat.label} className="cat-img" />
                <div className="cat-overlay"></div>
              </div>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
