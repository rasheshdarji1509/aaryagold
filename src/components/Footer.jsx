import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import './Footer.css';
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

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
            <Link to="/" className="footer-logo-link">
              <Logo variant="text-only" forceGolden={true} />
            </Link>
            <p className="footer-about">
              Aarya Gold (Ciyaza) - MUMBAI is a premier gold jewellery wholesaler located in the heart of Kalbadevi, Mumbai, offering high-quality gold ornaments for retailers across India.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/aaryagold" target="_blank" rel="noreferrer" className="footer-social-icon"><InstagramIcon /></a>
              <a href="https://facebook.com/aaryagold" target="_blank" rel="noreferrer" className="footer-social-icon"><FacebookIcon /></a>
              <a href="https://twitter.com/aaryagold" target="_blank" rel="noreferrer" className="footer-social-icon"><TwitterIcon /></a>
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
              <li><Link to="/category/rings">Gold Rings</Link></li>
              <li><Link to="/category/necklaces">Necklaces</Link></li>
              <li><Link to="/category/earrings">Earrings</Link></li>
              <li><Link to="/category/bangles">Bangles</Link></li>
              <li><Link to="/category/jewellery-sets">Jewellery Sets</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-item">
              <MapPin size={20} className="gold-text" />
              <p>KALBADEVI, Mumbai, Maharashtra 400002</p>
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
