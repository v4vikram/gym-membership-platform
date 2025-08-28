// GymModel.js
import mongoose from 'mongoose';

const gymSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  qrCode: { type: String, unique: true }, // generated dynamically
  contactInfo: { type: String },
}, { timestamps: true });

const Gym = mongoose.model('Gym', gymSchema);
export default Gym;
