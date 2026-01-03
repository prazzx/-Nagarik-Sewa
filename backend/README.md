# Nagarik Sewa Backend

Express.js + MongoDB backend for the Nagarik Sewa government services portal.

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas)

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/nagarik_sewa
PORT=5000
```

4. Seed the database with initial data:
```bash
npm run seed
```

5. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/:id/info` - Get detailed service info

### Eligibility
- `GET /api/services/:serviceId/eligibility` - Get eligibility questions for a service

### Documents
- `GET /api/services/:serviceId/documents` - Get required documents for a service

### Procedures
- `GET /api/services/:serviceId/procedures` - Get procedure steps for a service

### Costs
- `GET /api/services/:serviceId/cost` - Get cost and time info for a service

### Forms
- `GET /api/services/:serviceId/forms` - Get downloadable forms for a service

### Districts & Municipalities
- `GET /api/districts` - Get all districts with municipalities

### Offices
- `GET /api/offices` - Get all offices
- `GET /api/offices?serviceId=citizenship` - Get offices filtered by service
