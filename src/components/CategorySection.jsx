import React from 'react';

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

const categories = [
  { id: 'all', label: 'All', img: ringImg },
  { id: 'rings', label: 'Rings', img: ringImg },
  { id: 'necklaces', label: 'Necklaces', img: necklaceImg },
  { id: 'earrings', label: 'Earrings', img: earringImg },
  { id: 'bracelets', label: 'Bracelets', img: braceletImg },
  { id: 'bangles', label: 'Bangles', img: bangleImg },
  { id: 'pendants', label: 'Pendants', img: pendantImg },
  { id: 'chains', label: 'Chains', img: chainImg },
  { id: 'sets', label: 'Bridal Sets', img: setImg },
  { id: 'forher', label: 'For Her', img: herImg },
  { id: 'forhim', label: 'For Him', img: himImg },
  { id: 'diamond', label: 'Diamond', img: diamondImg },
];

export default function CategorySection({ activeCategory, onCategoryChange }) {
  return (
    <section className="category-section">
      <div className="container">
        <div className="category-header">
          <span className="section-label">Browse By</span>
          <h2 className="section-title">Exclusive <span className="gold-text">Categories</span></h2>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <div className="category-img-box">
                <div className="category-ring"></div>
                <img src={cat.img} alt={cat.label} className="cat-img" />
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
