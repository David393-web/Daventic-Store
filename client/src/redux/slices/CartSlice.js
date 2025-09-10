import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  couponCode: "",
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    applyCoupon: (state, action) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = "";
      state.discount = 0;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  setCartItems,
  applyCoupon,
  removeCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
