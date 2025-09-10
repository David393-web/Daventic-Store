import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  sessionId: null,
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
    },
  },
});

export const { initializeSession, setSessionId, clearSessionId } = sessionSlice.actions;
export default sessionSlice.reducer;
