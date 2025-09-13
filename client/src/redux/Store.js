import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import slices (make sure the paths & names match exactly)
import authReducer from "../Redux/slices/authSlice";
import cartReducer from "../Redux/slices/cartSlice"; // if you have this slice
import productReducer from "../Redux/slices/productSlice"; // if you have this slice
import orderReducer from "../Redux/slices/orderSlice"; // if you have this slice

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer, // remove if you don’t have it yet
  products: productReducer, // if you have this slice
  orders: orderReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "products", "cart"], // ✅ persist auth + products
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ needed for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);
