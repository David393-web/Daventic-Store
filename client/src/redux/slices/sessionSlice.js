import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  sessionId: null,
  isAuthenticated: false,
  user: null,
  token: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    initializeSession: (state) => {
      if (!state.sessionId) {
        state.sessionId = uuidv4();
      }
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    clearSessionId: (state) => {
      state.sessionId = null;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  initializeSession,
  setSessionId,
  clearSessionId,
  loginSuccess,
  logout,
} = sessionSlice.actions;

export default sessionSlice.reducer;
