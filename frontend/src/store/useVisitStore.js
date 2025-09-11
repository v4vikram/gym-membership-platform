// store/useAuthStore.js
import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export const useVisitStore = create((set) => ({
  visits: null,
  loading: true,
  error: null,

//  --- Get All Visits ---
  getAllVisitsById: async (userId) => {
   
    try {
      const res = await axiosInstance.get(`/visits/user/${userId}`);
      set({
        visits: res.data?.visits || null,
        auth: true,
        loading: false,
      });
      // console.log("visits fetched:", res);
      return res;
    } catch (err) {
      set({
        error: err.response?.data?.errors || "Visits fetching failed",
        loading: false,
      });
      throw err;
    }
  },

}));
