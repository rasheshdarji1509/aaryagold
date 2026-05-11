import React, { createContext, useContext, useMemo, useState } from 'react';

const AdminAuthContext = createContext();
const STORAGE_KEY = 'aarya_admin_auth_v1';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

function readInitialAuth() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function AdminAuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(readInitialAuth);

  const login = (username, password) => {
    const ok = username === ADMIN_USER && password === ADMIN_PASS;
    if (ok) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, '1');
    }
    return ok;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ isAdminAuthenticated, login, logout }), [isAdminAuthenticated]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}

