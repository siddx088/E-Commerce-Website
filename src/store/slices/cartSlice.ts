import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  priceINR: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  category: string;
  brand: string;
  image: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  specifications?: { [key: string]: string };
  inStock: boolean;
  fastDelivery: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

const getInitialItems = (): CartItem[] => {
  try {
    const savedItems = localStorage.getItem('cart');
    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0);
};

const initialItems = getInitialItems();

const initialState: CartState = {
  items: initialItems,
  isOpen: false,
  total: calculateTotal(initialItems),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }
      state.total = state.items.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;