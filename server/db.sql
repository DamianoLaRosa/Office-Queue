
--Table: services
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY,
    counter_id INTEGER,
    name TEXT NOT NULL,
    avg_service_time INTEGER NOT NULL, -- in minutes
    tag TEXT UNIQUE NOT NULL,
    FOREIGN KEY (counter_id) REFERENCES counters(id) ON DELETE SET NULL
);

--Table: counters
CREATE TABLE IF NOT EXISTS counters (
    id INTEGER PRIMARY KEY,
    count INTEGER NOT NULL,
    name TEXT NOT NULL
);

--Table: tickets
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    code TEXT UNIQUE NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
