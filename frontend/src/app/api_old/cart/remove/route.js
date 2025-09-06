import { connectToDB } from "@lib/db";
import Cart from "@models/CartModel";
import { getUserFromToken } from "@lib/auth";


export async function POST(req) {

  try {
    await connectToDB();
    const {id:userId} = await getUserFromToken(req);
    console.log("User ID:", userId);
    // return
    const { productId } = await req.json();
    console.log("productId:", productId);

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();

    return Response.json({ message: "Item removed from cart" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
