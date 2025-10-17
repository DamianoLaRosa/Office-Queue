import { Service,Ticket,Counter } from './Gmodels.mjs';   
import crypto from 'crypto';

/** SERVICES **/
export const getAllServices = (db) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM services';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const services = rows.map(row => new Service(row.service_id, row.name, row.avg_service_time, row.tag));
      return resolve(services);
    });
  });
};


/** TICKETS **/
export const insertTicket = (serviceId, db) => {
  return new Promise((resolve, reject) => {
    
    const sqlService = 'SELECT * FROM services WHERE service_id = ?';
    db.get(sqlService, [serviceId], (err, serviceRow) => { //control on the existance of service_id
      if (err) return reject(err);
      if (!serviceRow) return resolve({ error: 'Service not found' });

      const sqlInsert = 'INSERT INTO tickets (code,service_id) VALUES (?, ?)';
        db.run(sqlInsert, [serviceRow.tag , serviceId], function (err) {
          if (err) return reject(err);
          return resolve(new Ticket(this.lastID, serviceRow.name, serviceId));
        });
    });
  });
};

export const deleteTicket = (ticketId, db) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM tickets WHERE ticket_id = ?';
    db.run(sql, [ticketId], function(err) {
      if (err) {
        return reject(err);
      }
      // this.changes = number of rows eliminated
      if (this.changes === 0) {
        return resolve({ error: 'Ticket not found' });
      }
      return resolve({ success: true });
    });
  });
};

/*COUNTERS*/
//get all counters
export const getAllCounters=(db)=>{
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM counters';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      const counters = rows.map(row => new Counter(row.counter_id, row.name));
      return resolve(counters);
    });
  });
};

//find service assigned to counter
export const getServiceByCounter = (counterId, db) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT service_id
                 FROM counter_services
                 WHERE counter_id = ?`;
    db.all(sql, [counterId], (err, rows) => {
      if (err) {
        return reject(err);
      }
       if (rows.length === 0) {
        return resolve([]);
      }
      const services = rows.map(row => row.service_id);
      return resolve(services);
    });
  });
};

//get longest queue and select next ticket
export const getLongestQueue = (serviceIds, db) => {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT t.service_id, s.name, s.avg_service_time, COUNT(t.service_id) as queue_length
        FROM tickets t
        JOIN services s ON t.service_id = s.service_id
        WHERE t.service_id IN (${serviceIds.join(',')})
        GROUP BY t.service_id
        ORDER BY queue_length DESC, s.avg_service_time ASC
        LIMIT 1
      `;

    db.get(sql, [], (err, row) => {
      if (err) {
        return reject(err);
      } 
      if(!row){
        return resolve({ error: 'Ticket not found for the given services' }); // No tickets found for the given services
      }

      const query = `SELECT * FROM tickets WHERE service_id = ? ORDER BY ticket_id ASC LIMIT 1`;
      db.get(query, [row.service_id], (err, ticketRow) => {
        if (err) {
          return reject(err);
        }
        if (!ticketRow) {
          return resolve({ error: 'Ticket not found' }); // No waiting ticket found for the longest queue
        }
        return resolve(ticketRow);
      });
    });
  });
};
