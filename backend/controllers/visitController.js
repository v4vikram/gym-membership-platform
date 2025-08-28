import asyncHandler from 'express-async-handler';
import UserVisit from '../models/UserVisitModel.js';
import UserMembership from '../models/UserMembershipModel.js';
import Gym from '../models/GymModel.js';

// Log user visit
export const logVisit = asyncHandler(async (req, res) => {
  const { gymId } = req.body;
  const userId = req.user.id; // from JWT middleware

  // Check if user has an active membership
  const membership = await UserMembership.findOne({ user: userId, status: 'active' });
  if (!membership) {
    return res.status(403).json({ message: 'No active membership found' });
  }

  // Check if gym exists
  const gym = await Gym.findById(gymId);
  if (!gym) return res.status(404).json({ message: 'Gym not found' });

  // Log visit
  const visit = await UserVisit.create({ user: userId, gym: gymId });
  res.status(201).json({ message: 'Visit logged', visit });
});

// ========== Visits ============
// Get all visits
export const getAllVisits = asyncHandler(async (req, res) => {
  const visits = await UserVisit.find()
    .populate("user", "name email")
    .populate("gym", "name location");
  res.json(visits);
});
