import mongoose, { Types } from "mongoose";
import { connectToDB } from "@lib/db";
import Cart from "@models/CartModel";
import Product from "@models/ProductModel"; // ✅ Import Product model
import { getUserFromToken } from "@lib/auth";

export async function POST(req) {
  try {
    await connectToDB();

    const user = await getUserFromToken(req);
    const { productId, quantity } = await req.json();

    if (!productId || typeof quantity !== "number" || quantity < 1) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const objectId = Types.ObjectId.createFromHexString(productId);

    // ✅ Fetch product to get current stock
    const product = await Product.findById(objectId);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Get user's cart
    let cart = await Cart.findOne({ userId: user.id });

    let existingQty = 0;

    if (!cart) {
      // ✅ If no cart, just check if requested quantity is within stock
      if (quantity > product.stock) {
        console.error("Requested quantity exceeds available stock");
        return Response.json({ error: "Cannot add more than available stock" }, { status: 400 });
      }

      cart = await Cart.create({
        userId: user.id,
        items: [{ productId: objectId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex((item) => {
        return String(item.productId) === productId;
      });

      if (itemIndex > -1) {
        existingQty = cart.items[itemIndex].quantity;

        if (existingQty + quantity > product.stock) {
          return Response.json({ error: "Quantity exceeds available stock" }, { status: 400 });
        }

        cart.items[itemIndex].quantity += quantity;
      } else {
        if (quantity > product.stock) {
          return Response.json({ error: "Cannot add more than available stock" }, { status: 400 });
        }

        cart.items.push({ productId: objectId, quantity });
      }

      await cart.save();
    }

    return Response.json({ message: "Item added", cart });

  } catch (err) {
    console.error("🛑 Add to Cart Error:", err);
    return Response.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
