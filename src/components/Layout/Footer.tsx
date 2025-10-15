import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EliteStore
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your premium destination for quality products with exceptional shopping experience.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Products', 'About Us', 'Contact', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'].map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${category.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">support@elitestore.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">MG Road, Bangalore, Karnataka 560001</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 EliteStore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;