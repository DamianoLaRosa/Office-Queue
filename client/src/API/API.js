const SERVER_URL = "http://localhost:3001";

// GET /api/services
const getServices = async () => {
  const response = await fetch(`${SERVER_URL}/api/services`, {
    credentials: "include",
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Failed to fetch services");
  }
};

//  GET /api/counters
const getCounters = async () => {
  const response = await fetch(`${SERVER_URL}/api/counters`, {
    credentials: "include",
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw new Error("Failed to fetch counters");
  }
};

// POST /api/counters/:counterId/next-ticket
const getNextTicketForCounter = async (counterId) => {
  const response = await fetch(
    `${SERVER_URL}/api/counters/${counterId}/next-ticket`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (response.ok) {
    const json = await response.json();
    return json;
  } else if (response.status === 404) {
    const err = await response.json();
    throw new Error(err.error || "Counter not found");
  } else {
    throw new Error("Failed to fetch next ticket for counter");
  }
};

// POST /api/tickets/:serviceId
const createTicket = async (serviceId) => {
  const response = await fetch(`${SERVER_URL}/api/tickets/${serviceId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (response.ok) {
    const json = await response.json();
    return json; // return raw JSON ticket object
  } else if (response.status === 404) {
    const err = await response.json();
    throw new Error(err.error || "Service not found");
  } else {
    throw new Error("Failed to create ticket");
  }
};

const API = { getServices, createTicket, getCounters, getNextTicketForCounter };
export default API;
