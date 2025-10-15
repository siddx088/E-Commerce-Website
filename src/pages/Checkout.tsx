import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Mail, Lock } from 'lucide-react';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }
    
    // Only allow numbers for CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields based on payment method
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'phone'];
    
    if (paymentMethod === 'upi' && !formData.upiId) {
      toast.error('Please enter your UPI ID');
      setLoading(false);
      return;
    }
    
    if (paymentMethod === 'card') {
      const cardFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
      for (const field of cardFields) {
        if (!formData[field as keyof typeof formData]) {
          toast.error(`Please fill in all card details`);
          setLoading(false);
          return;
        }
      }
    }

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in all required fields`);
        setLoading(false);
        return;
      }
    }

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      dispatch(clearCart());
      toast.success(`Order placed successfully! Payment method: ${paymentMethod.toUpperCase()}`);
      navigate('/');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Continue Shopping
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your purchase securely
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Contact Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Payment Method
                  </h2>
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                
                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'upi' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💳</div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">UPI</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pay with UPI ID</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'cod' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">COD</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Cash on Delivery</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💳</div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">Cards</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Debit/Credit Card</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Dynamic Payment Forms */}
                {paymentMethod === 'upi' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        required
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        placeholder="yourname@paytm"
                      />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <p>✓ Secure payment with UPI</p>
                      <p>✓ Instant payment confirmation</p>
                      <p>✓ No additional charges</p>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'cod' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Cash on Delivery</h4>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                        <p>✓ Pay when your order is delivered</p>
                        <p>✓ Additional ₹49 COD charges apply</p>
                        <p>✓ Available for orders up to ₹50,000</p>
                        <p>✓ Exact change recommended</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'card' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <p>✓ Secure 256-bit SSL encryption</p>
                      <p>✓ Visa, Mastercard, RuPay accepted</p>
                      <p>✓ No additional charges</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg h-fit"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-800 dark:text-white">
                    ₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{total >= 2000 ? 'Free' : '₹99'}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>COD Charges</span>
                  <span>₹49</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>GST (18%)</span>
                <span>₹{Math.round(total * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span>₹{Math.round(
                    total * 1.18 + 
                    (total >= 2000 ? 0 : 99) + 
                    (paymentMethod === 'cod' ? 49 : 0)
                  ).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Complete Order'}
            </motion.button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Secure payment powered by Razorpay. Your information is encrypted and safe.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;