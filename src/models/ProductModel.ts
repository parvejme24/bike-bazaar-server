import mongoose, { Schema, Document } from "mongoose";

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface IProduct extends Document {
  productId: string;
  name: string;
  brand: string;
  productModel: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  images: string;
  rating: number;
  reviews: number;
  weight: number;
  dimensions: Dimensions;
  isFeatured: boolean;
  isDiscounted: boolean;
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `p${Math.floor(100000 + Math.random() * 900000)}`;
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    productModel: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      required: true,
    },
    dimensions: {
      length: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
