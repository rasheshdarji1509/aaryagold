import React from 'react';
import {
  LayoutGrid,
  CircleDot,
  Gem,
  Sparkles,
  Watch,
  Hammer,
  Crown,
  Heart,
  User,
  Zap,
  Box
} from 'lucide-react';
import './CategorySection.css';

const categories = [
  { id: 'all', label: 'All', icon: <LayoutGrid size={24} /> },
  { id: 'rings', label: 'Rings', icon: <CircleDot size={24} /> },
  { id: 'necklaces', label: 'Necklaces', icon: <Box size={24} /> },
  { id: 'earrings', label: 'Earrings', icon: <Sparkles size={24} /> },
  { id: 'bracelets', label: 'Bracelets', icon: <Watch size={24} /> },
  { id: 'bangles', label: 'Bangles', icon: <CircleDot size={24} /> },
  { id: 'pendants', label: 'Pendants', icon: <Gem size={24} /> },
  { id: 'chains', label: 'Chains', icon: <Hammer size={24} /> },
  { id: 'sets', label: 'Bridal Sets', icon: <Crown size={24} /> },
  { id: 'her', label: 'For Her', icon: <Heart size={24} /> },
  { id: 'him', label: 'For Him', icon: <User size={24} /> },
  { id: 'diamond', label: 'Diamond', icon: <Gem size={24} /> },
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
              <div className="category-icon-box">
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-ring"></div>
              </div>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
