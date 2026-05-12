import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { useCategories } from '../context/CategoryContext';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Clear the input so the same file can be selected again if needed
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

  const productForm = (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Row 1: Name and Price */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <Input label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
      </div>

      <TextArea label="Product Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />

      {/* Row 3: Category, Colors, Tags in one row - Responsive stacking */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'flex-end' }}>
        <label style={{ display: 'grid', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</span>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={inputStyle}
            required
          >
            <option value="" disabled>Select a category</option>
            {allCategories.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </label>
        <Input label="Colors (comma separated)" value={form.colorsCsv} onChange={(v) => setForm({ ...form, colorsCsv: v })} />
        <Input label="Tags (comma separated)" value={form.tagsCsv} onChange={(v) => setForm({ ...form, tagsCsv: v })} />
      </div>

      {/* Row 4: Images */}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product Images</span>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {(form.images || []).map((img, idx) => (
            <div key={idx} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(220, 53, 69, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >&times;</button>
            </div>
          ))}
          <label className="admin-upload-label" style={{ width: '100px', height: '100px', borderRadius: '10px', border: '2px dashed var(--border-gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'var(--bg-dark)', transition: 'var(--transition)', gap: '4px' }}>
            <span style={{ fontSize: '1.8rem', color: 'var(--gold-primary)' }}>+</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>Upload</span>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Row 5: Technical Overview - Responsive 4 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: '#f8f8f8', padding: '1.5rem', borderRadius: '12px', border: '1px solid #ddd' }}>
        <Input label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} />
        <Input label="Purity" value={form.purity} onChange={(v) => setForm({ ...form, purity: v })} />
        <Input label="Quality Grade" value={form.qualityGrade} onChange={(v) => setForm({ ...form, qualityGrade: v })} />
        <Input label="Badge (e.g. New)" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
      </div>

      {/* Row 6: Precise Details - Responsive Stacking */}
      <div style={{ ...grid3, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Input label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} />
        <Input label="Metal Stamp" value={form.metalStamp} onChange={(v) => setForm({ ...form, metalStamp: v })} />
        <Input label="Gold Weight" value={form.goldWeight} onChange={(v) => setForm({ ...form, goldWeight: v })} />
        <Input label="Diamond Carat" value={form.diamondCarat} onChange={(v) => setForm({ ...form, diamondCarat: v })} />
        <Input label="Height" value={form.height} onChange={(v) => setForm({ ...form, height: v })} />
        <Input label="Width" value={form.width} onChange={(v) => setForm({ ...form, width: v })} />
      </div>

      {/* Row 7: Full Technical Description */}
      <TextArea label="Detailed Product Specifications" value={form.fullDescription} onChange={(v) => setForm({ ...form, fullDescription: v })} />
    </div>
  );

  if (isAddRoute) {
    return (
      <div>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Add Product</h2>
        <form onSubmit={submitForm} style={{ ...cardStyle }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#000' }}>Create New Product</h3>
            <button type="button" className="btn-outline" onClick={() => navigate('/admin/products')} style={{ padding: '0.5rem 1.5rem', height: '40px' }}>
              <span>Back</span>
            </button>
          </div>
          {productForm}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-gold" style={{ minWidth: '220px', justifyContent: 'center', height: '50px' }}>
              <span>Add Product</span>
            </button>
            <button type="button" className="btn-outline" onClick={() => setForm(emptyForm)} style={{ minWidth: '150px', justifyContent: 'center', height: '50px' }}>
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Products</h2>

      {editingId && (
        <form onSubmit={submitForm} style={{ ...cardStyle, marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#000' }}>Update Product</h3>
            <button type="button" className="btn-outline" onClick={clearForm} style={{ padding: '0.5rem 1.5rem', height: '40px' }}>
              <span>Cancel</span>
            </button>
          </div>
          {productForm}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-gold" style={{ minWidth: '220px', justifyContent: 'center', height: '50px' }}>
              <span>Update Product</span>
            </button>
            <button type="button" className="btn-outline" onClick={clearForm} style={{ minWidth: '150px', justifyContent: 'center', height: '50px' }}>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={cardStyle}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
            background: 'var(--bg-dark)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center' }}>
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              style={{ ...inputStyle, paddingLeft: '1rem' }}
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            style={{ ...inputStyle, flex: '1 1 180px' }}
          >
            {filterCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
            <button type="button" className="btn-gold" onClick={() => navigate('/admin/products/add')} style={{ height: '42px', padding: '0 2rem', width: '100%', maxWidth: '250px', justifyContent: 'center' }}>
              <span>+ Add Product</span>
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th className="hide-mobile">Category</Th>
                <Th>Price</Th>
                <Th className="hide-mobile">Quality</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => (
                <tr key={p.id}>
                  <Td style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>#{p.id}</Td>
                  <Td>
                    <img src={p.images?.[0]} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-subtle)' }} />
                  </Td>
                  <Td style={{ fontWeight: 500 }}>{p.name}</Td>
                  <Td className="hide-mobile">{p.category?.[0] || '-'}</Td>
                  <Td style={{ color: 'var(--gold-light)' }}>{p.price}</Td>
                  <Td className="hide-mobile">
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(201, 168, 76, 0.1)', color: 'var(--gold-primary)', border: '1px solid var(--border-gold)' }}>
                      {p.qualityGrade || 'Standard'}
                    </span>
                  </Td>
                  <Td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button type="button" className="btn-outline" onClick={() => startEdit(p)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Delete this product?')) {
                            deleteProduct(p.id);
                            showToast('Product deleted successfully');
                          }
                        }}
                        style={{ padding: '0.4rem 0.8rem', background: 'rgba(220, 53, 69, 0.1)', color: '#ff4d4d', border: '1px solid rgba(220, 53, 69, 0.2)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', transition: 'var(--transition)' }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(220, 53, 69, 0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(220, 53, 69, 0.1)'}
                      >
                        Delete
                      </button>
                    </div>
                  </Td>
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
              onClick={() => setPage((p) => p - 1)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              <span>Prev</span>
            </button>
            <span style={{ fontSize: '0.9rem', minWidth: '60px', textAlign: 'center' }}>
              {page} / {totalPages}
            </span>
            <button
              type="button"
              className="btn-outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, required = false }) {
  return (
    <label style={{ display: 'grid', gap: '0.3rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} required={required} />
    </label>
  );
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <label style={{ display: 'grid', gap: '0.3rem', marginTop: '0.7rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} required={required} />
    </label>
  );
}

function Th({ children, className, style }) {
  return <th className={className} style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', padding: '1rem 0.7rem', color: 'var(--gold-primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', ...style }}>{children}</th>;
}
function Td({ children, className, style }) {
  return <td className={className} style={{ borderBottom: '1px solid var(--border-subtle)', padding: '1rem 0.7rem', fontSize: '0.9rem', ...style }}>{children}</td>;
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '2rem',
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
};
const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  background: '#fdfdfd',
  color: '#000000',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s',
};
const grid2 = { display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' };
const grid3 = { display: 'grid', gap: '1.5rem', marginTop: '0.7rem' };

