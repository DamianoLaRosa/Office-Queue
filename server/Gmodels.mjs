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















/*QUEUE SYSTEM  NOT TO TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

export function QueueSystem() {
  this.services = [];        // list of all service types
  this.counters = [];        // list of all counters
  this.queues = {};          // map of { service_id: [ticket1, ticket2, ...] }
  this.ticketCounter = 0;    // progressive counter to generate unique ticket IDs

  // add a new service type to the system
  this.addService = (service) => {
    this.services.push(service);
    this.queues[service.id] = [];
  };

  // add a new counter to the system
  this.addCounter = (counter) => {
    this.counters.push(counter);
  };

  // reset all queues (called every morning)
  this.resetQueues = () => {
    for (const s in this.queues) {
      this.queues[s] = [];
    }
  };

  // issue a new ticket for a given service type
  this.issueTicket = (service_id) => {
    const service = this.services.find(s => s.id === service_id);
    if (!service) throw new Error("Service not found");

    const number_people_ahead = this.queues[service_id].length;
    const waiting_time = this.computeWaitingTime(service_id, number_people_ahead);

    const ticketCode = `${service.id}${this.ticketCounter + 1}`;
    const ticket = new Ticket(++this.ticketCounter, service_id, ticketCode, waiting_time);
    this.queues[service_id].push(ticket);

    this.notifyDisplay(ticket);
    return ticket;
  };

  // compute estimated waiting time using the given formula
  this.computeWaitingTime = (service_id, number_people_ahead) => {
    const service = this.services.find(s => s.id === service_id);
    const S_over_k_sum = this.counters.reduce((sum, c) => {
      const rec = c.types_service.find(t => t.type === service_id);
      if (!rec) return sum; // this counter doesn’t handle that service
      const k = rec.count === 0 ? 1 : rec.count;
      return sum + 1 / k;
    }, 0);

    if (S_over_k_sum === 0) return 0; // no counter handles this service

    const waiting_time = service.time * ((number_people_ahead / S_over_k_sum) + 0.5);
    return Math.round(waiting_time * 10) / 10; // rounded to one decimal
  };

  // when a counter is ready, select the next client to serve
  this.callNextClient = (counter_id) => {
    const counter = this.counters.find(c => c.id === counter_id);
    if (!counter) throw new Error("Counter not found");

    // find all queues this counter can handle
    const availableQueues = counter.types_service
      .map(s => ({
        service_id: s.type,
        queue: this.queues[s.type] || [],
        service_time: this.services.find(x => x.id === s.type)?.time || Infinity
      }))
      .filter(q => q.queue.length > 0);

    if (availableQueues.length === 0) return null; // all queues empty

    // 1️⃣ choose the longest queue
    const maxLength = Math.max(...availableQueues.map(q => q.queue.length));
    const longestQueues = availableQueues.filter(q => q.queue.length === maxLength);

    // 2️⃣ if multiple queues have same length, choose the one with the lowest service time
    const selectedQueue = longestQueues.reduce((prev, curr) =>
      curr.service_time < prev.service_time ? curr : prev
    );

    // 3️⃣ remove the first ticket from that queue
    const ticket = selectedQueue.queue.shift();
    counter.incrementServiceCount(selectedQueue.service_id);

    this.notifyDisplay(ticket, counter);
    return ticket;
  };

  // display system notifications (mock)
  this.notifyDisplay = (ticket, counter = null) => {
    if (counter) {
      console.log(`▶️ Ticket ${ticket.service_code} called to counter ${counter.id}`);
    } else {
      console.log(`🆕 New ticket issued: ${ticket.service_code}, estimated wait: ${ticket.waiting_time} min`);
    }
    this.showQueueLengths();
  };

  // display current queue lengths (mock)
  this.showQueueLengths = () => {
    console.log("📊 Current queue status:");
    for (const s in this.queues) {
      console.log(` - ${s}: ${this.queues[s].length} people waiting`);
    }
  };

  // generate daily/weekly/monthly stats for the manager
  this.getStats = () => {
    const totalPerService = {};
    const perCounter = {};

    this.counters.forEach(c => {
      perCounter[c.id] = {};
      c.types_service.forEach(ts => {
        perCounter[c.id][ts.type] = ts.count;
        totalPerService[ts.type] = (totalPerService[ts.type] || 0) + ts.count;
      });
    });

    return {
      totalPerService,
      perCounter,
    };
  };
}
