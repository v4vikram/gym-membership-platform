// MembershipModel.js
import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g., 'monthly'
  description: { type: String },
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;
