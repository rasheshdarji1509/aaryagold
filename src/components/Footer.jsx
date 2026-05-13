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
              <img src={theme === 'dark' ? logoGolden : logoLight} alt="Aarya Gold" />
            </Link>
            <p className="footer-about">
              Aarya Gold (Ciyaza) - MUMBAI is a premier gold jewellery wholesaler located in the heart of Kalbadevi, Mumbai, offering high-quality gold ornaments for retailers across India.
            </p>
            <div className="social-links">
              {/* Social icons removed per request */}
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=rings">Gold Rings</Link></li>
              <li><Link to="/products?category=necklaces">Necklaces</Link></li>
              <li><Link to="/products?category=earrings">Earrings</Link></li>
              <li><Link to="/products?category=bangles">Bangles</Link></li>
              <li><Link to="/products?category=sets">Jewellery Sets</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-item">
              <MapPin size={20} className="gold-text" />
              <p>KALBADEVI, Mumbai, Maharashtra 400002</p>
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
              <Phone size={20} className="gold-text" />
              <div>
                <p>8866600953 (Sagarbhai)</p>
                <p>7304421336</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={20} className="gold-text" />
              <p>aaryagoldmumbai@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2025 Aarya Gold (Ciyaza) - MUMBAI. All rights reserved.</p>
          <button className="back-to-top" onClick={scrollToTop}>
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
