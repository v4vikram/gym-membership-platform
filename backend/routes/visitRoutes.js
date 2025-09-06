import express from "express";
import {
  getAllVisits,
  logVisit,
  getUserVisits,
  checkInUser,
  checkOutUser,
} from "../controllers/visitController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin/debug
router.get("/", getAllVisits);

// user: log a visit (gym check-in)
router.post("/", protect, logVisit);

// Visit history for a user
router.get("/user/:userId", protect, getUserVisits);

// Check-in user via QR code
router.post("/check-in", protect, checkInUser);

router.post("/check-out", protect, checkOutUser);



export default router;
