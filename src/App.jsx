import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <WishlistProvider>
        <Router>
        {loading && <Loader />}
        
        <div className={`app-content ${loading ? 'hidden' : 'visible'}`}>
          <ScrollToTop />
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          
          <Footer />
        </div>

        {/* Global styles for hidden/visible transition */}
        <style>{`
          .app-content {
            transition: opacity 0.8s ease;
          }
          .app-content.hidden {
            opacity: 0;
            height: 100vh;
            overflow: hidden;
          }
          .app-content.visible {
            opacity: 1;
          }
        `}</style>
      </Router>
    </WishlistProvider>
  </ThemeProvider>
  );
}

export default App;
