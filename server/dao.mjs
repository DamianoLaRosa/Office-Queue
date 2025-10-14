import sqlite3 from 'sqlite3';
import { Service,Record_counter,Ticket,Counter,QueueSystem } from './Gmodels.mjs';   
import crypto from 'crypto';

//open database
const db = new sqlite3.Database('OfficeQueue.db', (err) => {
  if (err) throw err;
});

/** SERVICES **/
export const getAllServices = () => {
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
export const insertTicket = (serviceId) => {
  return new Promise((resolve, reject) => {
    
    const sqlService = 'SELECT * FROM services WHERE service_id = ?';
    db.get(sqlService, [serviceId], (err, serviceRow) => { //controll on the existance of service_id
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

export const deleteTicket = (ticketId) => {
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

