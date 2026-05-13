import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { useCategories } from '../context/CategoryContext';
import { X, Upload, AlertTriangle, Edit3, Trash2 } from 'lucide-react';

const PAGE_SIZE = 8;

const emptyForm = {
  name: '',
  price: '',
  weight: '',
  purity: '',
  badge: '',
  category: '',
  colorsCsv: '',
  tagsCsv: '',
  images: [],
  description: '',
  fullDescription: '',
  qualityGrade: '',
  sku: '',
  metalStamp: '',
  goldWeight: '',
  diamondCarat: '',
  height: '',
  width: '',
};

function normalizeProduct(form, existingId) {
  const colors = csvToArray(form.colorsCsv);
  const images = form.images || [];
  const tags = csvToArray(form.tagsCsv);
  const safeImages = images.length ? images : ['/assets/products/ring1.png'];
  const primaryColor = colors[0] || 'Gold';

  return {
    id: existingId,
    name: form.name.trim(),
    price: form.price.trim() || 'N/A',
    weight: form.weight.trim() || 'N/A',
    purity: form.purity.trim() || 'N/A',
    badge: form.badge.trim() || null,
    category: form.category ? [form.category] : ['rings'],
    colors: colors.length ? colors : ['Gold'],
    tags,
    images: safeImages,
    colorImages: { [primaryColor]: safeImages },
    description: form.description.trim(),
    fullDescription: form.fullDescription.trim() || form.description.trim(),
    qualityGrade: form.qualityGrade.trim() || 'Standard',
    sizes: ['Adjustable'],
    details: {
      sku: form.sku.trim() || `SKU-${Date.now()}`,
      metalStamp: form.metalStamp.trim() || form.purity.trim() || 'N/A',
      goldWeight: form.goldWeight.trim() || form.weight.trim() || 'N/A',
      diamondCarat: form.diamondCarat.trim() || 'N/A',
      height: form.height.trim() || 'N/A',
      width: form.width.trim() || 'N/A',
    },
  };
}

