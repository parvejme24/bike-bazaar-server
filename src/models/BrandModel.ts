import mongoose, { Schema, Document } from "mongoose";

interface IBrand extends Document {
  name: string;
  slug: string;
  description: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema: Schema<IBrand> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model<IBrand>("Brand", BrandSchema);

export default Brand;
