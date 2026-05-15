import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCategories } from '../context/CategoryContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import './CategoryPage.css';

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { categories } = useCategories();
  
  const category = categories.find(c => c.id === id) || { label: id, id };
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const activeCatLower = id.toLowerCase();
    const result = products.filter(p => 
      (p.category || []).some(cat => {
        const catLower = cat.toLowerCase();
        return catLower === activeCatLower || 
               catLower.includes(activeCatLower) || 
               activeCatLower.includes(catLower);
      })
    );
    setFilteredProducts(result);
  }, [id, products]);

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="category-hero-content">
          <button className="back-btn-minimal" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <span className="cat-label-top">Collection</span>
          <h1 className="cat-title-main">{category.label}</h1>
          <div className="cat-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="sep">/</span>
            <span onClick={() => navigate('/products')}>All Products</span>
            <span className="sep">/</span>
            <span className="active">{category.label}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="category-toolbar">
          <div className="results-info">
            Showing <strong>{filteredProducts.length}</strong> unique designs
          </div>
          <div className="toolbar-actions">
            <div className="sort-wrap">
              <SlidersHorizontal size={16} />
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="weight-low">Weight: Low to High</option>
                <option value="weight-high">Weight: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid-modern">
            {filteredProducts.map(product => (
              <div key={product.id} className="grid-item-fade">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <div className="empty-icon">✨</div>
            <h2>No {category.label} Found</h2>
            <p>We are currently updating our collection with new designs. Please check back soon or explore other categories.</p>
            <button className="btn-gold" onClick={() => navigate('/products')}>
              Explore All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
