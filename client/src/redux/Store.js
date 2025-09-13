import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Import slices (no .js extension needed)
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";

// ✅ Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
  orders: orderReducer,
});

// ✅ Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "products"], // persists auth + cart + products
};

// ✅ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store setup
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// ✅ Persistor
export const persistor = persistStore(store);