import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  authenticateUser
} from '../controllers/userController.js';

import { authenticateToken } from '../middlewares/auth.js';

export const userRouter = express.Router();

userRouter.use('/users', authenticateToken);

userRouter.route('/users').get(getUsers);

userRouter.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser);

userRouter.route('/register').post(createUser);

userRouter.route('/auth').post(authenticateUser);
