"use client";
import { Button } from "@/components/ui/button";
import { useCartHook } from "@/hooks/useCartHook";
import { useState } from "react";

export default function CartItem({ item }) {
  console.log("CartItem", item);
  const {removeFromCart, addToCart, updateQuantity}  = useCartHook()

  return (
    <div className="flex gap-4 items-center border-b py-4">
      <img src={item.image} alt={item.title} className="w-20 h-20 rounded" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.title}</h3>
        <p>${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button onClick={() => updateQuantity({productId:item.productId, quantity:item.quantity - 1})} disabled={item.quantity === 1} className={'h-6 w-6 p-0 text-black bg-neon-green hover:bg-neon-green hover:text-black cursor-pointer'}>
            -
          </Button>
          <span>{item.quantity}</span>
          <Button onClick={() => updateQuantity({productId:item.productId, quantity:item.quantity + 1})} disabled={item.quantity >= item.stock} className={'"h-6 w-6 p-0 text-black bg-gray hover:text-black hover:bg-gray cursor-pointer'}>
            +
          </Button>
        </div>
      </div>
      <div>
        <Button variant="destructive" onClick={() => removeFromCart(item.productId)}>
          Remove
        </Button>
      </div>
    </div>
  );
}
