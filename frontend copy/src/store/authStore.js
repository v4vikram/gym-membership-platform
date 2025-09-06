// store/authStore.js
import { create } from "zustand";
import { loginUser, registerUser, logoutUser, getMe } from "@/api/auth";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // --- Login ---
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser(data);
      set({
        user: res.user || null,
        isAuthenticated: true,
        loading: false,
      });
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.errors || "Login failed",
        loading: false,
      });
      throw err;
    }
  },

  // --- Register ---
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await registerUser(data);
      set({
        user: res.user || null,
        isAuthenticated: true,
        loading: false,
      });
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.errors || "Register failed",
        loading: false,
      });
      throw err;
    }
  },

  // --- Logout ---
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await logoutUser();
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Logout failed",
        loading: false,
      });
      throw err;
    }
  },

  // --- GetMe (check session) ---
  getMe: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getMe()
      set({
        user: res.data.user || null,
        isAuthenticated: true,
        loading: false,
      });
      return res.data;
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: "Not authenticated",
      });
      throw err;
    }
  },
}));

export default useAuthStore;
