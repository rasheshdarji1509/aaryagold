import React, { useState } from 'react';
import { useHero } from '../context/HeroContext';
import { useToast } from '../context/ToastContext';
import { Plus, Trash2, Edit3, X, Image, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';

const emptyForm = {
  tag: '',
  title: '',
  subtitle: '',
  cta: '',
  ctaLink: '',
  img: '',
  objectPosition: 'center',
  accent: '',
};

export default function AdminHeroSlides() {
  const { slides, addSlide, updateSlide, deleteSlide, reorderSlides, resetSlides } = useHero();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deletingId, setDeletingId] = useState(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (slide) => {
    setEditingId(slide.id);
    setForm({
      tag: slide.tag || '',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      cta: slide.cta || '',
      ctaLink: slide.ctaLink || '',
      img: slide.img || '',
      objectPosition: slide.objectPosition || 'center',
      accent: slide.accent || '',
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateSlide(editingId, form);
      showToast('Slide updated successfully!');
    } else {
      addSlide(form);
      showToast('New slide added!');
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    deleteSlide(deletingId);
    setDeletingId(null);
    showToast('Slide deleted.');
  };

  const handleMove = (index, direction) => {
    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    reorderSlides(newSlides);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, img: reader.result }));
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Hero Slides</h2>
          <p style={{ margin: '0.25rem 0 0', color: '#999', fontSize: '0.9rem' }}>Manage the homepage hero banner slides</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
            onClick={() => { resetSlides(); showToast('Slides reset to defaults.'); }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            className="btn-gold"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={openAdd}
          >
            <Plus size={16} /> Add Slide
          </button>
        </div>
      </div>

      {/* Slides List */}
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="admin-card"
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1.25rem' }}
          >
            {/* Preview Image */}
            <div style={{ width: '120px', height: '75px', borderRadius: '8px', overflow: 'hidden', background: '#111', flexShrink: 0 }}>
              {slide.img ? (
                <img src={slide.img} alt={slide.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image size={24} color="#555" />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', background: 'rgba(212,175,55,0.15)', color: 'var(--gold-primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 700 }}>
                  Slide {index + 1}
                </span>
                {slide.tag && (
                  <span style={{ fontSize: '0.7rem', background: '#1a1a1a', color: '#aaa', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                    {slide.tag}
                  </span>
                )}
              </div>
              <h4 style={{ margin: '0 0 0.35rem', fontSize: '1rem', color: 'var(--text-ivory)', whiteSpace: 'pre-line' }}>
                {slide.title?.replace('\\n', ' ')}
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '500px' }}>
                {slide.subtitle}
              </p>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#888' }}>
                <span>CTA: <strong style={{ color: 'var(--gold-primary)' }}>{slide.cta}</strong></span>
                <span>Link: <strong style={{ color: '#aaa' }}>{slide.ctaLink}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => handleMove(index, 'up')} disabled={index === 0} style={iconBtnStyle} title="Move Up">
                  <ChevronUp size={14} />
                </button>
                <button onClick={() => handleMove(index, 'down')} disabled={index === slides.length - 1} style={iconBtnStyle} title="Move Down">
                  <ChevronDown size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => openEdit(slide)} style={{ ...iconBtnStyle, borderColor: 'var(--gold-primary)', color: 'var(--gold-primary)' }} title="Edit">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => setDeletingId(slide.id)} style={{ ...iconBtnStyle, borderColor: '#dc3545', color: '#dc3545' }} title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            {/* Sticky Header */}
            <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10, padding: '1.5rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
                {editingId ? 'Edit Slide' : 'Add New Slide'}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: '#f0f0f0', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'grid', gap: '1.25rem' }}>
              {/* Image */}
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={labelStyle}>Background Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {form.img && (
                    <img src={form.img} alt="preview" style={{ width: '160px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                  )}
                  <div style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
                    <input
                      type="text"
                      placeholder="Paste image URL..."
                      value={form.img}
                      onChange={e => setForm({ ...form, img: e.target.value })}
                      style={inputStyle}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#999' }}>— or upload —</div>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#f5f5f5', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                      <Image size={14} /> Upload Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={labelStyle}>Tag / Badge Text</label>
                  <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inputStyle} placeholder="e.g. New Collection 2025" />
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={labelStyle}>Accent Text (below title)</label>
                  <input value={form.accent} onChange={e => setForm({ ...form, accent: e.target.value })} style={inputStyle} placeholder="e.g. Premium Gold Jewellery Wholesaler" />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={labelStyle}>Main Title <span style={{ fontWeight: 400, color: '#999' }}>(use \n for line break, second line becomes gold)</span></label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Crafted in\nPure Gold"
                  required
                />
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={labelStyle}>Subtitle / Description</label>
                <textarea
                  value={form.subtitle}
                  onChange={e => setForm({ ...form, subtitle: e.target.value })}
                  rows={3}
                  style={inputStyle}
                  placeholder="Short description text shown below the title..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={labelStyle}>CTA Button Text</label>
                  <input value={form.cta} onChange={e => setForm({ ...form, cta: e.target.value })} style={inputStyle} placeholder="e.g. Explore Collection" />
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={labelStyle}>CTA Link / URL</label>
                  <input value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} style={inputStyle} placeholder="e.g. /products or /category/rings" />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={labelStyle}>Image Focus Position</label>
                <select value={form.objectPosition} onChange={e => setForm({ ...form, objectPosition: e.target.value })} style={inputStyle}>
                  <option value="center">Center</option>
                  <option value="top center">Top Center</option>
                  <option value="bottom center">Bottom Center</option>
                  <option value="left center">Left Center</option>
                  <option value="right center">Right Center</option>
                  <option value="20% center">Left 20%</option>
                  <option value="30% center">Left 30%</option>
                  <option value="70% center">Right 70%</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ padding: '0.8rem 2.5rem' }}>
                  {editingId ? 'Save Changes' : 'Add Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingId && (
        <div style={modalOverlay}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '2.5rem', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#dc3545' }}>
              <Trash2 size={32} />
            </div>
            <h3 style={{ marginBottom: '0.75rem' }}>Delete this slide?</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleDelete} style={{ flex: 1, padding: '0.85rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                Delete
              </button>
              <button onClick={() => setDeletingId(null)} style={{ flex: 1, padding: '0.85rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const iconBtnStyle = {
  padding: '0.4rem',
  borderRadius: '6px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  background: '#fafafa',
  boxSizing: 'border-box',
};

const modalOverlay = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1200,
  padding: '1rem',
};

const modalBox = {
  background: '#fff',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '700px',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
};
