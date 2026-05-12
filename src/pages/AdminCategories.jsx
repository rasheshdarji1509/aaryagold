import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';

const PAGE_SIZE = 8;

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories();
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState('');
  const [editImage, setEditImage] = useState('');
  const [page, setPage] = useState(1);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    const newCat = {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label: label.trim(),
      image: image || '/assets/products/ring1.png',
    };
    try {
      addCategory(newCat);
      setLabel('');
      setImage('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editLabel.trim()) return;
    updateCategory(editingId, {
      label: editLabel.trim(),
      image: editImage || '/assets/products/ring1.png',
    });
    setEditingId(null);
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
    setEditImage(cat.image || cat.icon || '');
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="admin-categories" style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Manage Categories</h2>
      
      <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.8rem', color: '#000' }}>Add New Category</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <label style={{ flex: '2 1 300px', display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category Label</span>
            <input 
              type="text" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)} 
              required 
              placeholder="e.g. Diamond Rings"
              style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fdfdfd', color: '#000', transition: 'var(--transition)', width: '100%' }} 
            />
          </label>
          
          <div style={{ flex: '1 1 250px', display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Image</span>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <label style={{ flex: 1, height: '48px', borderRadius: '8px', border: '2px dashed var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#f8f8f8', transition: 'var(--transition)' }}>
                <span style={{ fontSize: '0.75rem', color: '#000', fontWeight: 600 }}>{image ? 'Change' : 'Upload'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, setImage)} 
                  style={{ display: 'none' }} 
                />
              </label>
              {image && (
                <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                  <button type="button" onClick={() => setImage('')} style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(220, 53, 69, 0.8)', color: '#fff', border: 'none', width: '16px', height: '16px', fontSize: '9px', cursor: 'pointer' }}>&times;</button>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn-gold" style={{ height: '48px', padding: '0 2rem', flex: '0 0 auto' }}>
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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-dark)', color: '#fff', minWidth: '200px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Image</Th>
                <Th>Label</Th>
                <Th>ID</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((cat) => (
                <tr key={cat.id}>
                  {editingId === cat.id ? (
                    <td colSpan={4} style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                      <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <div style={{ display: 'grid', gap: '0.2rem' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setEditImage)}
                            style={{ width: '150px', fontSize: '0.7rem' }}
                          />
                          {editImage && <img src={editImage} style={{ width: '30px', height: '30px', borderRadius: '3px' }} alt="Edit Preview" />}
                        </div>
                        <input
                          type="text"
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          required
                          style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-black)', color: 'var(--text-ivory)' }}
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
                      <Td>
                        <img src={cat.image || cat.icon} alt={cat.label} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      </Td>
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

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flex: '1 1 auto', textAlign: 'center' }}>
            Showing {paged.length} of {filtered.length}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: '1 1 auto', justifyContent: 'center' }}>
            <button
              type="button"
              className="btn-outline"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              Prev
            </button>
            <span style={{ fontSize: '0.9rem', minWidth: '60px', textAlign: 'center' }}>{page} / {totalPages}</span>
            <button
              type="button"
              className="btn-outline"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              Next
            </button>
          </div>
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
