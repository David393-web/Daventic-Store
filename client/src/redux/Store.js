import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../Redux/slices/CartSlice";
import userReducer from "../Redux/slices/userSlice";
import sessionReducer from "../Redux/slices/sessionSlice"; // <-- import it
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  session: sessionReducer, // <-- add it here
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/REGISTER",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
