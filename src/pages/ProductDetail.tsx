import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../store/slices/cartSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { formatINR } from '../utils/currency';
import { indianProducts } from '../data/products';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = indianProducts.find(p => p.id === parseInt(id || '0'));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      toast.success(`Added ${quantity} item(s) to cart!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
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
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <div className="mb-6">
                <img
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image}
                  alt={product.title}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="flex space-x-2">
                {(product.images || [product.image]).slice(0, 4).map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? 'border-blue-500'
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatINR(product.priceINR)}
                </div>
                {product.originalPrice && (
                  <div className="flex items-center space-x-3">
                    <span className="text-xl text-gray-500 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                    <span className="text-xl text-green-600 font-semibold">
                      {product.discount}% off
                    </span>
                  </div>
                )}
                <div className="mt-2">
                  <span className="text-lg text-gray-600 dark:text-gray-400">Brand: </span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">{product.brand}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Specifications
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            <div>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center space-x-2 btn-primary"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToWishlist}
                className="flex items-center justify-center space-x-2 btn-secondary"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">On orders over ₹2000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">UPI, Cards, COD</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Easy Returns</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">7-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;