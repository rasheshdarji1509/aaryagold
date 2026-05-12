import React from 'react';
import { useProducts } from '../context/ProductContext';

export default function AdminDashboard() {
  const { products } = useProducts();
  const categoryCount = new Set(products.flatMap((p) => p.category || [])).size;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 1fr))', gap: '1rem' }}>
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="Total Categories" value={categoryCount} />
        <StatCard title="Last Product ID" value={products[0]?.id || 0} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: '10px',
        padding: '1rem',
        background: 'var(--bg-card)',
      }}
    >
      <p style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{title}</p>
      <h3 style={{ color: 'var(--gold-primary)' }}>{value}</h3>
    </div>
  );
}

