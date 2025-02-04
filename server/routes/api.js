import express from 'express';
import choresRouter from './chores.js';
import userRouter from './user.js';
import aiRouter from './openAi.js';

const apiRouter = express.Router();

apiRouter.use('/chores', choresRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/ai', aiRouter);

export default apiRouter;
