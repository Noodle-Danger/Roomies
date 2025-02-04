import express from 'express';
import choresRouter from './chores.js';
import userRouter from './user.js';
import userPerksRouter from './userPerks.js';
import perksRouter from './perks.js';
import aiRouter from './openAi.js';

const apiRouter = express.Router();

apiRouter.use('/chores', choresRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/userPerks', userPerksRouter);
apiRouter.use('/perks', perksRouter);
apiRouter.use('/ai', aiRouter);

export default apiRouter;
