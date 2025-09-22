// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,              // Stores user data (e.g., { id, email, name, accountType })
  token: null,             // Stores the authentication token (e.g., JWT)
  isAuthenticated: false,  // ✅ Starts false by default
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Reducer to handle user login.
     * Accepts either:
     * - { user: { ... }, token: "..." }
     * - or just user object if no token is sent
     */
    loginUser: (state, action) => {
      if (action.payload.user) {
        // case: { user, token }
        state.user = action.payload.user;
        state.token = action.payload.token || null;
      } else {
        // case: just user object
        state.user = action.payload;
        state.token = null;
      }
      state.isAuthenticated = true; // ✅ mark logged in
    },

    /**
     * Reducer to handle user logout.
     * Clears user data, token, and sets isAuthenticated flag to false.
     */
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    /**
     * Update specific user profile fields without affecting login status.
     * Example payload: { name: 'New Name', profilePicture: 'url' }
     */
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    /**
     * Initialize session after rehydration (used with redux-persist).
     */
    initializeSession: (state) => {
      // Left intentionally blank — redux-persist will handle state rehydration
    },
  },
});

// Export actions
export const { loginUser, logoutUser, updateUserProfile, initializeSession } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
