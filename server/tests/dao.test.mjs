import test from 'node:test';
import assert from 'node:assert/strict';
import * as Gmodels from '../Gmodels.mjs';
import * as Dao from '../dao.mjs';

// Mock sqlite3 Database
import sqlite3 from 'sqlite3';

class MockDB {
  constructor() {
    this.data = {
      services: [{ service_id: 1, name: 'Service1', avg_service_time: 5, tag: 'A' }],
      tickets: [],
      counters: [{ counter_id: 1, name: 'Counter1' }],
      counter_services: [{ counter_id: 1, service_id: 1 }],
    };
  }

  all(sql, params, callback) {
    if (sql.includes('SELECT * FROM services')) {
      callback(null, this.data.services);
    } else if (sql.includes('FROM counters')) {
      callback(null, this.data.counters);
    } else if (sql.includes('FROM counter_services')) {
      callback(null, this.data.counter_services);
    } else {
      callback(null, []);
    }
  }

  get(sql, params, callback) {
    if (sql.includes('WHERE service_id = ?')) {
      const service = this.data.services.find(s => s.service_id === params[0]);
      callback(null, service || null);
    } else if (sql.includes('ORDER BY ticket_id ASC LIMIT 1')) {
      callback(null, this.data.tickets[0] || null);
    } else {
      callback(null, null);
    }
  }

  run(sql, params, callback) {
    if (sql.startsWith('INSERT INTO tickets')) {
      const ticket = { ticket_id: this.data.tickets.length + 1, service_id: params[1], code: params[0] };
      this.data.tickets.push(ticket);
      callback.call({ lastID: ticket.ticket_id }, null);
    } else if (sql.startsWith('DELETE')) {
      const index = this.data.tickets.findIndex(t => t.ticket_id === params[0]);
      if (index >= 0) {
        this.data.tickets.splice(index, 1);
        callback.call({ changes: 1 }, null);
      } else {
        callback.call({ changes: 0 }, null);
      }
    } else {
      callback.call({ changes: 0 }, null);
    }
  }
}

// Replace the real db with mock
const db = new MockDB();

test('getAllServices returns all services', async () => {
  const services = await Dao.getAllServices(db);
  assert.strictEqual(services.length, 1);
  assert.strictEqual(services[0].name, 'Service1');
});

test('insertTicket adds a new ticket', async () => {
  const ticket = await Dao.insertTicket(1, db);
  assert.strictEqual(ticket.service_id, 1);
  assert.strictEqual(ticket.ticket_id, 1);
});

test('deleteTicket removes a ticket', async () => {
  await Dao.insertTicket(1, db); // add ticket
  const result = await Dao.deleteTicket(1, db);
  assert.deepStrictEqual(result, { success: true });
});

test('getAllCounters returns counters', async () => {
  const counters = await Dao.getAllCounters(db);
  assert.strictEqual(counters.length, 1);
  assert.strictEqual(counters[0].name, 'Counter1');
});

test('getServiceByCounter returns service IDs', async () => {
  const services = await Dao.getServiceByCounter(1, db);
  assert.deepStrictEqual(services, [1]);
});
