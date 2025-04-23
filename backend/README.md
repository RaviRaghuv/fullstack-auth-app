# Backend - Auth App

Node.js + Express + Prisma backend for the authentication application.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- JSON Web Token (JWT)
- Bcrypt for password hashing
- Zod for validation

## Project Structure

- `src/controllers`: Business logic for API endpoints
- `src/routes`: API route definitions
- `src/middleware`: Express middleware (auth, validation, error handling)
- `src/utils`: Utility functions
- `src/types`: TypeScript type definitions
- `src/prisma`: Prisma schema and migrations

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables by creating a `.env` file:
```
DATABASE_URL="file:./dev.db"  # SQLite for development
JWT_SECRET="your-secret-key"  # Replace with a secure random string
PORT=5000
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/users/register`: Register a new user
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt-token", "user": { "id": "user-id", "email": "user@example.com" } }`

- `POST /api/users/login`: Login an existing user
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt-token", "user": { "id": "user-id", "email": "user@example.com" } }`

- `GET /api/users/me`: Get current user information (requires authentication)
  - Headers: `{ "Authorization": "Bearer jwt-token" }`
  - Response: `{ "user": { "id": "user-id", "email": "user@example.com" } }`

## Database

The application uses Prisma with a SQLite database by default. The schema includes a User model with email and password fields. 