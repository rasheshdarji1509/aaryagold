import React, { useState } from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import Testimonial from '../components/Testimonial';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const { products } = useProducts();

  const featuredProducts = products
    .filter(p => activeCategory === 'all' || p.category.includes(activeCategory))
    .slice(0, 8);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    // Optional: scroll to products
    const el = document.getElementById('featured-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero />
      
      <CategorySection 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <section id="featured-products" className="section-padding" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-label">Curated Collection</span>
            <h2 className="section-title">Featured <span className="gold-text">Creations</span></h2>
            <div className="divider-gold"></div>
          </div>

          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <button className="btn-outline" onClick={() => navigate('/products')}>
              <span>View Full Collection</span>
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Promo Section */}
      <section className="promo-section" style={{ 
        padding: '10rem 2rem', 
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold-primary)' }}>Craftsmanship</span>
          <h2 className="section-title" style={{ marginBottom: '2rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FDFBF7' }}>
            Exquisite Designs For <br/><span className="gold-text">Eternal Moments</span>
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
            Every piece of jewellery at Aarya Gold tells a story of heritage and luxury. 
            Hand-crafted by master artisans with decades of experience.
          </p>
          <button className="btn-gold" onClick={() => navigate('/contact')}>
            <span>Book A Wholesale Consultation</span>
          </button>
        </div>
      </section>

      <Testimonial />
    </main>
  );
}
