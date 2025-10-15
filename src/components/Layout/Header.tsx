import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Moon, Sun, Menu } from 'lucide-react';
import { RootState } from '../../store/store';
import { toggleCart } from '../../store/slices/cartSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { items } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              EliteStore
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white placeholder-gray-500"
              />
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleThemeToggle}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCartClick}
              className="relative p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </motion.button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <User className="w-5 h-5" />
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-medium text-gray-800 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <User className="w-5 h-5" />
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;