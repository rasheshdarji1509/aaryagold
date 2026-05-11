import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';
  const initialSearch = queryParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const { products } = useProducts();
  const { categories } = useCategories();
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
  }, [activeCategory, searchTerm, products]);

  return (
    <div className="products-page" style={{ paddingTop: '5rem' }}>
      <div className="container">
        <div className="page-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-label">Explore</span>
          <h1 className="section-title">The <span className="gold-text">Collection</span></h1>
        </div>

        <div className="products-toolbar" style={{ 
          display: 'flex', 
          flexWrap: 'nowrap', 
          gap: '1.5rem', 
          alignItems: 'center', 
          marginBottom: '2rem',
          padding: '1rem 1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          overflowX: 'auto'
        }}>
          <div className="search-bar-wrap" style={{ 
            flex: '1 1 auto', 
            minWidth: '200px', 
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

          <div className="results-count" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
            Showing {filteredProducts.length} items
          </div>
          
          <div className="filter-select-wrap" style={{ minWidth: '160px' }}>
            <select 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'var(--bg-dark)',
                border: '1px solid var(--border-gold)',
                borderRadius: '8px',
                color: 'var(--text-ivory)',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23d4af37%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1em'
              }}
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <button className="btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', height: '100%' }} onClick={() => setActiveCategory('all')}>
            <SlidersHorizontal size={14} />
            <span>Reset</span>
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
