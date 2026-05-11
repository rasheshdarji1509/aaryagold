import React, { createContext, useContext, useMemo, useState } from 'react';
import { products as seedProducts } from '../data/products';

const ProductContext = createContext();
const STORAGE_KEY = 'aarya_products_v1';

function readStoredProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedProducts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedProducts;
  } catch {
    return seedProducts;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(readStoredProducts);

  const persist = (nextProducts) => {
    setProducts(nextProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
  };

  const addProduct = (productInput) => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const product = { ...productInput, id: nextId };
    persist([product, ...products]);
    return product;
  };

  const updateProduct = (id, patch) => {
    persist(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProduct = (id) => {
    persist(products.filter((p) => p.id !== id));
  };

  const resetProducts = () => {
    persist(seedProducts);
  };

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct, resetProducts }),
    [products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used inside ProductProvider');
  return ctx;
}

