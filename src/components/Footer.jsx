import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

import logoLight from '../assets/aaya-logo.png';
import logoGolden from '../assets/golden logo.png';

export default function Footer() {
  const { theme } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const mapsQuery = encodeURIComponent(
    '1ST FLOOR, 23/25, Room No.1, Indrapuja, Shaikh Memon Street, Champa Gully, M.J.Market, Kalbadevi, Mumbai - 400002'
  );

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <img src={theme === 'dark' ? logoGolden : logoLight} alt="Aarya Gold" />
              </div>
            </Link>
            <p className="footer-about">
              Premier gold jewellery wholesaler located in the heart of Kalbadevi, Mumbai.
              Renowned for quality, trust, and timeless craftsmanship since decades.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Collection</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=rings">Gold Rings</Link></li>
              <li><Link to="/products?category=necklaces">Necklaces</Link></li>
              <li><Link to="/products?category=diamond">Diamond Sets</Link></li>
              <li><Link to="/products?category=sets">Bridal Collection</Link></li>
              <li><Link to="/products?category=earrings">Earrings</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-item">
              <MapPin size={44} className="gold-text footer-location-icon" />
              <div className="footer-location">
                <p>1ST FLOOR, 23/25, Room No.1, Indrapuja, Shaikh Memon Street, Champa Gully, M.J.Market, Kalbadevi, Mumbai - 400002</p>
                <a
                  className="footer-map-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find this location
                </a>
              </div>
            </div>
            <div className="footer-map-embed">
              <iframe
                title="Aarya Gold Location"
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="contact-item">
              <Phone size={18} className="gold-text" />
              <a href="tel:+918866600953" style={{ color: 'inherit', textDecoration: 'none' }}>
                <p>+91 8866600953 (Sagarbhai)</p>
              </a>
            </div>
            <div className="contact-item">
              <Mail size={18} className="gold-text" />
              <a href="mailto:aaryagoldmumbai@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                <p>aaryagoldmumbai@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2025 Aarya Gold (Ciyaza) - MUMBAI. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <button className="back-to-top" onClick={scrollToTop}>
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
