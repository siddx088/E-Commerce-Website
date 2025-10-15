import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../store/slices/cartSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist } from '../../store/slices/wishlistSlice';
import { formatINR } from '../../utils/currency';
import { indianProducts } from '../../data/products';
import toast from 'react-hot-toast';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = () => {
      try {
        // Get first 8 products for featured section
        const featuredProducts = indianProducts.slice(0, 8);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!', {
      duration: 2000,
      position: 'bottom-right',
    });
  };

  const handleAddToWishlist = (product: Product) => {
    dispatch(addToWishlist(product));
    toast.success('Added to wishlist!', {
      duration: 2000,
      position: 'bottom-right',
    });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that combine quality, style, and value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;