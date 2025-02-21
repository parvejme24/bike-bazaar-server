import mongoose, { Document, Schema, Model } from "mongoose";

// product interface
export interface IProduct extends Document {
  name: string;
  brand: string;
  modelName: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  availability: boolean;
}

// product schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// product model
const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
export default ProductModel;
