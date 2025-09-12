// src/redux/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Initial state with sample orders
const initialState = {
  orders: [
    {
      id: "o1",
      sellerId: "seller_smith_id",
      totalAmount: 199.99,
      status: "completed",
      createdAt: "2025-01-15T10:30:00Z",
    },
    {
      id: "o2",
      sellerId: "seller_smith_id",
      totalAmount: 79.99,
      status: "pending",
      createdAt: "2025-02-10T12:00:00Z",
    },
    {
      id: "o3",
      sellerId: "seller_smith_id",
      totalAmount: 349.0,
      status: "completed",
      createdAt: "2025-03-05T14:20:00Z",
    },
    {
      id: "o4",
      sellerId: "seller_smith_id",
      totalAmount: 129.99,
      status: "completed",
      createdAt: "2025-04-18T09:45:00Z",
    },
    {
      id: "o5",
      sellerId: "seller_smith_id",
      totalAmount: 249.0,
      status: "pending",
      createdAt: "2025-05-22T16:15:00Z",
    },
    {
      id: "o6",
      sellerId: "seller_smith_id",
      totalAmount: 199.99,
      status: "completed",
      createdAt: "2025-06-12T11:10:00Z",
    },
  ],
};

// Create slice
const orderSlice = createSlice({
  name: "order", // ✅ Slice key used in store
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

// Export actions and reducer
export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;

// --- Selectors ---

// Base selector
export const selectOrders = (state) => state.order?.orders || [];


export const selectTotalSales = createSelector(
  [selectOrders],
  (orders) =>
    orders.filter(order => order.status === "completed")
          .reduce((acc, order) => acc + order.totalAmount, 0)
);

export const selectPendingOrders = createSelector(
  [selectOrders],
  (orders) => orders.filter(order => order.status === "pending").length
);

export const selectMonthlySales = createSelector(
  [selectOrders],
  (orders) => {
    const monthlySales = Array(12).fill(0);
    orders
      .filter(order => order.status === "completed")
      .forEach(order => {
        const date = new Date(order.createdAt);
        monthlySales[date.getMonth()] += order.totalAmount;
      });
    return monthlySales.map((sales, idx) => ({
      month: new Date(0, idx).toLocaleString("default", { month: "short" }),
      sales,
    }));
  }
);

