import { connectToDB } from "@lib/db";
import { getUserFromToken } from "@lib/auth";
import Cart from "@models/CartModel";
import {Order} from "@models/OrderModel";


export async function POST(req) {
  try {
    await connectToDB();
    const {id:userId} = await getUserFromToken(req);
    const { shippingInfo, paymentDetails } = await req.json();
    console.log("User ID:", userId);

    // return

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    // Save order
    const order = await Order.create({
      userId,
      items: cart.items,
      shippingInfo,
      paymentInfo: paymentDetails,
      totalAmount,
      orderStatus: "Processing",
      placedAt: new Date(),
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    return Response.json({ message: "Order placed", order });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
