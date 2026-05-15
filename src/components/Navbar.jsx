import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import Logo from './Logo';
import './Navbar.css';

// SVG Icons for social media to avoid library issues
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { products } = useProducts();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(val.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(val.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
    if (onSearch) onSearch(val);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Product' },
    { to: '/products', label: 'Category' },
    { to: '/contact', label: 'Get In Touch' },
  ];

  const socialLinks = [
    { icon: <InstagramIcon />, href: 'https://instagram.com/aaryagold', label: 'Instagram' },
    { icon: <FacebookIcon />, href: 'https://facebook.com/aaryagold', label: 'Facebook' },
    { icon: <TwitterIcon />, href: 'https://twitter.com/aaryagold', label: 'Twitter' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Left: Logo */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo-link">
              <Logo variant="full" forceGolden={true} />
            </Link>
          </div>

          {/* Middle: Desktop Nav Links */}
          <div className="navbar-center">
            <ul className="navbar-links">
              {navLinks.map((link, idx) => (
                <li key={`${link.to}-${idx}`}>
                  <Link
                    to={link.to}
                    className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actions & Social */}
          <div className="navbar-right">
            <div className="navbar-actions">
              <button
                className="nav-icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                title="Search"
              >
                <Search size={20} />
              </button>

              <div className="navbar-socials desktop-only">
                {socialLinks.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="nav-social-icon"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <button
                className="nav-icon-btn menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="search-dropdown">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search rings, necklaces, diamond…"
                value={query}
                onChange={handleQueryChange}
                autoFocus
              />
              {query && <button onClick={() => { setQuery(''); setSuggestions([]); }}>
                <X size={16} />
              </button>}
            </div>
            {suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map(p => (
                  <li key={p.id}>
                    <Link to={`/products?search=${p.name}`} onClick={() => {
                      setSearchOpen(false); setQuery(''); setSuggestions([]);
                      if (onSearch) onSearch(p.name);
                    }}>
                      <img src={p.images[0]} alt={p.name} />
                      <div>
                        <span className="sug-name">{p.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link, idx) => (
              <Link
                key={`${link.to}-${idx}`}
                to={link.to}
                className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mobile-socials">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" className="mobile-social-icon">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
