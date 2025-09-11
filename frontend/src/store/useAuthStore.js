// store/useAuthStore.js
import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  auth: false,
  error: null,

  // --- Login ---
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({
        user: res.user || null,
        auth: true,
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
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({
        user: res.data?.user || null,
        auth: true,
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
      const res = await axiosInstance.post("/user/logout");
      set({
        user: null,
        auth: false,
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

  getMe: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");

      set({
        auth: true,
        user: res.data.user, // ✅ keep the user object
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        auth: false,
        user: null,
        loading: false,
        error: err.response?.data?.message || err.message, // ✅ store error
      });

      console.error("Error fetching user:", err.response?.data || err.message);
    }
  },


}));
