"use client";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingBasket, Star } from "lucide-react";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useCartHook } from "@/hooks/useCartHook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAddToWishlist, useWishlist } from "@/hooks/useWishlist";

export const ProductDetail = ({ product }) => {
  const { addToCart } = useCartHook();
  const { user } = useUser();
  const router = useRouter();
  const { data: wishlist = [] } = useWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();
  // const { mutate: removeFromWishlist } = useRemoveFromWishlist();

  const toggleWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/login");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product._id);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = async ({ productId, quantity }) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    try {
      await addToCart({ productId, quantity });
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add to cart");
    }
  };

  const isInWishlist = wishlist.some(
    (item) => item.productId._id === product._id
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <div className="flex items-center gap-2 text-yellow-500">
        <Star size={18} fill="currentColor" />
        <span>{product.rating}</span>
      </div>
      <p className="text-xl text-primary">${product.price.toFixed(2)}</p>
      <p className="text-muted-foreground">{product.description}</p>
      <p className="text-sm">
        <span className="font-semibold">Stock:</span> {product.stock}
      </p>

      <div className="flex items-center gap-x-2">
        <Button
          onClick={(e) => {
            e.preventDefault(); // stop Link navigation
            handleAddToCart({ productId: product._id, quantity: 1 });
          }}
          className="mt-4 bg-neon-green text-black  hover:bg-black hover:text-neon-green cursor-pointer"
        >
          <ShoppingBasket /> Add To Cart
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating to product detail
            toggleWishlist();
          }}
          className="mt-4 bg-black text-neon-green hover:bg-black/90 cursor-pointer"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          Wishlist {isInWishlist ? "❤️" : "🤍"}
        </Button>
      </div>
    </div>
  );
};
