import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories();
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    const newCat = {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label: label.trim(),
      icon: icon.trim() || '⭐',
    };
    try {
      addCategory(newCat);
      setLabel('');
      setIcon('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editLabel.trim()) return;
    updateCategory(editingId, {
      label: editLabel.trim(),
      icon: editIcon.trim() || '⭐',
    });
    setEditingId(null);
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
    setEditIcon(cat.icon);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const filtered = categories.filter(c => 
    c.label.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-categories" style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Manage Categories</h2>
      
      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Category</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span>Label</span>
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} required style={{ padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-dark)', color: '#fff' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.4rem' }}>
            <span>Icon (optional)</span>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g., 💍" style={{ padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-dark)', color: '#fff' }} />
          </label>
          <button type="submit" className="btn-gold" style={{ height: '42px' }}>
            <span>Add Category</span>
          </button>
        </form>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Existing Categories</h3>
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-dark)', color: '#fff', minWidth: '200px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Icon</Th>
                <Th>Label</Th>
                <Th>ID</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat) => (
                <tr key={cat.id}>
                  {editingId === cat.id ? (
                    <td colSpan={4} style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                      <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          value={editIcon} 
                          onChange={(e) => setEditIcon(e.target.value)} 
                          placeholder="Icon"
                          style={{ width: '60px', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-black)', color: '#fff' }}
                        />
                        <input 
                          type="text" 
                          value={editLabel} 
                          onChange={(e) => setEditLabel(e.target.value)} 
                          required 
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-black)', color: '#fff' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button type="submit" className="btn-gold" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>
                            <span>Update</span>
                          </button>
                          <button type="button" onClick={() => setEditingId(null)} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <Td style={{ fontSize: '1.5rem' }}>{cat.icon || '⭐'}</Td>
                      <Td style={{ fontWeight: 600, color: 'var(--gold-primary)' }}>{cat.label}</Td>
                      <Td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.id}</Td>
                      <Td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button type="button" onClick={() => startEdit(cat)} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>Edit</button>
                          <button type="button" onClick={() => handleDelete(cat.id)} style={{ padding: '0.4rem 0.8rem', background: '#5a2525', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Remove</button>
                        </div>
                      </Td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', padding: '0.8rem' }}>{children}</th>;
}

function Td({ children, style = {} }) {
  return <td style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0.8rem', ...style }}>{children}</td>;
}
