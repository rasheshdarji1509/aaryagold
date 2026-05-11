import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';

const PAGE_SIZE = 8;

const emptyForm = {
  name: '',
  price: '',
  weight: '',
  purity: '',
  badge: '',
  categoryCsv: '',
  colorsCsv: '',
  tagsCsv: '',
  imageCsv: '',
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
  const categories = csvToArray(form.categoryCsv).map((v) => v.toLowerCase());
  const colors = csvToArray(form.colorsCsv);
  const images = csvToArray(form.imageCsv);
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
    category: categories.length ? categories : ['rings'],
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
    categoryCsv: (product.category || []).join(', '),
    colorsCsv: (product.colors || []).join(', '),
    tagsCsv: (product.tags || []).join(', '),
    imageCsv: (product.images || []).join(', '),
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
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const categories = useMemo(() => {
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

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Products</h2>

      {(isAddRoute || editingId) && (
        <form onSubmit={submitForm} style={cardStyle}>
          <h3 style={{ marginBottom: '0.8rem' }}>{editingId ? 'Update Product' : 'Add Product'}</h3>
          <div style={grid2}>
            <Input label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Input label="Price" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
            <Input label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} />
            <Input label="Purity" value={form.purity} onChange={(v) => setForm({ ...form, purity: v })} />
            <Input label="Quality" value={form.qualityGrade} onChange={(v) => setForm({ ...form, qualityGrade: v })} />
            <Input label="Badge" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
            <Input label="Category (comma separated)" value={form.categoryCsv} onChange={(v) => setForm({ ...form, categoryCsv: v })} />
            <Input label="Colors (comma separated)" value={form.colorsCsv} onChange={(v) => setForm({ ...form, colorsCsv: v })} />
            <Input label="Tags (comma separated)" value={form.tagsCsv} onChange={(v) => setForm({ ...form, tagsCsv: v })} />
            <Input label="Image URLs (comma separated)" value={form.imageCsv} onChange={(v) => setForm({ ...form, imageCsv: v })} />
          </div>
          <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          <TextArea label="Product Details" value={form.fullDescription} onChange={(v) => setForm({ ...form, fullDescription: v })} />
          <div style={grid3}>
            <Input label="SKU" value={form.sku} onChange={(v) => setForm({ ...form, sku: v })} />
            <Input label="Metal Stamp" value={form.metalStamp} onChange={(v) => setForm({ ...form, metalStamp: v })} />
            <Input label="Gold Weight" value={form.goldWeight} onChange={(v) => setForm({ ...form, goldWeight: v })} />
            <Input label="Diamond Carat" value={form.diamondCarat} onChange={(v) => setForm({ ...form, diamondCarat: v })} />
            <Input label="Height" value={form.height} onChange={(v) => setForm({ ...form, height: v })} />
            <Input label="Width" value={form.width} onChange={(v) => setForm({ ...form, width: v })} />
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-gold">
              <span>{editingId ? 'Update Product' : 'Add Product'}</span>
            </button>
            <button type="button" className="btn-outline" onClick={clearForm}>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      <div style={{ ...cardStyle, marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            placeholder="Search by name/category/tag"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={inputStyle}
          />
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            style={inputStyle}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Quality</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => (
                <tr key={p.id}>
                  <Td>{p.id}</Td>
                  <Td>
                    <img src={p.images?.[0]} alt={p.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '6px' }} />
                  </Td>
                  <Td>{p.name}</Td>
                  <Td>{(p.category || []).join(', ')}</Td>
                  <Td>{p.price}</Td>
                  <Td>{p.qualityGrade || '-'}</Td>
                  <Td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="button" className="btn-outline" onClick={() => startEdit(p)}>
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteProduct(p.id);
                          showToast('Product deleted successfully');
                        }}
                        style={{ padding: '0.45rem 0.7rem', background: '#5a2525', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
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

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.9rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            Showing {paged.length} of {filtered.length}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="btn-outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              <span>Prev</span>
            </button>
            <span style={{ alignSelf: 'center' }}>
              {page} / {totalPages}
            </span>
            <button type="button" className="btn-outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
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
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} required={required} />
    </label>
  );
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <label style={{ display: 'grid', gap: '0.3rem', marginTop: '0.7rem' }}>
      <span>{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} required={required} />
    </label>
  );
}

function Th({ children }) {
  return <th style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', padding: '0.7rem' }}>{children}</th>;
}
function Td({ children }) {
  return <td style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0.7rem' }}>{children}</td>;
}

const cardStyle = {
  border: '1px solid var(--border-subtle)',
  borderRadius: '10px',
  padding: '1rem',
  background: 'var(--bg-card)',
};
const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.7rem',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-dark)',
  color: 'var(--text-ivory)',
};
const grid2 = { display: 'grid', gap: '0.7rem', gridTemplateColumns: 'repeat(2, minmax(160px, 1fr))' };
const grid3 = { display: 'grid', gap: '0.7rem', marginTop: '0.7rem', gridTemplateColumns: 'repeat(3, minmax(120px, 1fr))' };

