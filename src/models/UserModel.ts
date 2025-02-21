import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// user interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  comparePassword(inputPassword: string): Promise<boolean>;
}

// user schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// password hashing before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password comparison method
userSchema.methods.comparePassword = function (
  inputPassword: string
): Promise<boolean> {
  return bcrypt.compare(inputPassword, this.password);
};

// user model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
