import express from 'express';
import {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask
} from '../controllers/taskController.js';

export const taskRouter = express.Router();

taskRouter.route('/tasks').get(getTasks).post(createTask);
taskRouter.route('/tasks/:id').get(getTask).delete(deleteTask).put(updateTask);
