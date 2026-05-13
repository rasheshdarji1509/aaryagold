import React, { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { Edit2, X, Upload, AlertTriangle, Trash2 } from 'lucide-react';

const PAGE_SIZE = 8;

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories();
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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

  const confirmDelete = () => {
    if (deletingId) {
      deleteCategory(deletingId);
      setDeletingId(null);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
    setEditImage(cat.image || cat.icon || '');
  };

  const filtered = categories.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="admin-container">
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Categories</h2>

      {/* Add New Category Form */}
      <div className="admin-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.8rem', color: '#000' }}>Add New Category</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
          <label style={{ flex: '2 1 300px', display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</span>
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

      {/* Categories Table */}
      <div className="admin-card">
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
                <Th>Categories</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((cat) => (
                <tr key={cat.id}>
                  <Td>
                    <img src={cat.image || cat.icon} alt={cat.label} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </Td>
                  <Td style={{ fontWeight: 600, color: 'var(--gold-primary)' }}>{cat.label}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="button" onClick={() => startEdit(cat)} className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem' }}>Edit</button>
                      <button type="button" onClick={() => setDeletingId(cat.id)} style={{ padding: '0.4rem 0.8rem', background: '#5a2525', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' }}>Remove</button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 auto', textAlign: 'center', flex: '1 1 100%', order: 2 }}>
            Showing {paged.length} of {filtered.length} (Page {page} of {totalPages})
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flex: '1 1 100%', justifyContent: 'center', order: 1 }}>
            <button
              type="button"
              className="btn-outline"
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              style={{ minWidth: '100px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn-outline"
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              style={{ minWidth: '100px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="modal-content animate-fade-in" style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', padding: '0' }}>
            {/* Sticky Header */}
            <div style={{ position: 'sticky', top: 0, right: 0, left: 0, background: '#fff', padding: '1.5rem 2.5rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#000' }}>Edit Category</h3>
              <button 
                type="button" 
                onClick={() => setEditingId(null)} 
                style={{ background: '#f0f0f0', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '2rem 2.5rem' }}>
              <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '2rem' }}>
                {/* Image Editor */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <img src={editImage} alt="Edit" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <label style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--gold-primary)', color: '#000', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'var(--transition)' }}>
                    <Edit2 size={20} />
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setEditImage)} style={{ display: 'none' }} />
                  </label>
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Upload size={12} /> Change Image
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category Name</span>
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    required
                    style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fdfdfd', color: '#000', fontSize: '1.1rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn-gold" style={{ flex: 1, height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Update
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} className="btn-outline" style={{ flex: 0.5, height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
          <div className="modal-content animate-scale-in" style={{ background: '#fff', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ width: '70px', height: '70px', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#dc3545' }}>
              <AlertTriangle size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#000', marginBottom: '1rem' }}>Are you sure?</h3>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.5 }}>
              This will permanently delete the category and may affect products linked to it. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={confirmDelete}
                style={{ flex: 1, height: '48px', borderRadius: '8px', border: 'none', background: '#dc3545', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeletingId(null)}
                style={{ flex: 1, height: '48px', borderRadius: '8px', border: '1px solid #ddd', background: '#f8f8f8', color: '#333', fontWeight: 600, cursor: 'pointer' }}
              >
                No, Keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', padding: '0.8rem' }}>{children}</th>;
}

function Td({ children, style = {} }) {
  return <td style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0.8rem', ...style }}>{children}</td>;
}
