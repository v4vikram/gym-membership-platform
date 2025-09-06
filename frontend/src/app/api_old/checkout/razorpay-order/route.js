import Razorpay from "razorpay";
import { getUserFromToken } from "@lib/auth";
import { connectToDB } from "@lib/db";

export async function POST(req) {
  try {
    await connectToDB();
    const {id:userId} = await getUserFromToken(req);
    const { amount } = await req.json(); // amount in rupees

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      notes: {
        userId,
      },
    };

    const order = await instance.orders.create(options);

    return Response.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
