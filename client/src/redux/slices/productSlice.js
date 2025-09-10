// src/Redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    // Initial dummy products. In a real app, these would come from a database.
    list: [
      {
        id: 'p1',
        name: 'Gaming Headset Pro',
        description: 'Immersive sound and comfortable design for extended gaming sessions. Compatible with PC, PS5, Xbox.',
        price: 79.99,
        image: 'https://placehold.co/400x300/FF0000/FFFFFF?text=Gaming+Headset',
        sellerId: 'seller_smith_id', // Example seller ID, ensure this matches a demo seller ID
        category: 'Electronics'
      },
      {
        id: 'p2',
        name: 'Wireless Mechanical Keyboard',
        description: 'Compact 60% layout with hot-swappable switches and customizable RGB lighting. Perfect for coding and gaming.',
        price: 129.99,
        image: 'https://placehold.co/400x300/0000FF/FFFFFF?text=Mechanical+Keyboard',
        sellerId: 'seller_smith_id',
        category: 'Electronics'
      },
      {
        id: 'p3',
        name: 'Ergonomic Office Chair',
        description: 'High-back ergonomic chair with lumbar support and adjustable armrests. Ideal for long work hours.',
        price: 249.00,
        image: 'https://placehold.co/400x300/00FF00/FFFFFF?text=Office+Chair',
        sellerId: 'seller_smith_id', // Assign to a demo seller
        category: 'Home & Office'
      },
      {
        id: 'p4',
        name: 'Smartwatch Series X',
        description: 'Track your fitness, monitor heart rate, and receive notifications on the go. Sleek design and long battery life.',
        price: 199.99,
        image: 'https://placehold.co/400x300/FFFF00/000000?text=Smartwatch',
        sellerId: 'seller_smith_id', // Assign to a demo seller
        category: 'Wearable Tech'
      },
    ],
  },
  reducers: {
    addProduct: (state, action) => {
      // Generate a simple ID. In a real app, this would be from backend.
      const newProduct = {
        ...action.payload,
        id: 'p' + (state.list.length + 1), // Simple sequential ID for demo
        sellerId: action.payload.sellerId, // Ensure sellerId is passed with product
      };
      state.list.push(newProduct);
    },
    removeProduct: (state, action) => {
      state.list = state.list.filter(product => product.id !== action.payload); // action.payload is productId
    },
    updateProduct: (state, action) => {
      const index = state.list.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
