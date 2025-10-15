import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest'; // for HTTP request testing
import sqlite3 from 'sqlite3';

import { getAllServices, insertTicket, deleteTicket, getServiceByCounter, getLongestQueue, getAllCounters } from '../dao.mjs';

// ======================
// Mock DB
// ======================
class MockDB {
  constructor() {
    this.services = [{ service_id: 1, name: 'Service1', avg_service_time: 5, tag: 'A' }];
    this.tickets = [];
    this.counters = [{ counter_id: 1, name: 'Counter1' }];
    this.counter_services = [{ counter_id: 1, service_id: 1 }];
  }

  all(sql, params, callback) {
    if (sql.includes('FROM services')) callback(null, this.services);
    else if (sql.includes('FROM counters')) callback(null, this.counters);
    else if (sql.includes('FROM counter_services')) callback(null, this.counter_services);
    else callback(null, []);
  }

  get(sql, params, callback) {
  if (sql.includes('JOIN services')) {
        // Return a dummy row indicating there is a ticket in the queue
        const ticket = this.tickets[0];
        if (!ticket) return callback(null, null);
        const service = this.services.find(s => s.service_id === ticket.service_id);
        callback(null, {
        service_id: ticket.service_id,
        name: service.name,
        avg_service_time: service.avg_service_time,
        queue_length: 1
        });
  } else if (sql.includes('ORDER BY ticket_id ASC LIMIT 1')) {
      // Return the actual ticket object
      const ticket = this.tickets.find(t => t.service_id === params[0]);
      callback(null, ticket || null);
  } else if (sql.includes('WHERE service_id = ?')) {
      const service = this.services.find(s => s.service_id === params[0]);
      callback(null, service || null);
  } else {
      callback(null, null);
  }
  }


  run(sql, params, callback) {
    if (sql.startsWith('INSERT INTO tickets')) {
      const ticket = { ticket_id: this.tickets.length + 1, service_id: params[1], code: params[0] };
      this.tickets.push(ticket);
      callback.call({ lastID: ticket.ticket_id }, null);
    } else if (sql.startsWith('DELETE')) {
      const index = this.tickets.findIndex(t => t.ticket_id === params[0]);
      if (index >= 0) {
        this.tickets.splice(index, 1);
        callback.call({ changes: 1 }, null);
      } else callback.call({ changes: 0 }, null);
    } else callback.call({ changes: 0 }, null);
  }
}

// ======================
// Setup Express App
// ======================
function createApp(db) {
  const app = express();
  app.use(express.json());

  app.get('/api/services', async (req, res) => {
    const services = await getAllServices(db);
    res.json(services);
  });

  app.get('/api/counters', async (req, res) => {
    const counters = await getAllCounters(db);
    res.json(counters);
  });

  app.post('/api/tickets/:serviceId', async (req, res) => {
    const result = await insertTicket(parseInt(req.params.serviceId), db);
    res.status(result.error ? 404 : 201).json(result);
  });

  app.post('/api/counters/:counterId/next-ticket', async (req, res) => {
    const serviceIds = await getServiceByCounter(parseInt(req.params.counterId), db);
    if (serviceIds.length === 0) return res.status(404).json({ error: 'No services assigned' });

    const nextTicket = await getLongestQueue(serviceIds, db);
    if (nextTicket.error) return res.status(404).json(nextTicket);

    const deleteResult = await deleteTicket(nextTicket.ticket_id, db);
    if (deleteResult.error) return res.status(404).json(deleteResult);

    res.json(nextTicket);
  });

  return app;
}

// ======================
// Tests
// ======================
const mockDb = new MockDB();
const app = createApp(mockDb);

test('GET /api/services', async () => {
  const res = await request(app).get('/api/services');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.length, 1);
  assert.strictEqual(res.body[0].name, 'Service1');
});

test('GET /api/counters', async () => {
  const res = await request(app).get('/api/counters');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.length, 1);
  assert.strictEqual(res.body[0].name, 'Counter1');
});

test('POST /api/tickets/:serviceId creates a ticket', async () => {
  const res = await request(app).post('/api/tickets/1');
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.service_id, 1);
});

test('POST /api/counters/:counterId/next-ticket serves a ticket', async () => {
  // first create a ticket
  await request(app).post('/api/tickets/1');
  const res = await request(app).post('/api/counters/1/next-ticket');
  console.log(res.body);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.service_id, 1);
});
