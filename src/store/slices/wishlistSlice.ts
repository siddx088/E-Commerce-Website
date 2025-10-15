import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './cartSlice';

interface WishlistState {
  items: Product[];
}

const getInitialWishlistItems = (): Product[] => {
  try {
    const savedItems = localStorage.getItem('wishlist');
    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const initialState: WishlistState = {
  items: getInitialWishlistItems(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;