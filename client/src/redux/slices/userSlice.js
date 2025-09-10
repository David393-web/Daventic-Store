// src/Redux/slices/authSlice.js (Recommended name for consistency)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores { id, email, name, accountType }
  token: null,
  isAuthenticated: false, // Explicitly tracks authentication status
};

const authSlice = createSlice({ // Renamed slice for clarity in the whole app
  name: "auth", // Slice name 'auth' is common for authentication
  initialState,
  reducers: {
    // This is your 'login' action
    loginUser: (state, action) => {
      state.user = action.payload.user; // Expects action.payload.user to be the user object
      state.token = action.payload.token;
      state.isAuthenticated = true; // Set to true on login
    },
    // This is your 'logout' action
    logoutUser: (state) => { // Renamed from 'logout' for consistency with Redux flow
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Set to false on logout
    },
    // Optional: if you need to just update user info without changing auth status/token
    updateUserProfile: (state, action) => {
        if (state.user) {
            state.user = { ...state.user, ...action.payload };
        }
    },
    // The `initializeSession` action from before for persistence
    initializeSession: (state) => {
        // Redux-persist handles actual hydration. This action serves as a trigger point.
    }
  },
});

// Exporting actions with the updated names
export const { loginUser, logoutUser, updateUserProfile, initializeSession } = authSlice.actions;
export default authSlice.reducer;