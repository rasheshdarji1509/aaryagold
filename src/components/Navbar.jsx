import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Phone, Moon, Sun } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import logoLight from '../assets/aaya-logo.png';
import logoGolden from '../assets/golden logo.png';
import './Navbar.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/products' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar({ onSearch }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { wishlist } = useWishlist();
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
    { to: '/products', label: 'Collection' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="navbar-topbar">
        <a href="tel:+918866600953" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span>📞 8866600953 (Sagarbhai)</span>
        </a>
        <span className="topbar-divider">|</span>
        <a href="mailto:aaryagoldmumbai@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span>✉️ aaryagoldmumbai@gmail.com</span>
        </a>
        <span className="topbar-divider">|</span>
        <span>Mon–Sat: 12PM – 7PM</span>
      </div>

      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <img src={theme === 'dark' ? logoGolden : logoLight} alt="Aarya Gold" />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                  {link.to === '/wishlist' && wishlist.length > 0 && (
                    <span className="nav-badge">{wishlist.length}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="navbar-actions">
            <button
              className="nav-icon-btn theme-toggle"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="nav-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search"
            >
              <Search size={18} />
            </button>
            <Link to="/wishlist" className="nav-icon-btn wishlist-btn" title="Wishlist">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="nav-badge">{wishlist.length}</span>
              )}
            </Link>
            <a
              href="https://wa.me/917304421336"
              className="btn-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp</span>
            </a>
            <button
              className="nav-icon-btn menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="search-dropdown">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search rings, necklaces, diamond…"
                value={query}
                onChange={handleQueryChange}
                autoFocus
              />
              {query && <button onClick={() => { setQuery(''); setSuggestions([]); }}>
                <X size={14} />
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
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <a href="https://wa.me/917304421336" className="mobile-whatsapp" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
