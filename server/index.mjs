// import
import express from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import {getAllServices,insertTicket} from './dao.mjs';
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
    //maybe you pass to the client only name of the service and the waiting time
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// activate server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });