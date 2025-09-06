import asyncHandler from "express-async-handler";
import UserVisit from "../models/UserVisitModel.js";
import UserMembership from "../models/UserMembershipModel.js";
import Gym from "../models/GymModel.js";

// Log user visit
export const logVisit = asyncHandler(async (req, res) => {
  const { gymId } = req.body;
  const userId = req.user.id;

  const membership = await UserMembership.findOne({
    user: userId,
    status: "active",
  });
  if (!membership) {
    return res.status(403).json({ message: "No active membership found" });
  }

  const gym = await Gym.findById(gymId);
  if (!gym) return res.status(404).json({ message: "Gym not found" });

  const visit = await UserVisit.create({ user: userId, gym: gymId });
  res.status(201).json({ message: "Visit logged", visit });
});

// Get all visits
export const getAllVisits = asyncHandler(async (req, res) => {
  const visits = await UserVisit.find()
    .populate("user", "name email")
    .populate("gym", "name location")
    .sort({ checkInTime: -1 });

  res.status(200).json(visits);
});


// Check-in user via QR code
export const checkInUser = asyncHandler(async (req, res) => {
  const { qrData, gymId } = req.body; // gym will send qrData + their gymId

  // 1️⃣ Parse QR data
  let parsed;
  try {
    parsed = JSON.parse(qrData);
  } catch (err) {
    return res.status(400).json({ message: "Invalid QR data" });
  }

  const { userId, userMembershipId } = parsed;
  console.log("userMembershipId", userMembershipId);

  // 2️⃣ Verify membership is active
  const userMembership = await UserMembership.findById(userMembershipId);
  if (!userMembership) {
    return res.status(404).json({ message: "Membership not found" });
  }

  if (userMembership.expiryDate < new Date()) {
    return res.status(403).json({ message: "Membership expired" });
  }

  if (userMembership.status !== "active") {
    return res.status(403).json({ message: "Membership not active" });
  }

  // 3️⃣ Log visit
  const visit = await UserVisit.create({
    user: userId,
    gym: gymId,
    checkInTime: new Date(),
  });

  res.status(201).json({
    message: "Check-in successful",
    visit,
  });
});

// Checkout user from gym
export const checkOutUser = asyncHandler(async (req, res) => {
  const { visitId } = req.body; // frontend must send visitId (or qrData again)

  const visit = await UserVisit.findById(visitId);
  if (!visit) {
    return res.status(404).json({ message: "Visit not found" });
  }

  if (visit.checkOutTime) {
    return res.status(400).json({ message: "User already checked out" });
  }

  visit.checkOutTime = new Date();
  await visit.save();

  res.status(200).json({
    message: "Check-out successful",
    visit,
  });
});


// get visits for a specific user by userId
export const getUserVisits = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const visits = await UserVisit.find({ user: userId }) // ✅ filter by user
    .populate("gym", "name location")
    .sort({ checkInTime: -1 });

  res.status(200).json({
    success: true,
    count: visits.length,
    visits,
  });
});