import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// user interface
export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image?: string;
  address?: {
    country?: string;
    division?: string;
    district?: string;
    subDistrict?: string;
    postOffice?: number;
    detailsAddress?: string;
  };
  phone?: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// user schema
const userSchema: Schema<IUser> = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `u${Math.floor(100000 + Math.random() * 900000)}`;
      },
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    image: { type: String },
    address: {
      country: { type: String },
      division: { type: String },
      district: { type: String },
      subDistrict: { type: String },
      postOffice: { type: Number },
      detailsAddress: { type: String },
    },
    phone: { type: Number },
  },
  {
    timestamps: true,
  }
);

// password hashing middleware
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password comparison method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// user model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
