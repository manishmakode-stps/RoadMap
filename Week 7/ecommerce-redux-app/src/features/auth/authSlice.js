import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "ecommerce-auth-user";

const loadStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const saveStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures and keep Redux as the source of truth.
  }
};

const storedUser = loadStoredUser();

const initialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveStoredUser(action.payload);
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      saveStoredUser(null);
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
