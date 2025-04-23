# Frontend - Auth App

React + TypeScript frontend for the authentication application.

## Tech Stack

- React
- TypeScript
- React Query for data fetching and state management
- React Hook Form for form handling
- Zod for schema validation
- React Router DOM for routing

## Project Structure

- `src/components`: UI and auth components
- `src/hooks`: Custom hooks
- `src/api`: API integration with React Query
- `src/utils`: Utility functions and validation schemas
- `src/types`: TypeScript type definitions
- `src/pages`: Page components
- `src/context`: Context providers (Auth)
- `src/assets`: Static assets and styles

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following content:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

This will create optimized production build in the `dist` directory.

## Features

- User registration with email/password
- User login
- Protected routes
- Form validation
- Error handling
- API integration with React Query
- Type-safe API responses

## Integration with Backend

The frontend connects to the backend through API calls. The backend API endpoints are:

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login an existing user
- `GET /api/users/me`: Get current user information (authenticated) 