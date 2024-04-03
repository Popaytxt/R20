// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { initializeAuth } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Initialize the auth state based on stored values (true/false)
const initialAuthState = false; // Replace with your logic to get initial auth state from storage
store.dispatch(initializeAuth(initialAuthState));

export default store;

