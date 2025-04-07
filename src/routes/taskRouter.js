import express from 'express';
import { Task } from '../controllers/taskController.js';

export const taskRouter = express.Router();

const task = new Task();

taskRouter
  .route('/tasks')
  .get((req, res) => {
    console.log(req.url);
    const data = task.getAllTasks();
    res.status(200).send(data);
  })
  .post((req, res) => {
    const dataReceived = req.body;
    const newTask = task.createTask(dataReceived);
    res.status(201).send(newTask);
  });

taskRouter
  .route('/tasks/:id')
  .get((req, res) => {
    console.log('req.query.id =>>', req.params);
    const data = task.getTask(parseInt(req.params.id));
    console.log('getData =>>', data);
    res.status(200).send(data);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const data = task.deleteTask(id);
    res.status(200).send(data);
  })
  .put((req, res) => {
    const dataReceived = req.body;
    const newTask = task.updateTask(dataReceived);
    res.status(200).send(newTask);
  });
