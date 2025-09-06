import { NextResponse } from "next/server";
import { connectToDB } from "@lib/db";
import { Order } from "@models/OrderModel";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await connectToDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Order ID" },
      { status: 400 }
    );
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ Populate order before returning
    const populatedOrder = await Order.findById(order._id).populate({
      path: "items.productId",
      model: "Product",
    });

    return NextResponse.json(
      { success: true, order: populatedOrder },
      { status: 201 }
    );
  } catch (err) {
    console.error("GET order error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
