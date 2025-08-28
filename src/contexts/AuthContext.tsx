import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { generateDummyData } from '../utils';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (check localStorage or cookie)
    const savedUser = localStorage.getItem('medconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyData = generateDummyData();
      const foundUser = [...dummyData.patients, ...dummyData.doctors].find(
        u => u.email === email
      ) as User;

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('medconnect_user', JSON.stringify(foundUser));
      } else {
        // Create a default patient user for demo
        const defaultUser: User = {
          id: 'demo_user',
          email,
          firstName: 'Demo',
          lastName: 'User',
          phone: '+63 917 123 4567',
          role: 'patient',
          isVerified: true,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150'
        };
        setUser(defaultUser);
        localStorage.setItem('medconnect_user', JSON.stringify(defaultUser));
      }
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        role: userData.role || 'patient',
        isVerified: false,
        specialization: userData.specialization,
        licenseNumber: userData.licenseNumber
      };

      setUser(newUser);
      localStorage.setItem('medconnect_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medconnect_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
