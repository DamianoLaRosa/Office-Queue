// import
import express from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import {getAllServices,insertTicket,deleteTicket,getServiceByCounter,getLongestQueue} from './dao.mjs';
import { Service,Record_counter,Ticket,Counter,QueueSystem } from './Gmodels.mjs';   
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173', //controll if client server is on this port
  optionsSuccessState: 200,
  credentials: true
};

app.use(cors(corsOptions));

/* ROUTES */

// GET /api/services
app.get('/api/services', async (req, res) => {
  try {
    const services = await getAllServices();
    return res.status(200).json(services); 
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tickets/:serviceId
app.post('/api/tickets/:serviceId', async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const result = await insertTicket(serviceId);

    if (result.error) {
      return res.status(404).json(result); // Service not found
    }

    return res.status(201).json(result); // Ticket created
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// POST /api/counters/:counterId/next-ticket
app.post('/api/counters/:counterId/next-ticket', async (req, res) => {
  try {
    const counterId = req.params.counterId;
    
    const serviceIds = await getServiceByCounter(counterId); // Find all services assigned to the counter

    if (serviceIds.length === 0) {
      return res.status(404).json({ error: 'No services assigned to this counter' });
    }

    const nextTicket = await getLongestQueue(serviceIds); // Find the next ticket to serve

    if (nextTicket.error) {
      return res.status(404).json(nextTicket); // No ticket found for the given services
    }

    const deleteResult = await deleteTicket(nextTicket.ticket_id); // Delete the selected ticket

    if (deleteResult.error) {
      return res.status(404).json(deleteResult); // Ticket not found (should be rare)
    }

    return res.status(200).json(nextTicket); // Respond with the ticket that was served

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});




// activate server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });