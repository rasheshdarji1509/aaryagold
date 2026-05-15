import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import Testimonial from "../components/Testimonial";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import "./Home.css";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const { products } = useProducts();

  const featuredProducts = products
    .filter(
      (p) => activeCategory === "all" || p.category.includes(activeCategory),
    )
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
      setActiveIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [maxIndex, itemsPerView]);

  const getTransform = () => {
    if (itemsPerView === 1) return `translateX(-${activeIndex * 100}%)`;
    return `translateX(calc(-${activeIndex} * (100% / ${itemsPerView} + ${2 / itemsPerView}rem)))`;
  };

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
            <h2 className="modern-title">
              LATEST <span className="gold-text">CREATIONS</span>
            </h2>
            <div className="divider-gold"></div>
          </div>

          <div className="carousel-container">
            <div className="carousel-track-wrapper">
              <div
                className="carousel-track"
                style={{ transform: getTransform() }}
              >
                {featuredProducts.map((product) => (
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
                    className={`c-dot ${i === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                  ></button>
                ))}
              </div>
              <button className="carousel-btn next" onClick={nextSlide}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Testimonial />
    </main>
  );
}
