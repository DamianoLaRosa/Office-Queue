export class Database {
  constructor() {
    this.data = {
      services: [{ service_id: 1, name: 'Service1', avg_service_time: 5, tag: 'A' }],
      tickets: [],
      counters: [{ counter_id: 1, name: 'Counter1' }],
      counter_services: [{ counter_id: 1, service_id: 1 }]
    };
  }

  all(sql, params, callback) {
    // Very naive parsing just for testing
    if (sql.includes('FROM services')) {
      callback(null, this.data.services);
    } else if (sql.includes('FROM counters')) {
      callback(null, this.data.counters);
    } else if (sql.includes('FROM counter_services')) {
      callback(null, this.data.counter_services.filter(cs => cs.counter_id === params[0]));
    } else {
      callback(null, []);
    }
  }

  get(sql, params, callback) {
    if (sql.includes('FROM services WHERE service_id = ?')) {
      const service = this.data.services.find(s => s.service_id === params[0]);
      callback(null, service || null);
    } else if (sql.includes('FROM tickets')) {
      const ticket = this.data.tickets.find(t => t.service_id === params[0]);
      callback(null, ticket || null);
    } else {
      callback(null, null);
    }
  }

  run(sql, params, callback) {
    if (sql.includes('INSERT INTO tickets')) {
      const id = this.data.tickets.length + 1;
      const newTicket = { ticket_id: id, code: params[0], service_id: params[1], name: `Service${params[1]}` };
      this.data.tickets.push(newTicket);
      callback.call({ lastID: id }, null);
    } else if (sql.includes('DELETE FROM tickets')) {
      const index = this.data.tickets.findIndex(t => t.ticket_id === params[0]);
      const changes = index >= 0 ? 1 : 0;
      if (index >= 0) this.data.tickets.splice(index, 1);
      callback.call({ changes }, null);
    }
  }
}
