// membershipController.js
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Membership from "../models/MembershipModel.js";
import UserMembership from "../models/UserMembershipModel.js";
import razorpay from "../config/razorpay.js";

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

  if (activeMembership) {
    return res.status(400).json({
      message: "User already has an active membership",
      activeMembership,
    });
  }

  // 4️⃣ Calculate expiry date dynamically
  let expiryDate = new Date();
  switch (membership.duration) {
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
    paymentStatus: paymentStatus || "pending", // ✅ New field
  });

  res.status(201).json({
    message: "Membership assigned successfully",
    userMembership,
  });
});





export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { membershipId, userId } = req.body;
  console.log("req.body:", req.body);

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const membership = await Membership.findById(membershipId);
  if (!membership) return res.status(404).json({ message: "Membership not found" });


  const options = {
    amount: membership.price * 100, // amount in paise
    currency: membership.currency || "INR",
    receipt: `membership_${membership._id}_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.status(201).json({ order, membership });
});




// Get all users with their memberships
export const getAllUsersWithMemberships = asyncHandler(async (req, res) => {
  const usersWithMemberships = await UserMembership.find()
    .populate("user", "name email") // fetch user details
    .populate("membership", "name price duration description"); // fetch membership details

  res.json(usersWithMemberships);
});


