import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = `${import.meta.env.VITE_HOST_POST}/api`;

type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (credential: string, refreshToken: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  updateUser: (userId: number, data: any) => Promise<void>;
  user: any;
  session: boolean;
  loading: boolean;
  error: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [session, setSession] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const decodedToken = token ? jwtDecode(token) as { exp: number } : null;
        const currentTime = Date.now() / 1000;
        if (decodedToken && decodedToken.exp < currentTime) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          setSession(false);
          setUser(null);
          setLoading(false);
          return;
        }
        if (token) {
          setSession(true);
          setUser(JSON.parse(user || '{}'));
          setError('');
          setLoading(false);
        } else {
          setSession(false);
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking session: ' + error);
        setSession(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      const token = data.data.accessToken;
      setToken(token);
      await AsyncStorage.setItem('token', token);

      const userData = data.data.user;
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setSession(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response?.data);
        setError(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credential: string, refreshToken: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/auth/google/credential`, {
        credential,
      });
      if (!response.status) {
        throw new Error('Login failed');
      }
      const data = response.data;

      const token = data.data.accessToken;
      setToken(token);
      await AsyncStorage.setItem('token', token);

      const userData = data.data.user;
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setSession(true);
    } catch (error) {
      console.error('Login with Google error', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/auth/register`, {
        email,
        password,
        fullName,
      });

      if (!response.status) {
        throw new Error('Sign up failed');
      }

      const data = response.data;
      console.log('Sign up data:', data);
    } catch (error) {
      console.error('Sign up error', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setError('');
  };

  const updateUser = async (userId: number, data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${api}/users/${userId}`,
        data,
        {
          headers: {
            'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.data; // Adjust based on your API response structure
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error updating user:', error.response?.data);
        setError(error.response?.data.error || 'Failed to update profile');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, loginWithGoogle, logout, signUp, updateUser, user, session, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };