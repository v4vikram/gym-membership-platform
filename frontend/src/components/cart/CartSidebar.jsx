// components/CartSidebar.jsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { useCartHook } from "@/hooks/useCartHook";



export default function CartSidebar({ getCartCountTotal, cart, getCartTotal }) {
  const [open, setOpen] = useState(false);
  const { updateQuantity, removeFromCart } = useCartHook(); // Assuming you have a custom hook for cart operations
  // const { getAllCartProducts, getCartCount, removeFromCart, getCartTotal } =
  //   useCart();

  // const cartItems = getAllCartProducts();
  // const totalQuantity = getCartCount();
  // const totalPrice = getCartTotal();

  return (
  <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <button
      onClick={() => setOpen(true)}
      className="relative text-white hover:text-neon-green transition-colors duration-200 cursor-pointer"
    >
      <ShoppingCart size={22} className="text-neon-green" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
        {getCartCountTotal > 0 ? getCartCountTotal : "0"}
      </span>
    </button>
  </SheetTrigger>

  <SheetContent side="right" className="w-[360px] sm:w-[400px] p-4 bg-black text-white">
    <SheetTitle className="text-neon-green text-lg font-semibold mb-2">Your Cart</SheetTitle>
    <SheetDescription className="sr-only">Items in your shopping cart</SheetDescription>

    {cart.length > 0 ? (
      <>
        <ul className="space-y-4 overflow-y-auto max-h-[60vh] pr-1">
          {cart.map((item) => (
            <li
              key={item?.productId}
              className="border-b border-gray-800 pb-3 flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm text-white">{item?.title}</div>
                <div className="text-xs text-gray-400">Qty: {item?.quantity}</div>
                {item?.price && (
                  <div className="text-sm text-gray-300 mt-1">
                    ₹{item?.price} × {item?.quantity}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 text-black bg-neon-green hover:bg-neon-green hover:text-black cursor-pointer"
                    onClick={() =>
                      updateQuantity({
                        productId: item?.productId,
                        quantity: item?.quantity - 1,
                      })
                    }
                    disabled={item?.quantity === 1}
                  >
                    -
                  </Button>
                  <span className="text-sm">{item?.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 w-6 p-0 text-black bg-gray hover:text-black hover:bg-gray cursor-pointer"
                    onClick={() =>
                      updateQuantity({
                        productId: item?.productId,
                        quantity: item?.quantity + 1,
                      })
                    }
                    disabled={item?.quantity >= item?.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item?.productId)}
                className="text-red-500 hover:text-red-400 transition"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-right font-semibold text-neon-green text-base">
          Total: ₹{getCartTotal()}
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href="/cart"
            className="flex-1 bg-neon-green text-black py-2 rounded hover:bg-neon-green/80 text-center text-sm font-medium"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            className="flex-1 bg-white text-black py-2 rounded hover:bg-gray-200 text-center text-sm font-medium"
          >
            Checkout
          </Link>
        </div>
      </>
    ) : (
      <div className="text-sm text-gray-400 text-center mt-10">
        Your cart is empty.
      </div>
    )}
  </SheetContent>
</Sheet>
  );
}
