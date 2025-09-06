// store/useAuthStore.js
import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";

export const useGymStore = create((set) => ({
  gyms: null,
  loading: true,
  error: null,

  getAllGym: async () => {
    try {
      const res = await axiosInstance.get("/admin/gyms");

      set({
        gyms: res.data || null,
        loading: false,
      });
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.errors || "Gyms fetching failed",
        loading: false,
      });
      throw err;
    }
  },
  searchGym: async (query) => {
    try {
      const res = await axiosInstance.get(`admin/gyms/search?${query}`);

      console.log("Search gyms response:", res);

      set({
        gyms: res.data.gyms || null,
        loading: false,
      });
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.errors || "Gyms fetching failed",
        loading: false,
      });
      throw err;
    }
  },
}));
