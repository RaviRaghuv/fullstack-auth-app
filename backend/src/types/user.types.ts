// User response (for API)
export interface UserResponse {
  id: string;
  email: string;
}

// Auth response (for login and register)
export interface AuthResponse {
  user: UserResponse;
  token: string;
} 