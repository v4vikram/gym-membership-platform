import { connectToDB } from "@lib/db";
import User from "@models/UserModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const user = await User.findOne({
      emailToken: token,
      tokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    user.emailVerified = true;
    user.emailToken = undefined;
    user.tokenExpires = undefined;
    await user.save();

    return NextResponse.redirect("http://localhost:3000/login?verified=1");
  } catch (error) {
    console.error("Email verify error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
