import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Gym from "../models/GymModel.js";
import Membership from "../models/MembershipModel.js";
import UserVisit from "../models/UserVisitModel.js";
import UserMembership from "../models/UserMembershipModel.js";

// ========== Users ============
// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // hide password
  res.json(users);
});

// ========== Members ============
// Get all memberships
export const getAllMemberships = asyncHandler(async (req, res) => {
  const memberships = await Membership.find();
  res.json(memberships);
});

// Create Membership
export const createMembership = asyncHandler(async (req, res) => {
  const {
    name,
    planCode,
    price,
    currency = "INR",
    durationDays,
    description,
    durationLabel,
    features = ["Unlimited gym access"],
    maxVisits = null,
    isActive = true,
  } = req.body;

  // ✅ Check required fields
  if (!name || !planCode || !price || !durationDays) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // ✅ Create membership
  const membership = await Membership.create({
    name,
    planCode,
    price,
    currency,
    durationDays,
    description,
    features,
    maxVisits,
    isActive,
    durationLabel,
  });

  res.status(201).json({
    message: "Membership plan created successfully",
    membership,
  });
});

// Update Membership
export const updateMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!membership)
    return res.status(404).json({ message: "Membership not found" });
  res.json(membership);
});

// Delete Membership
export const deleteMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findByIdAndDelete(req.params.id);
  if (!membership)
    return res.status(404).json({ message: "Membership not found" });
  res.json({ message: "Membership deleted successfully" });
});

// ========== Gyms ============
// Get all gyms
export const getAllGyms = asyncHandler(async (req, res) => {
  const gyms = await Gym.find();
  res.json(gyms);
});

// Create Gym
export const createGym = asyncHandler(async (req, res) => {
  const { name, location, contactInfo } = req.body;

  // Optional: generate QR code for gym
  const qrCode = `${name}-${Date.now()}`; // simple QR code placeholder

  const gym = await Gym.create({ name, location, contactInfo, qrCode });
  res.status(201).json(gym);
});

// Update Gym
export const updateGym = asyncHandler(async (req, res) => {
  const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!gym) return res.status(404).json({ message: "Gym not found" });
  res.json(gym);
});

// Delete Gym
export const deleteGym = asyncHandler(async (req, res) => {
  const gym = await Gym.findByIdAndDelete(req.params.id);
  if (!gym) return res.status(404).json({ message: "Gym not found" });
  res.json({ message: "Gym deleted successfully" });
});

// search gyms by name or location
export const searchGyms = asyncHandler(async (req, res) => {
  const { q } = req.query; // ✅ single query param
  console.log("Search gyms with:", q);

  let filter = {};

  if (q) {
    filter = {
      $or: [
        { name: { $regex: q, $options: "i" } },     // match gym name
        { location: { $regex: q, $options: "i" } }, // match location
      ],
    };
  }

  const gyms = await Gym.find(filter);

  res.json({
    success: true,
    count: gyms.length,
    gyms,
  });
});




