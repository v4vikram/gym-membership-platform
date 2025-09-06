// UserVisitModel.js
import mongoose from 'mongoose';

const userVisitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date, default: null },
}, { timestamps: true });

const UserVisit = mongoose.model('UserVisit', userVisitSchema);
export default UserVisit;
