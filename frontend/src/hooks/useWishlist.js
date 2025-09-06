import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/services_old/wishlistService";

// 🧠 Get Wishlist
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });
};

// ➕ Add
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });
};

// ❌ Remove
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });
};
