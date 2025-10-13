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
      const services = rows.map(row => new Service(row.service_id, row.name, row.avg_service_time));
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

      // Calculate waiting time
      const sqlWaiting = 'SELECT COUNT(*) AS count FROM tickets WHERE service_id = ?';
      db.get(sqlWaiting, [serviceId], (err, countRow) => {
        if (err) return reject(err);

        //problem: I need statistics , see formula
        const waitingTime = (countRow.count + 0.5) * serviceRow.time;

        const sqlInsert = 'INSERT INTO tickets(service_id, waiting_time) VALUES (?, ?, ?)';
        db.run(sqlInsert, [serviceId, waitingTime], function (err) {
          if (err) return reject(err);
          return resolve(new Ticket(this.lastID, serviceId, serviceRow.name , waitingTime));
        });
      });
    });
  });
};
