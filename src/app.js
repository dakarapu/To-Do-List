import express from 'express';
import dotenv from 'dotenv';
import { taskRouter } from './routes/taskRouter.js';
import { userRouter } from './routes/userRouter.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', taskRouter);
app.use('/', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  console.log('Home Page');
  res.status(200).send('Welcome to home page');
});
