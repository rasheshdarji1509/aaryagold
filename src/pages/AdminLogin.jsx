import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';
import logoLight from '../assets/aaya-logo.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) {
      setError('Invalid credentials. Use admin / admin123');
      showToast('Login failed. Try again.', 'error');
      return;
    }
    showToast('Login successful');
    navigate('/admin/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--bg-black)',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <img
            src={logoLight}
            alt="Aarya Gold"
            style={{ width: '88px', height: '88px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
          <h2 style={{ marginTop: '0.75rem' }}>Admin Login</h2>
        </div>

        <label style={{ display: 'block', marginBottom: '0.4rem' }}>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          style={inputStyle}
          required
        />

        <label style={{ display: 'block', margin: '0.9rem 0 0.4rem' }}>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="admin123"
          style={inputStyle}
          required
        />

        {error && <p style={{ color: '#ff6b6b', marginTop: '0.7rem' }}>{error}</p>}

        <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
          <span>Login</span>
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.7rem 0.8rem',
  background: 'var(--bg-dark)',
  color: 'var(--text-ivory)',
  border: '1px solid var(--border-gold)',
  borderRadius: '8px',
};

