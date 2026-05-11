import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import { CategoryProvider } from './context/CategoryContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedAdminRoute({ children }) {
  const { isAdminAuthenticated } = useAdminAuth();
  if (!isAdminAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

function AppShell() {
  const location = useLocation();
  const hidePublicLayout = location.pathname.startsWith('/admin');

  return (
    <>
      {!hidePublicLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Routes>
      {!hidePublicLayout && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loader duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <ToastProvider>
          <ProductProvider>
            <CategoryProvider>
              <WishlistProvider>
                <Router>
                  {loading && <Loader />}
                  
                  <div className={`app-content ${loading ? 'hidden' : 'visible'}`}>
                    <ScrollToTop />
                    <AppShell />
                  </div>

                  {/* Global styles for hidden/visible transition */}
                  <style>{`
                    .app-content {
                      transition: opacity 0.8s ease;
                    }
                    .app-content.hidden {
                      opacity: 0;
                      height: 100vh;
                      overflow: hidden;
                    }
                    .app-content.visible {
                      opacity: 1;
                    }
                  `}</style>
                </Router>
              </WishlistProvider>
            </CategoryProvider>
          </ProductProvider>
        </ToastProvider>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}

export default App;
