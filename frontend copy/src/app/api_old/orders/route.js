// /api/orders/route.js (or wherever you're keeping API routes)
import { connectToDB } from "@lib/db";
import { getUserFromToken } from "@lib/auth";
import Product from "@models/ProductModel"
import { Order } from "@models/OrderModel";
import Cart from "@models/CartModel";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectToDB();

    const { id: userId } = await getUserFromToken(req);

    const orders = await Order.find({ userId })
      .populate({
        path:"items.productId",
        model:"Product"
      })
      .sort({ placedAt: -1 }); // latest first

    return Response.json({ success: true, orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    return Response.json({ success: false, message: "Failed to load orders" }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    await connectToDB();
    // ✅ Debug registered models
    console.log("Registered Mongoose models:", mongoose.modelNames());

    const { id: userId } = await getUserFromToken(req);
    const { shippingInfo, billingInfo, paymentDetails } = await req.json();

    console.log("userId", userId)
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
      billingInfo: billingInfo ? billingInfo : shippingInfo,
      totalAmount,
      orderStatus: "Processing",
      placedAt: new Date(),
    });
    console.log("order", order);
    cart.items = [];
    await cart.save();

    // ✅ Populate order before returning
    const populatedOrder = await Order.findById(order._id).populate(
      "items.productId"
    );

    return Response.json(
      { success: true, order: populatedOrder },
      { status: 201 }
    );
  } catch (err) {
    console.error("Fetch orders error:", err);
    return Response.json(
      { success: false, message: "Failed to load orders" },
      { status: 500 }
    );
  }
}

