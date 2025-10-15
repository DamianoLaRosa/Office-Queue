"use strict";

/*BASIC CLASSES TO TEST*/

// Service type definition
export function Service(service_id, name, avg_service_time,tag) {
  this.service_id = service_id;      
  this.name = name;   
  this.avg_service_time = avg_service_time;   
  this.tag=tag;
}

// Record that tracks how many customers a counter has served per service type
export function Record_counter(type, count = 0) {
  this.type = type;   // service type ID
  this.count = count; // number of customers served
}

// Ticket issued to a client
export function Ticket(ticket_id, service_name, service_id) {
  this.ticket_id = ticket_id;                  
  this.service_name = service_name; 
  this.service_id = service_id; 
}

// Counter (desk)
export function Counter(counter_id,name) {
  this.name=name;
  this.counter_id = counter_id;
  this.types_service = []; // array of Record_counter objects, one per supported service

  // add a service type that this counter can handle
  this.addService = (service_id) => {
    this.types_service.push(new Record_counter(service_id, 0));
  };

}
