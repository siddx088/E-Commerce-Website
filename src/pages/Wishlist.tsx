import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart, Product } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {items.length} item{items.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start adding products you love to your wishlist
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{product.priceINR.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            {product.discount}% off
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500 mt-1">{product.brand}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating.rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="font-medium">Add to Cart</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;