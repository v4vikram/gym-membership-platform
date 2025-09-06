import { connectToDB } from "@lib/db";
import { getUserFromToken } from "@lib/auth";
import Cart from "@models/CartModel";
import { Order } from "@models/OrderModel";

export async function POST(req) {
  try {
    await connectToDB();

    const { id: userId } = await getUserFromToken(req);
    const { shippingInfo, paymentDetails } = await req.json();

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return Response.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id, // Only the ObjectId
      quantity: item.quantity,
    }));

    // return
    const order = await Order.create({
      userId,
      items: orderItems, // ✅ Matches schema
      shippingInfo,
      paymentInfo: paymentDetails,
      totalAmount,
      orderStatus: "Processing",
      placedAt: new Date(),
    });
    cart.items = [];
    await cart.save();

    // ✅ Populate order before returning
const populatedOrder = await Order.findById(order._id).populate("items.productId");

return Response.json({ success: true, order: populatedOrder }, { status: 201 });
  } catch (err) {
    console.error("Order creation error:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
