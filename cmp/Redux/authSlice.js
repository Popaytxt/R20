// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
    },
    initializeAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated, setUnauthenticated, initializeAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

