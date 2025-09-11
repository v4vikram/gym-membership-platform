// api/auth.js
import axiosInstance from "@/lib/axiosInstance";

// --- Login ---
export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
  return res.data; // ✅ return only data
};

// --- Register ---
export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
  return res.data; // ✅ return only data
};

// --- Logout ---
export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  return res.data; // ✅ return only data
};


// --- Logout ---
export const getMe = async () => {
  const res = await axiosInstance.get("/auth/me", {}, { withCredentials: true });
  return res.data; // ✅ return only data
};
