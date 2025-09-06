import { connectToDB } from "@lib/db";
import { jsonResponse } from "@lib/responseHelpers";
import User from "@models/UserModel";
import bcrypt from "bcryptjs";
import { getUserFromToken } from "@lib/auth";

export async function GET(req) {
  try {
    const { id: userId } = await getUserFromToken(req);
    if (!userId) {
      return jsonResponse({ message: "Unauthorized" }, 401);
    }

    await connectToDB();

    const getUser = await User.findById(userId).select("name email");
    if (!getUser) {
      return jsonResponse({ message: "User not found" }, 404);
    }

    return jsonResponse({message:"User Fetched Successfully", data: getUser }, 200);


  } catch (error) {
    return jsonResponse({ message: "Server error" }, 500);
  }
}

export async function PUT(req) {
  try {
    await connectToDB(); // ✅ connect first

    const { id: userId } = await getUserFromToken(req);
    if (!userId) {
      return jsonResponse({ message: "Unauthorized" }, 401);
    }

    const { name, email, password } = await req.json();
    if (!name || !email ) {
      return jsonResponse(
        { message: "Name and email are required" },
        400
      );
    }

    console.log("password", password);
    // Optional password update with validation
    let hashedPassword;
    if (password) {
      if (password.length < 6) {
        return jsonResponse(
          { message: "Password must be at least 6 characters long" },
          400
        );
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateFields = {
      name,
      email,
    };

    if (password) {
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    }).select("name email password");

    if (!updatedUser) {
      return jsonResponse({ message: "User not found" }, 404);
    }

    return jsonResponse(
      { message: "User updated successfully", data: updatedUser },
      200
    );
  } catch (error) {
    console.error("Update error:", error);
    return jsonResponse({ message: "Server error" }, 500);
  }
}
