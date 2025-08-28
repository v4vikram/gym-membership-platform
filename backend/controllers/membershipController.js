// membershipController.js
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Membership from "../models/MembershipModel.js";
import UserMembership from "../models/UserMembershipModel.js";

// Assign membership to user
export const assignMembership = asyncHandler(async (req, res) => {
  const { userId, membershipId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const membership = await Membership.findById(membershipId);
  if (!membership) return res.status(404).json({ message: "Membership not found" });

  // ✅ calculate expiry date
  let expiryDate = new Date();
  if (membership.duration === "monthly") {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else if (membership.duration === "quarterly") {
    expiryDate.setMonth(expiryDate.getMonth() + 3);
  } else if (membership.duration === "yearly") {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }

  // ✅ match schema field (expiryDate)
  const userMembership = await UserMembership.create({
    user: userId,
    membership: membershipId,
    startDate: new Date(),
    expiryDate, // <-- must match schema
  });

  res.status(201).json({
    message: "Membership assigned successfully",
    userMembership,
  });
});
