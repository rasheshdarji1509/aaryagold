import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, Share2, Star } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDiamondQuality, setSelectedDiamondQuality] = useState('');
  const [openSection, setOpenSection] = useState('specs');
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      const defaultColor = foundProduct.colors && foundProduct.colors.length > 0 ? foundProduct.colors[0] : '';
      setSelectedColor(defaultColor);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
      if (foundProduct.diamondQualities && foundProduct.diamondQualities.length > 0) setSelectedDiamondQuality(foundProduct.diamondQualities[0]);
      
      // Initial images
      if (foundProduct.colorImages && foundProduct.colorImages[defaultColor]) {
        setCurrentImages(foundProduct.colorImages[defaultColor]);
      } else {
        setCurrentImages(foundProduct.images);
      }
    }
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (product.colorImages && product.colorImages[color]) {
      setCurrentImages(product.colorImages[color]);
      setActiveImg(0); // Reset to first image of new color
    }
  };

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-gold">Back to Products</Link>
      </div>
    );
  }

  const whatsappMsg = `Hi Aarya Gold, I'm interested in the ${product.name}.
Details:
- SKU: ${product.details?.sku}
- Weight: ${product.weight}
- Purity: ${product.purity}
- Color: ${selectedColor}
- Size: ${selectedSize}
- Quality: ${product.qualityGrade}
- Diamond Quality: ${selectedDiamondQuality}

Can you provide more details or pricing?`;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="product-breadcrumbs">
          <Link to="/products" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Collection</span>
          </Link>
        </div>

        <div className="product-detail-grid">
          {/* Left: Images */}
          <div className="product-gallery">
            <div className="main-image-container">
              {product.badge && <span className="detail-badge">{product.badge}</span>}
              <div className="current-color-tag">{selectedColor} Edition</div>
              <img src={currentImages[activeImg]} alt={product.name} className="main-image" />
              <button 
                className={`detail-wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart size={20} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="thumbnail-grid">
              {currentImages.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumb-box ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${selectedColor} View ${i + 1}`} />
                  <span className="view-label">View {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-main-info">
            <div className="info-header">
              <div className="category-tags">
                {product.category.map(cat => (
                  <span key={cat} className="detail-cat-tag">{cat}</span>
                ))}
                <span className="quality-badge">{product.qualityGrade}</span>
              </div>
              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "var(--gold-primary)" : "none"} color="var(--gold-primary)" />)}
                </div>
                <span className="review-count">(12 reviews)</span>
              </div>
            </div>

            <div className="product-story">
              <h3>The Story</h3>
              <p>{product.fullDescription || product.description}</p>
            </div>

            {/* Diamond Quality Selection */}
            {product.diamondQualities && (
              <div className="selector-section">
                <h3 className="selector-title">Diamond Quality :</h3>
                <div className="diamond-quality-options">
                  {product.diamondQualities.map(dq => (
                    <button 
                      key={dq}
                      className={`dq-btn ${selectedDiamondQuality === dq ? 'active' : ''}`}
                      onClick={() => setSelectedDiamondQuality(dq)}
                    >
                      {dq}
                    </button>
                  ))}
                </div>
                <p className="dq-helper">All diamonds are crafted in VVS VS clarity with FG color.</p>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className="selector-section">
                <h3 className="selector-title">Metal Color : <span className="selected-val-text">{selectedColor}</span></h3>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''} color-${color.toLowerCase().replace(' ', '-')}`}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    >
                      <span className="color-swatch"></span>
                      <span className="color-name">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="selector-section">
                <div className="selector-header">
                  <h3 className="selector-title">Ring Size : <span className="selected-val-text">{selectedSize}</span></h3>
                  <button className="size-guide-btn">Find Ring Size</button>
                </div>
                <div className="size-options">
                  <select 
                    className="size-select-input"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    <option value="">Select Size</option>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Accordion Sections */}
            <div className="product-accordions">
              <div className={`accordion-item ${openSection === 'specs' ? 'open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenSection(openSection === 'specs' ? '' : 'specs')}>
                  <span>Product Details</span>
                  <ArrowLeft size={16} style={{ transform: openSection === 'specs' ? 'rotate(-90deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                </button>
                <div className="accordion-content">
                  <table className="specs-table">
                    <tbody>
                      <tr>
                        <td>SKU</td>
                        <td>{product.details?.sku}</td>
                      </tr>
                      <tr>
                        <td>Metal Stamp</td>
                        <td>{product.details?.metalStamp}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{product.category[0].toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td>Gold Weight ( Approx ) <Share2 size={12} /></td>
                        <td>{product.details?.goldWeight}</td>
                      </tr>
                      <tr>
                        <td>Total Diamond Carat Weight</td>
                        <td>{product.details?.diamondCarat}</td>
                      </tr>
                      <tr>
                        <td>Height <Share2 size={12} /></td>
                        <td>{product.details?.height}</td>
                      </tr>
                      <tr>
                        <td>Width <Share2 size={12} /></td>
                        <td>{product.details?.width}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={`accordion-item ${openSection === 'diamond' ? 'open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenSection(openSection === 'diamond' ? '' : 'diamond')}>
                  <span>Side Diamond Details</span>
                  <ArrowLeft size={16} style={{ transform: openSection === 'diamond' ? 'rotate(-90deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                </button>
                <div className="accordion-content">
                  <p>Detailed information about secondary diamonds used in this piece.</p>
                </div>
              </div>

              <div className={`accordion-item ${openSection === 'price' ? 'open' : ''}`}>
                <button className="accordion-trigger" onClick={() => setOpenSection(openSection === 'price' ? '' : 'price')}>
                  <span>Price Breakup</span>
                  <ArrowLeft size={16} style={{ transform: openSection === 'price' ? 'rotate(-90deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                </button>
                <div className="accordion-content">
                  <p>Transparent breakdown of gold, diamond, and making charges.</p>
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <a 
                href={`https://wa.me/917304421336?text=${encodeURIComponent(whatsappMsg)}`} 
                className="btn-gold-large"
                target="_blank"
                rel="noreferrer"
              >
                <ShoppingBag size={20} />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>


            <div className="trust-badges">
              <div className="trust-item">
                <ShieldCheck size={18} />
                <span>Hallmark Certified</span>
              </div>
              <div className="trust-item">
                <Truck size={18} />
                <span>Secure Shipping</span>
              </div>
              <div className="trust-item">
                <RotateCcw size={18} />
                <span>Easy Return Policy</span>
              </div>
            </div>

            <div className="product-tags-footer">
              <span className="footer-label">Tags:</span>
              <div className="footer-tags">
                {product.tags.map(t => <span key={t}>#{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
