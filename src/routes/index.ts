import { Router } from 'express';
import { addSports } from './Sports';


const sportRouter = Router();
sportRouter.post('/addSports', addSports);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/sports', sportRouter);
export default baseRouter;
