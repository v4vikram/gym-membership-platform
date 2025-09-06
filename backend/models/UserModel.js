// models/User.js
// Purpose: User model for all roles (Admin, Gym Owner, Regular User)
// This single schema handles authentication & role-based access for the platform

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    agreeTerms: {
      type: Boolean,
      default: false,
      required: true
    },

    // 🔑 Role management (user | gym | admin)
    role: {
      type: String,
      enum: ['user', 'gym', 'admin'],
      default: 'user'
    },
    qrCode: { type: String },

    // 🔗 Optional link to gym (if role === "gym")
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gym',
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
