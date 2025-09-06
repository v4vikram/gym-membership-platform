// MembershipModel.js
import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    planCode: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    
    durationDays: { type: Number, required: true },   // For expiry calculation
    durationLabel: {                                  // For human-friendly plan label
      type: String,
      enum: ["monthly", "quarterly", "yearly"],       // Optional restriction
      required: true
    },

    description: { type: String },
    features: { type: [String], default: ["Unlimited gym access"] },
    maxVisits: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
