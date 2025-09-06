"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

async function addToCart(product) {
  console.log("product--", product)
  try {
    await axios.post(
      "/api/cart/add",
      {
        productId: product._id,
        quantity: 1, // or allow custom quantity
      },
      {
        withCredentials: true, // required to send cookie for user
      }
    );

    console.log("Product added to cart");

    // Optionally: fetch latest cart and update state
    // const res = await axios.get("/api/cart", { withCredentials: true });
    // setCart(res.data.cart.items);

  } catch (err) {
    console.error("❌ Cart Add Error:", err); // Detailed log in terminal
    return Response.json(
      { error: err.message || "Something went wrong in /api/cart/add" },
      { status: 500 }
    );
  }
}

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getAllCartProducts = () => cart;

  const getCartCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getAllCartProducts,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
