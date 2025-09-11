// store/useUserMemberStore.js
import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useUserMemberStore = create((set) => ({
  loading: true,
  error: null,
  membership: null,

  getUserMembershipById: async (userId) => {

      console.log("Fetching membership for userId:", userId); // 🔥 log

    try {
      const res = await axiosInstance.get(`/memberships/${userId}`);

      set({
        membership: res.data.membership,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        membership: null,
        loading: false,
        error: err.response?.data?.message || err.message, // ✅ store error
      });

      console.error("Error fetching user:", err.response?.data || err.message);
    }
  }
}));
