import { QueueSystem, Counter, Service } from "./server/Gmodels.mjs";

// to execute this code commands: node test_models.mjs

const q = new QueueSystem();

// add services (numeric IDs)
q.addService(new Service(1, "Payments", 5));
q.addService(new Service(2, "Information", 3));

// add counters
const c1 = new Counter(1);
c1.addService(1);
c1.addService(2);

const c2 = new Counter(2);
c2.addService(1);

q.addCounter(c1);
q.addCounter(c2);

// clients take tickets
q.issueTicket(1); // service 1
q.issueTicket(2); // service 2
q.issueTicket(1); // another payment

// counters ready
q.callNextClient(1);
q.callNextClient(2);

// manager stats
console.log(q.getStats());
