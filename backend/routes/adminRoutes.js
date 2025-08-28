import express from 'express';
import { 
  getAllUsers,
  getAllGyms,
  getAllMemberships,
  createMembership,
  updateMembership,
  deleteMembership,
  createGym,
  updateGym,
  deleteGym
} from '../controllers/adminController.js';

const router = express.Router();

// Users
router.get('/users', getAllUsers);

// Gyms
router.get('/gyms', getAllGyms);
router.post('/gyms', createGym);
router.put('/gyms/:id', updateGym);
router.delete('/gyms/:id', deleteGym);



// Membership CRUD
router.get('/memberships', getAllMemberships);
router.post('/memberships', createMembership);
router.put('/memberships/:id', updateMembership);
router.delete('/memberships/:id', deleteMembership);




export default router;
