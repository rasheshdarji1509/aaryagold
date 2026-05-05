import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/products';
import './Testimonial.css';

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [current, isAutoPlaying]);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="testimonial-split">
          {/* Left Side: Heading */}
          <div className="testimonial-info">
            <span className="section-label">Voices of Trust</span>
            <h2 className="section-title">What Our <br/><span className="gold-text">Retailers</span> Say</h2>
            <p className="testimonial-desc">
              Partnering with over 1000+ jewellery retailers across India, 
              providing excellence in every gram of gold.
            </p>
            <div className="carousel-nav">
              <button className="nav-btn prev" onClick={() => { prevSlide(); setIsAutoPlaying(false); }}>
                <ChevronLeft size={20} />
              </button>
              <button className="nav-btn next" onClick={() => { nextSlide(); setIsAutoPlaying(false); }}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`dot ${idx === current ? 'active' : ''}`}
                  onClick={() => { setCurrent(idx); setIsAutoPlaying(false); }}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Carousel */}
          <div className="testimonial-carousel">
            <div className="carousel-inner">
              {testimonials.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`testimonial-slide ${idx === current ? 'active' : ''}`}
                >
                  <div className="testimonial-card">
                    <div className="quote-header">
                      <Quote size={40} className="gold-text" fill="currentColor" opacity="0.1" />
                      <div className="rating">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="var(--gold-primary)" color="var(--gold-primary)" />
                        ))}
                      </div>
                    </div>

                    <p className="testimonial-text">"{item.text}"</p>

                    <div className="testimonial-author">
                      <div className="author-img">
                        <img src={item.avatar} alt={item.name} />
                        <div className="img-ring"></div>
                      </div>
                      <div className="author-info">
                        <h4 className="name">{item.name}</h4>
                        <p className="business">{item.business}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="testimonial-accent">AUTHENTICITY</div>
    </section>
  );
}
