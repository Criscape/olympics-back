import { Router } from 'express';
import { addCountries } from './Countries';
import { addEvents } from './Events';
import { addMedals } from './Medals';
import { addSports, getSports } from './Sports';


const sportRouter = Router();
sportRouter.post('/addSports', addSports);
sportRouter.get('/getSports', getSports);

const eventRouter = Router();
eventRouter.post('/addEvents', addEvents);

const countryRouter = Router();
countryRouter.post('/addCountries', addCountries);

const medalRouter = Router();
medalRouter.post('/addMedals', addMedals);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/sports', sportRouter);
baseRouter.use('/events', eventRouter);
baseRouter.use('/countries', countryRouter);
baseRouter.use('/medals', medalRouter);
export default baseRouter;
