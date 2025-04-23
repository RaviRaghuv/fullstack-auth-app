import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../client';
import { AuthResponse, ErrorResponse, LoginCredentials } from '@/types/api.types';
import { useAuth } from '@/context/AuthContext';

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation<AuthResponse, ErrorResponse, LoginCredentials>({
    mutationFn: async (credentials) => {
      return authAPI.login(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
} 