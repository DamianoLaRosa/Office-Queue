# How to Run Server Application

## Requirements

- Node.js (version 16 or higher)
- npm (usually installed with Node.js)

## Installation

1. Navigate to the server application directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To run the server in development mode with auto-restart:

```bash
nodemon index.mjs
```

The server will be available at: `http://localhost:3001`

### Production Mode

To run the server in production mode:

```bash
node index.mjs
```

## API Endpoints

- `GET /api/services` - Get all available services
- `POST /api/tickets/:serviceId` - Create a new ticket for a specific service

## Database

The server uses SQLite database (`OfficeQueue.db`) with the following tables:

- `services` - Available services with their details
- `tickets` - Created tickets
- `counters` - Service counters
- `counter_services` - Counter-service relationships

## Configuration

- **Port**: 3001 (configurable in `index.mjs`)
- **CORS**: Configured for `http://localhost:5173` (client application)
- **Session**: Express session middleware enabled
- **Authentication**: Passport.js with local strategy

## Troubleshooting

### Dependency Issues

If you encounter issues with dependency installation:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3001 is occupied, modify the port in `index.mjs`:

```javascript
const port = 3002; // Change to available port
```
