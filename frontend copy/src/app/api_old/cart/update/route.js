import { connectToDB } from "@lib/db";
import Cart  from "@models/CartModel";
import { getUserFromToken } from "@lib/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const {id:userId} = await getUserFromToken(req);
    const { productId, quantity } = await req.json();
    console.log("User ID:", userId);

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find((i) => i.productId.equals(productId));
    if (!item) throw new Error("Item not found");

    item.quantity = quantity;
    await cart.save();

    return Response.json({ message: "Quantity updated" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
