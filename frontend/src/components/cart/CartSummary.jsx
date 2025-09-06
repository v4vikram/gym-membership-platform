"use client";

import { useCartHook } from "@/hooks/useCartHook";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CartSummary() {
  const { getCartTotal, clearCart, cart } = useCartHook();
  const total = getCartTotal();

  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm p-6 space-y-6">
      <h1 className="text-xl font-semibold">Order Summary</h1>

      {cart.map((item) => (
        <div
          key={item.productId}
          className="flex justify-between items-center gap-4 border-b pb-4 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.image || "https://placehold.co/80"}
              alt={item.title}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-muted-foreground text-sm">
                {item.quantity} × ₹{item.price}
              </p>
            </div>
          </div>
          <span className="font-semibold text-sm">
            ₹{(item.quantity * item.price).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="flex justify-between text-lg font-semibold pt-4 border-t">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <Button className="w-full mt-4" asChild>
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
