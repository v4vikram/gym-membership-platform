import express from "express";
import { getProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { logout } from "../controllers/authController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Protected route - for all logged-in users
router.get("/profile", protect, checkRole(['user', 'gym', 'admin']), getProfile);

// ✅ Logout - all roles can log out
router.post("/logout", protect, checkRole(['user', 'gym', 'admin']), logout);

export default router;
