import { useState, useCallback } from 'react';
import { authService } from '@/lib/auth/auth.service';
import type { LoginCredentials, RegisterData } from '@/types/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}