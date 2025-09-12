import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { errorResponse } from "../utils/response.js"

// Signup
export const signup = asyncHandler(async (req, res) => {
  console.log("req.body", req.body)
  const { name, email, password, agreeTerms } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ errors: { email: "Email already exists" } });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword, agreeTerms });

  res.status(201).json({
    message: "User registered successfully",
    user: { id: user._id, name: user.name, email: user.email }
  });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // Send token as HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,          // must be true with SameSite=None
    sameSite: "None",      // capital N sometimes works better
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
});

export const getMe = asyncHandler(async (req, res) => {
  console.log("getMe called", req.cookies);
  const token = req.cookies.token;
  if (!token) return errorResponse(res, "Not authenticated", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});


// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};


