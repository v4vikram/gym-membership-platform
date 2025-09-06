import { NextResponse } from "next/server";
import { connectToDB } from "@lib/db"; // your DB connection helper
import Product from "@models/ProductModel"; // your Mongoose model

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Fetch products failed:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
