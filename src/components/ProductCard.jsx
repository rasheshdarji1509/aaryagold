import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const navigate = useNavigate();

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {/* Dual Image Preview */}
        <div className="image-stack">
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : "/assets/products/ring1.png"
            }
            alt={product.name}
            className={`product-image primary-img ${isHovered && product.images && product.images.length > 1 ? "hidden" : ""}`}
          />
          {product.images && product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} View 2`}
              className={`product-image secondary-img ${isHovered ? "visible" : ""}`}
            />
          )}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-footer">
          <span className="product-weight">{product.weight}</span>
          <div className="product-footer-actions">
            <button
              type="button"
              className="detail-btn"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/product/${product.id}`);
              }}
            >
              {product.purity}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
