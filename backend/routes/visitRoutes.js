import express from 'express';
import { getAllVisits, logVisit } from '../controllers/visitController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const router = express.Router();


// Visits
router.get('/', getAllVisits);

// User scans QR at Gym
router.post('/', authMiddleware, logVisit);

export default router;
