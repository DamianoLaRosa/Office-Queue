const SERVER_URL = "http://localhost:3001";

// GET /api/services
const getServices = async () => {
  const response = await fetch(`${SERVER_URL}/api/services`, {
    credentials: "include",
  });

  if (response.ok) {
    const json = await response.json();
    return json; // return raw JSON array of services
  } else {
    throw new Error("Failed to fetch services");
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

const API = { getServices, createTicket };
export default API;
