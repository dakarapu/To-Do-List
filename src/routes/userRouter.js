import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.route('/users').get(getUsers).post(createUser);

userRouter.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser);
