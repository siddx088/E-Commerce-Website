import { Product } from '../store/slices/cartSlice';

export const indianProducts: Product[] = [
    // Electronics - Smartphones
    {
        id: 1,
        title: "iPhone 15 Pro Max 256GB Natural Titanium",
        price: 1499,
        priceINR: 134900,
        originalPrice: 159900,
        discount: 16,
        description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.",
        category: "electronics",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        images: [
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
        ],
        rating: { rate: 4.8, count: 2847 },
        specifications: {
            "Display": "6.7-inch Super Retina XDR",
            "Chip": "A17 Pro",
            "Storage": "256GB",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
        price: 1299,
        priceINR: 129999,
        originalPrice: 139999,
        discount: 7,
        description: "Ultimate Galaxy experience with S Pen, 200MP camera, and AI-powered features.",
        category: "electronics",
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
        images: [
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
            "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500"
        ],
        rating: { rate: 4.6, count: 1923 },
        specifications: {
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "Storage": "512GB",
            "Camera": "200MP Main + 50MP Periscope + 12MP Ultra Wide"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 3,
        title: "OnePlus 12 16GB RAM 512GB Flowy Emerald",
        price: 799,
        priceINR: 69999,
        originalPrice: 74999,
        discount: 7,
        description: "Flagship killer with Snapdragon 8 Gen 3, 100W SuperVOOC charging, and Hasselblad cameras.",
        category: "electronics",
        brand: "OnePlus",
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500",
        images: [
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500",
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500"
        ],
        rating: { rate: 4.5, count: 1456 },
        specifications: {
            "Display": "6.82-inch LTPO AMOLED",
            "Processor": "Snapdragon 8 Gen 3",
            "RAM": "16GB",
            "Storage": "512GB"
        },
        inStock: true,
        fastDelivery: true
    },

    // Electronics - Laptops
    {
        id: 4,
        title: "MacBook Air M3 15-inch 512GB Midnight",
        price: 1699,
        priceINR: 149900,
        originalPrice: 154900,
        discount: 3,
        description: "Supercharged by M3 chip with 18-hour battery life and stunning Liquid Retina display.",
        category: "electronics",
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
        images: [
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
        ],
        rating: { rate: 4.9, count: 892 },
        specifications: {
            "Processor": "Apple M3 8-core CPU",
            "Memory": "16GB Unified Memory",
            "Storage": "512GB SSD",
            "Display": "15.3-inch Liquid Retina"
        },
        inStock: true,
        fastDelivery: false
    },
    {
        id: 5,
        title: "Dell XPS 13 Plus Intel i7 32GB RAM 1TB SSD",
        price: 1899,
        priceINR: 159999,
        originalPrice: 169999,
        discount: 6,
        description: "Premium ultrabook with InfinityEdge display and cutting-edge performance.",
        category: "electronics",
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
        images: [
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
            "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500"
        ],
        rating: { rate: 4.4, count: 567 },
        specifications: {
            "Processor": "Intel Core i7-1360P",
            "Memory": "32GB LPDDR5",
            "Storage": "1TB PCIe SSD",
            "Display": "13.4-inch OLED 3.5K"
        },
        inStock: true,
        fastDelivery: false
    },

    // Fashion - Men's Clothing
    {
        id: 6,
        title: "Levi's 511 Slim Fit Jeans Dark Blue",
        price: 89,
        priceINR: 4999,
        originalPrice: 6999,
        discount: 29,
        description: "Classic slim fit jeans with authentic Levi's styling and premium denim quality.",
        category: "men's clothing",
        brand: "Levi's",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500"
        ],
        rating: { rate: 4.3, count: 2341 },
        specifications: {
            "Fit": "Slim",
            "Material": "99% Cotton, 1% Elastane",
            "Wash": "Dark Blue",
            "Origin": "Made in India"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 7,
        title: "Nike Air Force 1 '07 White Sneakers",
        price: 110,
        priceINR: 7995,
        originalPrice: 8995,
        discount: 11,
        description: "Iconic basketball shoe with premium leather upper and Air-Sole unit for comfort.",
        category: "men's clothing",
        brand: "Nike",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
        ],
        rating: { rate: 4.7, count: 5678 },
        specifications: {
            "Upper": "Premium Leather",
            "Sole": "Rubber with Air-Sole unit",
            "Color": "White/White",
            "Sizes": "UK 6-12 Available"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 8,
        title: "Allen Solly Cotton Formal Shirt Sky Blue",
        price: 45,
        priceINR: 2499,
        originalPrice: 3999,
        discount: 38,
        description: "Premium cotton formal shirt perfect for office wear with comfortable fit.",
        category: "men's clothing",
        brand: "Allen Solly",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
        images: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"
        ],
        rating: { rate: 4.2, count: 1234 },
        specifications: {
            "Material": "100% Cotton",
            "Fit": "Regular",
            "Collar": "Spread Collar",
            "Care": "Machine Wash"
        },
        inStock: true,
        fastDelivery: true
    },

    // Fashion - Women's Clothing
    {
        id: 9,
        title: "Zara Floral Print Maxi Dress Multicolor",
        price: 79,
        priceINR: 4990,
        originalPrice: 5990,
        discount: 17,
        description: "Elegant floral maxi dress perfect for casual and semi-formal occasions.",
        category: "women's clothing",
        brand: "Zara",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
        images: [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"
        ],
        rating: { rate: 4.4, count: 892 },
        specifications: {
            "Material": "Polyester Blend",
            "Length": "Maxi",
            "Sleeve": "3/4 Sleeve",
            "Occasion": "Casual/Semi-formal"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 10,
        title: "H&M Denim Jacket Light Blue Wash",
        price: 59,
        priceINR: 3999,
        originalPrice: 4999,
        discount: 20,
        description: "Classic denim jacket with vintage wash and comfortable fit for everyday styling.",
        category: "women's clothing",
        brand: "H&M",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
        images: [
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
        ],
        rating: { rate: 4.1, count: 1567 },
        specifications: {
            "Material": "100% Cotton Denim",
            "Wash": "Light Blue",
            "Fit": "Regular",
            "Closure": "Button Front"
        },
        inStock: true,
        fastDelivery: true
    },

    // Home & Kitchen
    {
        id: 11,
        title: "Philips Air Fryer HD9252/90 4.1L Digital",
        price: 199,
        priceINR: 12995,
        originalPrice: 15995,
        discount: 19,
        description: "Healthy cooking with Rapid Air technology. Cook with little to no oil.",
        category: "home & kitchen",
        brand: "Philips",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
            "https://images.unsplash.com/photo-1585515656973-a0b8d3ba9c1b?w=500"
        ],
        rating: { rate: 4.5, count: 3421 },
        specifications: {
            "Capacity": "4.1 Liters",
            "Technology": "Rapid Air",
            "Display": "Digital Touch",
            "Warranty": "2 Years"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 12,
        title: "Prestige Deluxe Alpha Pressure Cooker 5L",
        price: 45,
        priceINR: 2799,
        originalPrice: 3499,
        discount: 20,
        description: "Premium stainless steel pressure cooker with unique deep lid for larger capacity.",
        category: "home & kitchen",
        brand: "Prestige",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
        ],
        rating: { rate: 4.3, count: 2156 },
        specifications: {
            "Capacity": "5 Liters",
            "Material": "Stainless Steel",
            "Base": "Induction Compatible",
            "Safety": "Controlled Gasket Release System"
        },
        inStock: true,
        fastDelivery: true
    },

    // Books
    {
        id: 13,
        title: "Atomic Habits by James Clear (Paperback)",
        price: 18,
        priceINR: 399,
        originalPrice: 599,
        discount: 33,
        description: "Transform your life with tiny changes in behavior that deliver remarkable results.",
        category: "books",
        brand: "Random House",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
        ],
        rating: { rate: 4.8, count: 12456 },
        specifications: {
            "Author": "James Clear",
            "Pages": "320",
            "Language": "English",
            "Publisher": "Random House Business"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 14,
        title: "The Psychology of Money by Morgan Housel",
        price: 16,
        priceINR: 349,
        originalPrice: 499,
        discount: 30,
        description: "Timeless lessons on wealth, greed, and happiness from one of the greatest financial minds.",
        category: "books",
        brand: "Jaico Publishing",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
        ],
        rating: { rate: 4.6, count: 8934 },
        specifications: {
            "Author": "Morgan Housel",
            "Pages": "256",
            "Language": "English",
            "Publisher": "Jaico Publishing House"
        },
        inStock: true,
        fastDelivery: true
    },

    // Sports & Fitness
    {
        id: 15,
        title: "Adidas Ultraboost 22 Running Shoes Black",
        price: 180,
        priceINR: 16999,
        originalPrice: 18999,
        discount: 11,
        description: "Premium running shoes with BOOST midsole and Primeknit upper for ultimate comfort.",
        category: "sports",
        brand: "Adidas",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500"
        ],
        rating: { rate: 4.5, count: 2789 },
        specifications: {
            "Technology": "BOOST Midsole",
            "Upper": "Primeknit",
            "Use": "Running/Training",
            "Drop": "10mm"
        },
        inStock: true,
        fastDelivery: true
    },
    {
        id: 16,
        title: "Decathlon Domyos Adjustable Dumbbells 20kg Set",
        price: 89,
        priceINR: 4999,
        originalPrice: 5999,
        discount: 17,
        description: "Space-saving adjustable dumbbells perfect for home workouts and strength training.",
        category: "sports",
        brand: "Decathlon",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500"
        ],
        rating: { rate: 4.2, count: 1456 },
        specifications: {
            "Weight": "20kg Total (10kg each)",
            "Material": "Cast Iron with Rubber Coating",
            "Adjustable": "Yes, 2.5kg to 10kg per dumbbell",
            "Grip": "Textured Handle"
        },
        inStock: true,
        fastDelivery: false
    }
];

export const categories = [
    "electronics",
    "men's clothing",
    "women's clothing",
    "home & kitchen",
    "books",
    "sports"
];

export const brands = [
    "Apple", "Samsung", "OnePlus", "Dell", "Levi's", "Nike",
    "Allen Solly", "Zara", "H&M", "Philips", "Prestige",
    "Random House", "Jaico Publishing", "Adidas", "Decathlon"
];