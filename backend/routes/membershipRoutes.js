import express from "express";
import { assignMembership } from "../controllers/membershipController.js";

const router = express.Router();

router.post("/assign", assignMembership);

export default router;
