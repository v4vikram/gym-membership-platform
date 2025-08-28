// UserMembershipModel.js
import mongoose from 'mongoose';

const userMembershipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership', required: true },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  status: { type: String, default: 'active' },
}, { timestamps: true });

const UserMembership = mongoose.model('UserMembership', userMembershipSchema);
export default UserMembership;
