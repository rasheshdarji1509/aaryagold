import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    id: 1,
    tag: 'New Collection 2025',
    title: 'Crafted in\nPure Gold',
    subtitle: 'Discover timeless jewellery from the heart of Kalbadevi, Mumbai — where tradition meets contemporary elegance.',
    cta: 'Explore Collection',
    ctaLink: '/products',
    img: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=1600',
    objectPosition: '20% center',
    accent: 'Premium Gold Jewellery Wholesaler',
  },
  {
    id: 2,
    tag: 'Bridal Season',
    title: 'Royal Bridal\nCollections',
    subtitle: 'Make every wedding moment unforgettable with our exquisite bridal sets — crafted for the queen in you.',
    cta: 'View Bridal Sets',
    ctaLink: '/products?category=sets',
    img: 'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1600',
    objectPosition: '30% center',
    accent: 'Exclusive Bridal & Festive Wear',
  },
  {
    id: 3,
    tag: 'Diamond Selection',
    title: 'Diamonds\nForever Shine',
    subtitle: 'From solitaire rings to eternity bands — our certified diamond collection sparkles with brilliance.',
    cta: 'Shop Diamonds',
    ctaLink: '/products?category=diamond',
    img: '/images/hero3.png',
    objectPosition: 'left center',
    accent: 'Certified Diamond Jewellery',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <>
    <section className="hero">
      {/* Background Image */}
      <div className={`hero-bg ${animating ? 'fade-out' : 'fade-in'}`}>
        <img 
          src={slide.img} 
          alt={slide.title} 
          style={{ objectPosition: slide.objectPosition || 'center' }}
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Decorative particles */}
      <div className="hero-particles">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}></div>
        ))}
      </div>

      {/* Content */}
      <div className={`hero-content ${animating ? 'slide-out' : 'slide-in'}`}>
        <div className="hero-inner">
          <div className="hero-tag">
            <Sparkles size={12} />
            <span>{slide.tag}</span>
          </div>

          <h1 className="hero-title">
            {slide.title.split('\n').map((line, i) => (
              <span key={i} className="hero-title-line">
                {i === 0 ? line : <span className="gold-text">{line}</span>}
                {i < slide.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="hero-subtitle">{slide.subtitle}</p>

          <div className="hero-accent-bar">
            <div className="accent-line"></div>
            <span>{slide.accent}</span>
            <div className="accent-line"></div>
          </div>

          <div className="hero-actions">
            <Link to={slide.ctaLink} className="btn-gold">
              <span>{slide.cta}</span>
            </Link>
            <a href="https://wa.me/917304421336" className="btn-outline" target="_blank" rel="noreferrer">
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { val: '500+', label: 'Designs' },
              { val: '20+', label: 'Years Exp.' },
              { val: '1000+', label: 'Retailers' },
              { val: '22K', label: 'Pure Gold' },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="hero-controls">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

    </section>
  </>
  );
}
