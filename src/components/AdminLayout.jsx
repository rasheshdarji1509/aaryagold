import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { showToast } = useToast();

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
    <div style={{ height: '100vh', background: 'var(--bg-black)', color: 'var(--text-ivory)', overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '1.2rem',
          padding: '1.2rem',
          height: '100%',
        }}
      >
        <aside
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1rem',
            position: 'sticky',
            top: '1rem',
            height: 'calc(100vh - 2.4rem)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <h3 style={{ marginBottom: '1rem', color: 'var(--gold-primary)' }}>Admin Panel</h3>
          <nav style={{ display: 'grid', gap: '0.5rem', marginBottom: 'auto' }}>
            <Link to="/admin/dashboard" style={itemStyle('/admin/dashboard')}>
              Dashboard
            </Link>
            <Link to="/admin/products" style={itemStyle('/admin/products')}>
              Products
            </Link>
            <Link to="/admin/categories" style={itemStyle('/admin/categories')}>
              Categories (Manage)
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
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '1rem',
            height: 'calc(100vh - 2.4rem)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

