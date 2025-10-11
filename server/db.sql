
--Table: services
CREATE TABLE IF NOT EXISTS services (
    service_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    avg_service_time INTEGER NOT NULL, -- in minutes
    tag TEXT UNIQUE NOT NULL
);

--Table: counters
CREATE TABLE IF NOT EXISTS counters (
    counter_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

--Table: counter_services 
CREATE TABLE IF NOT EXISTS counter_services (
    id INTEGER PRIMARY KEY,
    counter_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    FOREIGN KEY (counter_id) REFERENCES counters(counter_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);

--Table: tickets
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    service_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
