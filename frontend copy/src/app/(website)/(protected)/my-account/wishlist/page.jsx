"use client";

import { useWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function WishlistPage() {
  const { data: wishlist = [], isLoading } = useWishlist();

  const { mutate: removeItem } = useRemoveFromWishlist({
    onSuccess: (data, variables) => {
      console.log("✅ Removed Item Response:", data);
      console.log("🛠 Removed Product ID:", variables);
      toast.success("Item removed from wishlist");
    },
    onError: (error, variables) => {
      console.error("Remove failed:", error);
      toast.error("Failed to remove item from wishlist");
    },
  });

  return (
    <div className="">
     

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <WishlistSkeleton key={i} />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-muted-foreground text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-4">
          {wishlist.map(({ productId }) => (
            <div
              key={productId?._id}
              className="bg-white dark:bg-zinc-900 shadow-md border border-border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <Link href={`/shop/${productId._id}`} className="flex items-center gap-4">
                {productId?.image && (
                  <Image
                    src={productId?.image}
                    alt={productId?.title}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                )}
                <div>
                  <h4 className="text-lg font-semibold">{productId?.title}</h4>
                  <p className="text-muted-foreground text-sm">{productId?.price} ₹</p>
                </div>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(productId?._id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-md border border-border rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  );
}
