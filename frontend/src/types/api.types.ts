// User type
export interface User {
  id: string;
  email: string;
}

// Auth response types
export interface AuthResponse {
  token: string;
  user: User;
}

// Error response from API
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register credentials
export interface RegisterCredentials {
  email: string;
  password: string;
} 