import React, { createContext, useContext, useMemo, useState } from 'react';

// Initial seed categories imported from data file
import { categories as seedCategories } from '../data/products';

const CategoryContext = createContext();
const STORAGE_KEY = 'aarya_categories_v1';

function readStoredCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedCategories;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedCategories;
  } catch {
    return seedCategories;
  }
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(readStoredCategories);

  const persist = (next) => {
    setCategories(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addCategory = (cat) => {
    // Ensure unique id
    const exists = categories.find(c => c.id === cat.id);
    if (exists) throw new Error('Category id already exists');
    const next = [...categories, cat];
    persist(next);
    return cat;
  };

  const updateCategory = (id, patch) => {
    const next = categories.map(c => (c.id === id ? { ...c, ...patch } : c));
    persist(next);
  };

  const deleteCategory = (id) => {
    const next = categories.filter(c => c.id !== id);
    persist(next);
  };

  const resetCategories = () => {
    persist(seedCategories);
  };

  const value = useMemo(() => ({ categories, addCategory, updateCategory, deleteCategory, resetCategories }), [categories]);

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategories must be used within CategoryProvider');
  return ctx;
}
