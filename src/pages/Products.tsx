import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../store/slices/cartSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { formatINR } from '../utils/currency';
import { indianProducts, categories, brands } from '../data/products';
import toast from 'react-hot-toast';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = () => {
      try {
        setProducts(indianProducts);
        setFilteredProducts(indianProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.priceINR >= priceRange[0] && product.priceINR <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceINR - b.priceINR);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceINR - a.priceINR);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
    toast.success('Added to wishlist!');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our complete collection of premium products
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
                  </option>
                ))}
              </select>

              {/* Brand Filter */}
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    setPriceRange([min, max]);
                  }}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                >
                  <option value="0-200000">All Prices</option>
                  <option value="0-1000">Under ₹1,000</option>
                  <option value="1000-5000">₹1,000 - ₹5,000</option>
                  <option value="5000-15000">₹5,000 - ₹15,000</option>
                  <option value="15000-50000">₹15,000 - ₹50,000</option>
                  <option value="50000-200000">Above ₹50,000</option>
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Best Discount</option>
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
          }
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={
                viewMode === 'grid'
                  ? 'group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300'
                  : 'group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex'
              }
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToWishlist(product)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating.rate)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                        ({product.rating.count})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-blue-600">
                          {formatINR(product.priceINR)}
                        </span>
                        {product.originalPrice && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                            <span className="text-sm text-green-600 font-medium">
                              {product.discount}% off
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-gray-500 mt-1">{product.brand}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm font-medium">Add</span>
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-48 flex-shrink-0">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2 hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating.rate)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          ({product.rating.count} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold text-blue-600">
                          {formatINR(product.priceINR)}
                        </span>
                        {product.originalPrice && (
                          <div className="flex items-center space-x-2">
                            <span className="text-lg text-gray-500 line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                            <span className="text-lg text-green-600 font-medium">
                              {product.discount}% off
                            </span>
                          </div>
                        )}
                        <span className="text-sm text-gray-500 mt-1 font-medium">{product.brand}</span>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToWishlist(product)}
                          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span className="font-medium">Add to Cart</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Products;