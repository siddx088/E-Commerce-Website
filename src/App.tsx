import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { store } from './store/store';
import { RootState } from './store/store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

const AppContent: React.FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: isDark ? '#374151' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
            },
          }}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
