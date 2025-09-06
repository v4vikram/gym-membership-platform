import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCart,
  addToCartAPI,
  removeFromCartAPI,
  clearCartAPI,
  updateCartQuantityAPI,
} from "@/services_old/cartService";

export const useCartHook = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const cart = query.data || [];

const { mutateAsync: addToCart, isPending: isAdding } = useMutation({
  mutationFn: addToCartAPI,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
});

  const { mutate: removeFromCart, isPending: isRemoving } = useMutation({
    mutationFn: removeFromCartAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const { mutate: clearCart, isPending: isClearing } = useMutation({
    mutationFn: clearCartAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const { mutate: updateQuantity, isPending: isUpdating } = useMutation({
    mutationFn: updateCartQuantityAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  return {
    ...query,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    isAdding,
    isRemoving,
    isClearing,
    isUpdating,
    getCartCount,
    getCartTotal,
  };
};
