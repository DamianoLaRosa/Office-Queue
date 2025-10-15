# How to Run Client Application

## Requirements

- Node.js (version 16 or higher)
- npm (usually installed with Node.js)

## Installation

1. Navigate to the client application directory:

   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reload:

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Production Build

To create an optimized production build:

```bash
npm run build
```

Built files will be located in the `dist/` directory.

### Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

### Dependency Issues

If you encounter issues with dependency installation:

```bash
rm -rf node_modules package-lock.json
npm install
```
