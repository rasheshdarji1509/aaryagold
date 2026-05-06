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
  { id: 'all', label: 'All', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { id: 'rings', label: 'Rings', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80' },
  { id: 'necklaces', label: 'Necklaces', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80' },
  { id: 'earrings', label: 'Earrings', img: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=400&q=80' },
  { id: 'bracelets', label: 'Bracelets', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80' },
  { id: 'bangles', label: 'Bangles', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80' },
  { id: 'pendants', label: 'Pendants', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80' },
  { id: 'chains', label: 'Chains', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80' },
  { id: 'sets', label: 'Bridal Sets', img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80' },
  { id: 'her', label: 'For Her', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { id: 'him', label: 'For Him', img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80' },
  { id: 'diamond', label: 'Diamond', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80' },
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
