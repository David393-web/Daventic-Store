import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { product, quantity }
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    increaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
