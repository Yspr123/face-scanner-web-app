import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { LoginRequest, SignupRequest, LoginResponse } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedEmail = localStorage.getItem('user_email');
    
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await api.post<LoginResponse>('/login', credentials);
      const { access_token } = response.data;
      
      setToken(access_token);
      setUserEmail(credentials.email);
      
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_email', credentials.email);
      
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
    } catch (error: any) {
      const message = error.response?.data?.msg || 'Login failed';
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (data: SignupRequest) => {
    try {
      await api.post('/signup', data);
      toast({
        title: "Account Created!",
        description: "Please log in with your new account.",
      });
    } catch (error: any) {
      const message = error.response?.data?.msg || 'Signup failed';
      toast({
        title: "Signup Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout request failed, but clearing local state');
    } finally {
      setToken(null);
      setUserEmail(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      
      toast({
        title: "Goodbye!",
        description: "You've been logged out successfully.",
      });
    }
  };

  const value = {
    token,
    userEmail,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};