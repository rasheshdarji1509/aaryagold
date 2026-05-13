import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { showToast } = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemStyle = (path) => ({
    display: 'block',
    padding: '0.75rem 0.9rem',
    borderRadius: '8px',
    color: location.pathname === path ? 'var(--bg-black)' : 'var(--text-ivory)',
    background: location.pathname === path ? 'var(--gold-primary)' : 'transparent',
    textDecoration: 'none',
    fontWeight: 600,
  });

  return (
    <div style={{ height: '100vh', background: 'var(--bg-black)', color: 'var(--text-ivory)', overflow: 'hidden', position: 'relative' }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ margin: 0, color: 'var(--gold-primary)' }}>Admin Panel</h3>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: isMobile ? 'block' : 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
          gap: '1.2rem',
          padding: isMobile ? '0' : '1.2rem',
          height: isMobile ? 'calc(100vh - 60px)' : '100%',
        }}
      >
        <aside
          style={{
            border: isMobile ? 'none' : '1px solid var(--border-subtle)',
            borderRadius: isMobile ? '0' : '10px',
            padding: '1rem',
            position: isMobile ? 'absolute' : 'sticky',
            top: isMobile ? '60px' : '1rem',
            left: 0,
            width: isMobile ? '100%' : 'auto',
            height: isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 2.4rem)',
            display: (isMobile && !isMenuOpen) ? 'none' : 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--bg-black)',
            zIndex: 100,
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{ marginBottom: '1rem', color: 'var(--gold-primary)' }}>Admin Panel</h3>
          <nav style={{ display: 'grid', gap: '0.5rem', marginBottom: 'auto' }}>
            <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} style={itemStyle('/admin/dashboard')}>
              Dashboard
            </Link>
            <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} style={itemStyle('/admin/products')}>
              Products
            </Link>
            <Link to="/admin/categories" onClick={() => setIsMenuOpen(false)} style={itemStyle('/admin/categories')}>
              Categories
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => {
              logout();
              showToast('Logged out successfully');
              navigate('/admin/login');
            }}
            style={{
              marginTop: '0.8rem',
              textAlign: 'center',
              padding: '0.75rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid #7b2f2f',
              background: '#442222',
              color: '#ffdede',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </aside>

        <main
          style={{
            border: isMobile ? 'none' : '1px solid var(--border-subtle)',
            borderRadius: isMobile ? '0' : '10px',
            padding: isMobile ? '0.8rem' : '1rem',
            height: isMobile ? '100%' : 'calc(100vh - 2.4rem)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

