import axiosInstance from "@/utils/axiosInstance";


export const fetchProducts = async () => {
  const res = await axiosInstance.get("/api/products");
  return res.data.data; // Adjust based on your actual API structure
};

export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`/api/products/${id}`);
  return res.data.data;
};

// Add other product-related API methods here if needed
