import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import { products } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';
  const initialSearch = queryParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = products;

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category.includes(activeCategory));
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm]);

  return (
    <div className="products-page" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="page-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-label">Explore</span>
          <h1 className="section-title">The <span className="gold-text">Collection</span></h1>
        </div>

        <div className="products-toolbar" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '2rem', 
          alignItems: 'center', 
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px'
        }}>
          <div className="search-bar-wrap" style={{ 
            flex: 1, 
            minWidth: '280px', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--gold-primary)' }} />
            <input 
              type="text" 
              placeholder="Search by name, tag or style..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 3rem',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-gold)',
                borderRadius: '8px',
                color: 'var(--text-ivory)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div className="results-count" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing {filteredProducts.length} items
          </div>
          
          <button className="btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem' }}>
            <SlidersHorizontal size={14} />
            <span>Filter</span>
          </button>
        </div>

        <CategorySection 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        <div className="products-grid" style={{ paddingBottom: '8rem' }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
              <h3 style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                No products found matching your selection.
              </h3>
              <button 
                className="btn-gold" 
                style={{ marginTop: '2rem' }}
                onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
