# 🛍️ EliteStore - India's Premium E-Commerce Platform

<div align="center">

![EliteStore Logo](https://via.placeholder.com/200x80/667eea/ffffff?text=EliteStore)

**A modern, responsive e-commerce platform built for the Indian market**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-blue.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[🚀 Live Demo](https://elitestore-demo.vercel.app) • [📖 Documentation](./DEPLOYMENT.md) • [🐛 Report Bug](https://github.com/your-username/elitestore/issues) • [✨ Request Feature](https://github.com/your-username/elitestore/issues)

</div>

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/667eea/ffffff?text=Hero+Section" alt="Hero Section" width="400"/>
  <img src="https://via.placeholder.com/800x400/764ba2/ffffff?text=Product+Grid" alt="Product Grid" width="400"/>
</div>

A visually stunning, responsive e-commerce frontend application built with React.js, TypeScript, Tailwind CSS, and Framer Motion. Designed specifically for the Indian market with INR currency, Indian payment methods (UPI, COD), and India-specific features.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **Product Catalog**: Dynamic product listing with FakeStore API integration
- **Advanced Filtering**: Real-time search, category filters, and sorting options
- **Shopping Cart**: Global cart management with Redux Toolkit
- **Wishlist System**: Save favorite products with persistent storage
- **Product Details**: Comprehensive product pages with image galleries
- **Checkout Process**: Complete checkout flow with form validation

### UI/UX Excellence
- **Glassmorphic Design**: Modern glass-effect components with backdrop blur
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Elegant loading animations and skeleton screens
- **Hover Effects**: Interactive hover states and scale animations

### India-Specific Features
- **INR Currency**: All prices displayed in Indian Rupees with proper formatting
- **Indian Payment Methods**: UPI, Credit/Debit Cards, Cash on Delivery (COD)
- **GST Integration**: 18% GST calculation in checkout
- **Free Shipping**: Free delivery on orders above ₹2000
- **Indian Address Format**: State dropdown with major Indian states
- **Local Contact**: Indian phone numbers and addresses

### Technical Features
- **TypeScript**: Full type safety and better developer experience
- **Redux Toolkit**: Efficient state management for cart, wishlist, and theme
- **React Router**: Dynamic routing with animated page transitions
- **Local Storage**: Persistent cart and wishlist data
- **Currency Conversion**: USD to INR conversion utility
- **Responsive Images**: Optimized image loading and display
- **SEO Friendly**: Meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API**: FakeStore API for product data
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Navigation header with search and cart
│   │   └── Footer.tsx          # Footer with links and contact info
│   ├── Cart/
│   │   └── CartDrawer.tsx      # Sliding cart drawer component
│   ├── Home/
│   │   ├── Hero.tsx            # Landing page hero section
│   │   └── FeaturedProducts.tsx # Featured products carousel
│   └── Loading/
│       └── LoadingScreen.tsx   # Custom loading screen
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── Products.tsx            # Product listing page
│   ├── ProductDetail.tsx       # Individual product page
│   ├── Wishlist.tsx           # Wishlist page
│   └── Checkout.tsx           # Checkout process
├── store/
│   ├── store.ts               # Redux store configuration
│   └── slices/
│       ├── cartSlice.ts       # Cart state management
│       ├── wishlistSlice.ts   # Wishlist state management
│       ├── themeSlice.ts      # Theme state management
│       └── authSlice.ts       # Authentication state
├── App.tsx                    # Main app component with routing
└── index.tsx                  # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Secondary**: Purple gradient (#764ba2 to #667eea)
- **Dark Mode**: Gray scale (#1e1e1e to #737373)
- **Accent**: Yellow (#fbbf24) for ratings and highlights

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Fluid typography scaling

### Components
- **Glass Effect**: `bg-white/10 backdrop-blur-md border border-white/20`
- **Buttons**: Gradient backgrounds with hover animations
- **Cards**: Rounded corners with shadow and hover effects
- **Animations**: Smooth transitions with Framer Motion

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Extended color palette
- Custom animations and keyframes
- Dark mode support
- Custom font family

### Redux Store
State management structure:
- **Cart**: Items, quantities, total, drawer state
- **Wishlist**: Saved products with persistence
- **Theme**: Dark/light mode preference
- **Auth**: User authentication state (mock)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first approach
- Touch-friendly interactions
- Optimized layouts for all screen sizes
- Responsive typography and spacing

## 🎯 Performance Optimizations

- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Route-based code splitting with React Router
- **Memoization**: React.memo for expensive components
- **Optimized Images**: Proper sizing and compression
- **Efficient Animations**: Hardware-accelerated CSS transforms

## 🔒 Security Features

- **Input Validation**: Form validation for checkout process
- **XSS Protection**: Sanitized user inputs
- **HTTPS Ready**: Secure deployment configuration
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts for deployment

### Environment Variables
Create `.env` file for environment-specific configurations:
```
REACT_APP_API_URL=https://fakestoreapi.com
REACT_APP_SITE_NAME=EliteStore
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Testing
- Cypress integration ready
- Test files in `cypress/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FakeStore API** for product data
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **Redux Toolkit** for state management

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for product data
- [Unsplash](https://unsplash.com/) for product images
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/your-username/elitestore?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/elitestore?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/elitestore)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/elitestore)

## 📞 Support & Contact

- 📧 Email: support@elitestore.com
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/elitestore/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/elitestore/issues)
- 📖 Documentation: [Deployment Guide](DEPLOYMENT.md)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Built with ❤️ for the Indian E-commerce Market**

Made by [Your Name](https://github.com/your-username) • [LinkedIn](https://linkedin.com/in/your-profile) • [Twitter](https://twitter.com/your-handle)

</div>