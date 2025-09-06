"use client";

import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCartHook } from "@/hooks/useCartHook";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, clearCart } = useCartHook();

  return (
    <div className="container mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center">
      {cart.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
              {cart.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
              <Button
                onClick={() => clearCart()}
                className="mt-4 flex items-center"
              >
                <Trash2 />
                Clear Cart
              </Button>
            </div>

            {/* Cart Summary */}
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
