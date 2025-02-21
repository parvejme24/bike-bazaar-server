import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
  },
  { timestamps: true },
);

export const User = model('User', UserSchema);