function csvToArray(value) {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function formFromProduct(product) {
  return {
    name: product.name || '',
    price: product.price || '',
    weight: product.weight || '',
    purity: product.purity || '',
    badge: product.badge || '',
    category: product.category?.[0] || '',
    colorsCsv: (product.colors || []).join(', '),
    tagsCsv: (product.tags || []).join(', '),
    images: product.images || [],
    description: product.description || '',
    fullDescription: product.fullDescription || '',
    qualityGrade: product.qualityGrade || '',
    sku: product.details?.sku || '',
    metalStamp: product.details?.metalStamp || '',
    goldWeight: product.details?.goldWeight || '',
    diamondCarat: product.details?.diamondCarat || '',
    height: product.details?.height || '',
    width: product.details?.width || '',
  };
}

export default function AdminProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAddRoute = location.pathname === '/admin/products/add';
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();
  const { categories: allCategories } = useCategories();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filterCategories = useMemo(() => {
    const fromProducts = new Set(products.flatMap((p) => p.category || []));
    return ['all', ...Array.from(fromProducts)];
  }, [products]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((p) => {
      const categoryOk = category === 'all' || (p.category || []).includes(category);
      const searchOk =
        p.name.toLowerCase().includes(term) ||
        (p.category || []).some((c) => c.toLowerCase().includes(term)) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(term));
      return categoryOk && searchOk;
    });
  }, [products, search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm(formFromProduct(product));
  };

  const clearForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    if (isAddRoute) navigate('/admin/products');
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const filePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    const newImages = await Promise.all(filePromises);
    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newImages]
    }));
    e.target.value = '';
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const normalized = normalizeProduct(form, editingId);

    if (editingId) {
      updateProduct(editingId, normalized);
      showToast('Product updated successfully');
    } else {
      addProduct(normalized);
      showToast('Product added successfully');
    }
    clearForm();
  };

  const confirmDelete = () => {
    if (deletingId) {
      deleteProduct(deletingId);
      setDeletingId(null);
      showToast('Product deleted successfully');
    }
  };

  const productFormFields = (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
        <Input label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
      </div>

      <TextArea label="Short Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
        <label style={{ display: 'grid', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>Category</span>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle} required>
            <option value="" disabled>Select</option>
            {allCategories.filter(c => c.id !== 'all').map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
          </select>
        </label>
        <Input label="Colors" value={form.colorsCsv} onChange={(v) => setForm({ ...form, colorsCsv: v })} />
        <Input label="Tags" value={form.tagsCsv} onChange={(v) => setForm({ ...form, tagsCsv: v })} />
      </div>

      <div style={{ display: 'grid', gap: '0.8rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>Images</span>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {(form.images || []).map((img, idx) => (
            <div key={idx} style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
              <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(220, 53, 69, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '10px' }}>&times;</button>
            </div>
          ))}
          <label style={{ width: '70px', height: '70px', borderRadius: '8px', border: '2px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#f9f9f9' }}>
            <Upload size={18} color="#999" />
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem', padding: '1rem', background: '#f8f8f8', borderRadius: '10px' }}>
        <Input label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} />
        <Input label="Purity" value={form.purity} onChange={(v) => setForm({ ...form, purity: v })} />
        <Input label="Quality" value={form.qualityGrade} onChange={(v) => setForm({ ...form, qualityGrade: v })} />
        <Input label="Badge" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
        <Input label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} />
        <Input label="Stamp" value={form.metalStamp} onChange={(v) => setForm({ ...form, metalStamp: v })} />
        <Input label="Height" value={form.height} onChange={(v) => setForm({ ...form, height: v })} />
        <Input label="Width" value={form.width} onChange={(v) => setForm({ ...form, width: v })} />
      </div>

      <TextArea label="Full Specifications" value={form.fullDescription} onChange={(v) => setForm({ ...form, fullDescription: v })} />
    </div>
  );

  if (isAddRoute) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>Add Product</h2>
        <form onSubmit={submitForm} style={{ ...cardStyle, maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Product Details</h3>
            <button type="button" className="btn-outline" onClick={() => navigate('/admin/products')}>Back</button>
          </div>
          {productFormFields}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-outline" onClick={() => setForm(emptyForm)}>Reset</button>
            <button type="submit" className="btn-gold" style={{ padding: '0.8rem 3rem' }}>Create Product</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>Products</h2>

      <div style={cardStyle}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
          <input placeholder="Search Product..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ ...inputStyle, flex: 2 }} />
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} style={{ ...inputStyle, flex: 1 }}>
            {filterCategories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
          </select>
          <button className="btn-gold" onClick={() => navigate('/admin/products/add')} style={{ height: '45px', padding: '0 1.5rem' }}>+ New Product</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>Product</Th>
                <Th className="hide-mobile">Category</Th>
                <Th>Price</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => (
                <tr key={p.id}>
                  <Td>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <img src={p.images?.[0]} alt={p.name} style={{ flexShrink: 0, width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#999' }}>#{p.id}</div>
                      </div>
                    </div>
                  </Td>
                  <Td className="hide-mobile">{p.category?.[0]}</Td>
                  <Td style={{ fontWeight: 600, color: 'var(--gold-primary)' }}>{p.price}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => startEdit(p)} className="btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }} title="Edit"><Edit3 size={16} /></button>
                      <button onClick={() => setDeletingId(p.id)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #ffecec', background: '#fff5f5', color: '#dc3545' }} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ color: '#999', fontSize: '0.85rem', margin: '0 auto', textAlign: 'center', flex: '1 1 100%', display: 'block', order: 2 }}>
            Page {page} of {totalPages}
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flex: '1 1 100%', justifyContent: 'center', order: 1 }}>
            <button className="btn-outline" style={{ minWidth: '100px', height: '45px' }} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
            <button className="btn-outline" style={{ minWidth: '100px', height: '45px' }} disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1200, padding: '1rem' }}>
          <div className="modal-content animate-fade-in" style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', padding: '0' }}>
            {/* Sticky Header with Close Button */}
            <div style={{ position: 'sticky', top: 0, right: 0, left: 0, background: '#fff', padding: '1.5rem 2.5rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.8rem' }}>Update Product</h3>
              <button onClick={clearForm} style={{ background: '#f0f0f0', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '2rem 2.5rem' }}>
              <form onSubmit={submitForm}>
                {productFormFields}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={clearForm} className="btn-outline" style={{ height: '50px', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-gold" style={{ height: '50px', padding: '0 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Update Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingId && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1300, padding: '1rem' }}>
          <div className="modal-content animate-scale-in" style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#fff5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#dc3545' }}>
              <AlertTriangle size={45} />
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>Delete Product?</h3>
            <p style={{ color: '#666', marginBottom: '2.5rem', lineHeight: 1.6 }}>This action will permanently remove the product from your Prouducts. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={confirmDelete} style={{ flex: 1, height: '50px', borderRadius: '12px', border: 'none', background: '#dc3545', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Yes, Delete</button>
              <button onClick={() => setDeletingId(null)} style={{ flex: 1, height: '50px', borderRadius: '12px', border: '1px solid #ddd', background: '#f9f9f9', color: '#333', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, required = false }) {
  return (
    <label style={{ display: 'grid', gap: '0.3rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} required={required} />
    </label>
  );
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <label style={{ display: 'grid', gap: '0.3rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} style={inputStyle} required={required} />
    </label>
  );
}

function Th({ children, className, style }) {
  return <th className={className} style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '1rem 0.8rem', color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', ...style }}>{children}</th>;
}
function Td({ children, className, style }) {
  return <td className={className} style={{ borderBottom: '1px solid #eee', padding: '1rem 0.8rem', fontSize: '0.9rem', ...style }}>{children}</td>;
}

const cardStyle = {
  background: '#fff',
  borderRadius: '20px',
  padding: '2rem',
  boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
};
const inputStyle = {
  width: '100%',
  padding: '0.9rem 1.2rem',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  fontSize: '0.95rem',
  transition: 'all 0.2s',
  background: '#fcfcfc',
};
