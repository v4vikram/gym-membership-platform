import mongoose from "mongoose";

const userMembershipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    membership: { type: mongoose.Schema.Types.ObjectId, ref: "Membership", required: true },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" }, // ✅ more robust
    amountPaid: { type: Number, required: true },
    paymentId: { type: String }, // Razorpay or Stripe payment ID
    paymentStatus: { type: String, enum: ["pending", "success", "failed"], default: "pending" }, // ✅ track payment status
  },
  { timestamps: true } // ✅ will store createdAt and updatedAt automatically
);

const UserMembership = mongoose.model("UserMembership", userMembershipSchema);
export default UserMembership;


