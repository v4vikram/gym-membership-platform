import { connectToDB } from "@lib/db";
import { jsonResponse } from "@lib/responseHelpers";
import User from "@models/UserModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectToDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return jsonResponse({ message: "User already exists" }, 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    return jsonResponse({ message: "User Created Successfully", data: newUser }, 201);
  } catch (error) {
    return jsonResponse({ message: "Server error" }, 500);
  }
}
