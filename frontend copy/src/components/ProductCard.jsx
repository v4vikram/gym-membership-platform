import { useUser } from "@/context/UserContext";
import { useCartHook } from "@/hooks/useCartHook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  useWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/hooks/useWishlist";
import { Eye, ShoppingBasket } from "lucide-react";

export const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCartHook();
  const { user } = useUser();
  const router = useRouter();

  const { data: wishlist = [] } = useWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();
  const { mutate: removeFromWishlist } = useRemoveFromWishlist();


  const isInWishlist = wishlist.some(
    (item) => item.productId._id === product._id
  );

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

  return (
    <div>
      <Card className="rounded-xl shadow hover:shadow-md transition relative">
        <div className="relative w-[350px] h-[220px] mx-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            title={product.title}
            className="w-full h-full object-contain m-auto"
          />
        </div>

        {/* ❤️ Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating to product detail
            toggleWishlist();
          }}
          className="absolute top-3 right-3 text-xl text-red-500 hover:scale-110 transition"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>

        <CardContent className="p-4">
          <CardTitle className="text-lg">{product.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs mt-2">{product.description}</p>
          <div className="flex gap-x-2">
            <Button
              onClick={(e) => {
                e.preventDefault(); // stop Link navigation
                handleAddToCart({ productId: product._id, quantity: 1 });
              }}
              className="mt-4 bg-black text-neon-green hover:text-black hover:bg-neon-green/90 cursor-pointer"
            >
              <ShoppingBasket /> Add To Cart
            </Button>
            <Link
              href={`/shop/${product._id}`}
              className="flex items-center gap-x-1 cursor-pointer"
            >
              <Button
                className={
                  "mt-4 bg-neon-green text-black hover:text-neon-green hover:bg-black cursor-pointer"
                }
              >
                <Eye /> View
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
