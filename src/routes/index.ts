import { Router } from 'express';
import { addEvents } from './Events';
import { addSports } from './Sports';


const sportRouter = Router();
sportRouter.post('/addSports', addSports);

const eventRouter = Router();
eventRouter.post('/addEvents', addEvents);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/sports', sportRouter);
baseRouter.use('/events', eventRouter);
export default baseRouter;
