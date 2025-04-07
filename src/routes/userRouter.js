import express from 'express';
import { User, UserManager } from '../controllers/userController.js';

export const userRouter = express.Router();
const userManager = new UserManager();

userRouter
  .route('/users')
  .get((req, res) => {
    const users = userManager.getUsers();
    res.status(200).send(users);
  })
  .post((req, res) => {
    const { fname, lname, username, password, email, empId, role } = req.body;
    const userData = new User(fname, lname, username, password, email, empId, role);
    const result = userManager.createUser(userData);
    res.status(201).send(result);
  });

userRouter
  .route('/users/:id')
  .get((req, res) => {
    const id = req.params.id;
    const user = userManager.getUserById(id);
    res.status(200).send(user);
  })
  .put((req, res) => {
    const id = req.params.id;
    const data = req.body;
    const user = userManager.updateUser(id, data);
    res.status(200).send(user);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const user = userManager.deleteUser(id);
    res.status(200).send(user);
  });
