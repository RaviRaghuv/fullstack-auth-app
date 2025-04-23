import { useQuery } from '@tanstack/react-query';
import { authAPI } from '../client';
import { User, ErrorResponse } from '@/types/api.types';
import { useAuth } from '@/context/AuthContext';

export function useUserQuery() {
  const { isAuthenticated } = useAuth();

  return useQuery<{ user: User }, ErrorResponse>({
    queryKey: ['user'],
    queryFn: () => authAPI.getCurrentUser(),
    enabled: isAuthenticated,
  });
} 