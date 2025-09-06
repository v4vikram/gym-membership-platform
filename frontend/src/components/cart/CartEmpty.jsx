import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CartEmpty = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-x-2">
        <h1 className="text-3xl font-bold text-black">Your cart is empty</h1>
        <ShoppingCart className="text-black" />
      </div>
      <p className="text-gray-600">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link href="/shop">
        <Button>Shop Now</Button>
      </Link>
    </div>
  );
};

export default CartEmpty;
