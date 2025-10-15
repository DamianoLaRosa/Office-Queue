import { Service, Record_counter, Ticket, Counter } from "../models/Gmodels.mjs";

const SERVER_URL = "http://localhost:3001";

//TO USE API COPY THE NEXT LINE IN YOUR CODE:
// import API from "../API/API.mjs"; 
// const v = await API.getServices(); remember to put it in a try{}catch(){}

// GET /api/services
const getServices = async () => {
  const response = await fetch(`${SERVER_URL}/api/services`, {
    credentials: 'include',
  });

  if (response.ok) {
    const json = await response.json();
    return json.map(s => new Service(s.service_id,s.name, s.avg_service_time, s.tag)); //array of services
  } else {
    throw new Error('Failed to fetch services');
  }
};


// POST /api/tickets/:serviceId
const createTicket = async (serviceId) => {
  const response = await fetch(`${SERVER_URL}/api/tickets/${serviceId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  });

  if (response.ok) {
    const json = await response.json();
    return new Ticket(json.ticket_id, json.service_name, json.service_id);

  } else if (response.status === 404) {
    const err = await response.json();
    throw new Error(err.error || 'Service not found');
    
  } else {
    throw new Error('Failed to create ticket');
  }
};


const API = { getServices, createTicket };
export default API;