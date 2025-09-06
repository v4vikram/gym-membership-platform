
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services_old/productService";

export const useProductsHook = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
