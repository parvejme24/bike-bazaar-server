import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUserProfile,
  deleteUser,
} from './user.controller';

const userRouter = Router();

// Register a new user
userRouter.post('/register', registerUser);

// Login a user
userRouter.post('/login', loginUser);

// Logout a user
userRouter.post('/logout', logoutUser);

// Get a user by email
userRouter.get('/email/:email', getUserByEmail);

// Get a user by ID
userRouter.get('/users/:userId', getUserById);

// Get all users
userRouter.get('/users', getAllUsers);

// Update a user profile
userRouter.put('/users/:userId', updateUserProfile);

// Delete a user
userRouter.delete('/users/:userId', deleteUser);

export default userRouter;
