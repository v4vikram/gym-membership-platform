import { connectToDB } from "@lib/db";
import { jsonResponse } from "@lib/responseHelpers";
import User from "@models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use env var in production
const JWT_EXPIRES_IN = "7d"; // Token valid for 7 days

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return jsonResponse({ message: "Email and password are required" }, 400);
    }

    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return jsonResponse({ message: "User not found" }, 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return jsonResponse({ message: "Invalid credentials" }, 401);
    }

    // Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return jsonResponse(
      {
        message: "Login successful",
        data: {
          user: userWithoutPassword,
          token,
        },
      },
      200
    );
  } catch (error) {
    console.error("Login error:", error);
    return jsonResponse({ message: "Server error" }, 500);
  }
}
