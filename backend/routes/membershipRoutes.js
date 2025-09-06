import express from "express";
import { assignMembership, createRazorpayOrder, getAllUsersWithMemberships, getUserActiveMembership } from "../controllers/membershipController.js";

const router = express.Router();

router.post("/payments/create-order", createRazorpayOrder);
router.post("/assign", assignMembership);
router.get("/all", getAllUsersWithMemberships);
router.get("/:id", getUserActiveMembership);

export default router;
