import User from "@models/UserModel";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return Response.json({ user });
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
