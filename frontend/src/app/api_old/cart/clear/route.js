import { connectToDB } from "@lib/db";
import Cart  from "@models/CartModel";
import { getUserFromToken } from "@lib/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const {id:userId} = await getUserFromToken(req);

    await Cart.findOneAndUpdate({ userId }, { items: [] });

    return Response.json({ message: "Cart cleared" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
