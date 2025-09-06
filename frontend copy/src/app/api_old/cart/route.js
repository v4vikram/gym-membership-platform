// app/api/cart/route.js

import { connectToDB } from "@lib/db"; // MongoDB connection utility
import Cart from "@models/CartModel"; // Mongoose model for Cart
import Product from "@models/ProductModel"; // Mongoose model for Product
import { getUserFromToken } from "@lib/auth"; // Auth utility to extract user from cookie or token

export async function GET(req) {
  try {
    // 1. Connect to MongoDB
    await connectToDB();

    // 2. Get the logged-in user from token or cookie
    const user = await getUserFromToken(req);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Fetch the user's cart and populate the productId field
    const cart = await Cart.findOne({ userId: user.id })
      .populate("items.productId") // Populate product details for each item
      .lean(); // Convert Mongoose document to plain JS object

    // 4. If cart doesn't exist, return empty array
    if (!cart) {
      return Response.json({ cart: { items: [] } }, { status: 200 });
    }

    // 5. Log and filter out any items with missing product references
    for (const item of cart.items) {
      if (!item.productId) {
        console.log("⚠️ Missing productId for item:", item); // Possible orphaned cart item
      } else {
        console.log("✅ product:", item.productId.title); // Successfully populated product
      }
    }

    // 6. Prepare cleaned and structured data for the frontend
    const cleanedItems = cart.items
      .filter((item) => item.productId) // Exclude broken references
      .map((item) => ({
        productId: item?.productId?._id,
        title: item?.productId?.title,
        price: item?.productId?.price,
        image: item?.productId?.image,
        quantity: item?.quantity,
        stock: item?.productId?.stock, // Include stock information
      }));

    // 7. Return cleaned cart items to frontend
    return Response.json({ cart: { items: cleanedItems } }, { status: 200 });

  } catch (error) {
    // 8. Catch unexpected errors and return 500 response
    console.error("🛑 Cart Fetch Error:", error);
    return Response.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
