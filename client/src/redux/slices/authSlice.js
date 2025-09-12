// src/Redux/slices/authSlice.js
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
     * Sets the user data, token, and isAuthenticated flag to true.
     * Expected payload: { user: { id, email, name, accountType }, token: '...' }
     */
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true; // ✅ user is now logged in
    },

    /**
     * Reducer to handle user logout.
     * Clears user data, token, and sets isAuthenticated flag to false.
     */
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // ✅ user logged out
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
     * Usually no explicit logic here because redux-persist rehydrates state.
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
