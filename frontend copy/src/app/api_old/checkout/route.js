import { connectToDB } from "@lib/db";
import { getUserFromToken } from "@lib/auth";
import Cart from "@models/CartModel";
import Razorpay from "razorpay";


// Create Razorpay order
export async function POST(req) {
  await connectToDB();
  const { id: userId } = await getUserFromToken(req);
  const body = await req.json();

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0)
    return Response.json({ error: "Cart is empty" }, { status: 400 });

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  // Create Razorpay order
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: totalAmount * 100, // in paise
    currency: "INR",
    receipt: `receipt_order_${Math.random() * 1000}`,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  return Response.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
  });
}

