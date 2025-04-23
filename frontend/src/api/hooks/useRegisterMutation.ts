import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../client';
import { AuthResponse, ErrorResponse, RegisterCredentials } from '@/types/api.types';
import { useAuth } from '@/context/AuthContext';

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation<AuthResponse, ErrorResponse, RegisterCredentials>({
    mutationFn: async (credentials) => {
      return authAPI.register(credentials.email, credentials.password);
    },
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
} 