import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './user.model';
import { UserType } from './user.interface';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

// Generate tokens
const generateAccessToken = (user: Partial<UserType>) => {
  return jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user: Partial<UserType>) => {
  return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      address,
      city,
      phone,
      role,
      profilePicture,
      gender,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists', success: false });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Define newUser with the correct properties
    const newUser: Partial<UserType> = {
      fullName,
      email,
      password: hashedPassword,
      address,
      city,
      phone,
      role,
      profilePicture,
      gender,
      isActive: true,
    };

    const savedUser = await new User(newUser).save();

    // Create tokens
    const accessToken = generateAccessToken({
      _id: savedUser._id.toString(),
      email: savedUser.email,
    });
    const refreshToken = generateRefreshToken({
      _id: savedUser._id.toString(),
      email: savedUser.email,
    });

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      data: savedUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Registration failed', success: false, error: err });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }

    // Create tokens
    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id.toString(),
      email: user.email,
    });

    res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      tokens: {
        accessToken,
        refreshToken,
      },
      data: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Login failed', success: false, error: err });
  }
};

// Logout user (invalidate tokens client-side; server-side token blacklisting may be added if needed)
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Typically, logout in JWT-based auth is handled client-side by deleting tokens.
    res
      .status(200)
      .json({ message: 'User logged out successfully', success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Logout failed', success: false, error: err });
  }
};

// Get user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ message: 'Email parameter is missing', success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    res.status(200).json({
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving user', success: false, error: err });
  }
};

// Get user by user id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    res.status(200).json({
      message: 'User retrieved successfully',
      success: true,
      data: user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving user', success: false, error: err });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: 'Users retrieved successfully',
      success: true,
      data: users,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving users', success: false, error: err });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true },
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    res.status(200).json({
      message: 'User profile updated successfully',
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating profile', success: false, error: err });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    res
      .status(200)
      .json({ message: 'User deleted successfully', success: true, data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting user', success: false, error: err });
  }
};
