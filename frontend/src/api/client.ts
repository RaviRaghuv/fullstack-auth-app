import { User } from '../types/api.types';

// API base URL
const API_BASE_URL = '/api';

// Default headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to get auth header
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch function with error handling
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API error: ${response.status} ${response.statusText}`
      );
    }
    
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI<{ token: string; user: User }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    
  register: (email: string, password: string) =>
    fetchAPI<{ token: string; user: User }>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    
  getCurrentUser: () =>
    fetchAPI<{ user: User }>('/users/me', {
      headers: getAuthHeader(),
    }),
};

export default { authAPI }; 