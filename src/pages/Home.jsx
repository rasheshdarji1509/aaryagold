import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import Testimonial from '../components/Testimonial';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const { products } = useProducts();

  const featuredProducts = products
    .filter(p => activeCategory === 'all' || p.category.includes(activeCategory))
    .slice(0, 8);

  const handleCategoryChange = (catId) => {
    navigate(`/products?category=${catId}`);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const getItemsPerView = () => {
    if (window.innerWidth > 1200) return 4;
    if (window.innerWidth > 900) return 3;
    if (window.innerWidth > 600) return 2;
    return 1;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.ceil(featuredProducts.length / itemsPerView) - 1;

  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <main>
      <Hero />

      <CategorySection
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <section id="latest-creations" className="latest-creations-section">
        <div className="container">
          <div className="section-header-modern">
            <div className="header-line"></div>
            <h2 className="modern-title">LATEST <span className="gold-text">CREATIONS</span></h2>
            <p className="modern-subtitle">Experience the pinnacle of craftsmanship with our newest arrivals.</p>
          </div>

          <div className="carousel-container">
            <div className="carousel-track-wrapper">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {featuredProducts.map(product => (
                  <div key={product.id} className="carousel-slide">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-controls-modern">
              <button className="carousel-btn prev" onClick={prevSlide}>
                <ChevronLeft size={24} />
              </button>
              <div className="carousel-dots">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    className={`c-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                  ></button>
                ))}
              </div>
              <button className="carousel-btn next" onClick={nextSlide}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="view-all-wrapper">
            <button className="btn-gold-outline" onClick={() => navigate('/products')}>
              <span>VIEW FULL GALLERY</span>
            </button>
          </div>
        </div>
      </section>



      <Testimonial />
    </main>
  );
}
