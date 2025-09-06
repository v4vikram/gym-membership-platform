// membershipController.js
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Membership from "../models/MembershipModel.js";
import UserMembership from "../models/UserMembershipModel.js";
import razorpay from "../config/razorpay.js";
import mongoose from "mongoose";
import QRCode from "qrcode";


// Assign membership to user
export const assignMembership = asyncHandler(async (req, res) => {
  const { userId, membershipId, paymentId, paymentStatus } = req.body;

  // 1️⃣ Check if user exists
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // 2️⃣ Check if membership exists
  const membership = await Membership.findById(membershipId);
  if (!membership)
    return res.status(404).json({ message: "Membership not found" });

  // 3️⃣ Check if user already has active membership
  const activeMembership = await UserMembership.findOne({
    user: userId,
    expiryDate: { $gte: new Date() },
  });

  // if (activeMembership) {
  //   return res.status(400).json({
  //     message: "User already has an active membership",
  //     activeMembership,
  //   });
  // }

  // 4️⃣ Calculate expiry date dynamically
  let expiryDate = new Date();
  switch (membership.durationLabel) {
    case "monthly":
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      break;
    case "quarterly":
      expiryDate.setMonth(expiryDate.getMonth() + 3);
      break;
    case "yearly":
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      break;
    default:
      return res.status(400).json({ message: "Invalid membership duration" });
  }

  // 5️⃣ Create user membership record
  const userMembership = await UserMembership.create({
    user: userId,
    membership: membershipId,
    startDate: new Date(),
    expiryDate,
    amountPaid: membership.price,
    paymentId: paymentId || null,
    paymentStatus: paymentStatus || "pending",
  });

  // 6️⃣ Generate QR code containing membership data
  const qrData = JSON.stringify({
    userId,
    membershipId: membershipId,
    userMembershipId: userMembership._id,
    expiryDate,
    status: "active",
  });

  console.log("Generated QR Data:", qrData);


  const qrCode = await QRCode.toDataURL(qrData);

  // Optional: Save QR code to user profile or membership record
  await User.findByIdAndUpdate(userId, { qrCode });

  res.status(201).json({
    message: "Membership assigned successfully + QR generated",
    userMembership,
    qrCode, // 👈 Send to frontend so user can display it immediately
  });
});


export const createRazorpayOrder = asyncHandler(async (req, res) => {
  console.log("working createRazorpayOrder route")
  const { membershipId, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const membership = await Membership.findById(membershipId);
  console.log("membership", membership);

  if (!membership)
    return res.status(404).json({ message: "Membership not found" });

  const options = {
    amount: membership.price * 100, // amount in paise
    currency: membership.currency || "INR",
    receipt: `mem_${membership._id.toString().slice(-5)}_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json({ order, membership });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
});


// Get all users with their memberships
export const getAllUsersWithMemberships = asyncHandler(async (req, res) => {
  const usersWithMemberships = await UserMembership.find()
    .populate("user", "name email") // fetch user details
    .populate("membership", "name price duration description"); // fetch membership details

  res.json(usersWithMemberships);
});

// Get active membership of a user by ID
export const getUserActiveMembership = asyncHandler(async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const activeMembership = await UserMembership.findOne({
    user: new mongoose.Types.ObjectId(id),
    // status: "active", // ✅ ensure only active memberships
    // expiryDate: { $gte: new Date() }, // ✅ still valid
  })
    .populate("user", "name email qrCode")
    .populate("membership", "name price durationDays description");

  console.log("Found membership:", activeMembership);

  if (!activeMembership) {
    return res.status(404).json({ message: "No active membership found" });
  }

  res.json(activeMembership);
});


export const verifyQRCode = asyncHandler(async (req, res) => {
  const { qrData } = req.body; // QR data sent from frontend scanner
  let parsedData;

  try {
    parsedData = JSON.parse(qrData);
  } catch (error) {
    return res.status(400).json({ message: "Invalid QR data" });
  }

  const { userId, membershipId, userMembershipId, expiryDate } = parsedData;

  // 1️⃣ Check if user membership exists in DB
  const userMembership = await UserMembership.findById(userMembershipId)
    .populate("membership user");

  if (!userMembership) {
    return res.status(404).json({ message: "Membership not found" });
  }

  // 2️⃣ Check if still active
  if (userMembership.expiryDate < new Date()) {
    return res.status(403).json({ message: "Membership expired" });
  }

  if (userMembership.status !== "active") {
    return res.status(403).json({ message: "Membership is not active" });
  }

  // ✅ Membership is valid
  res.status(200).json({
    success: true,
    message: "QR code verified successfully",
    user: userMembership.user,
    membership: userMembership.membership,
  });
});


