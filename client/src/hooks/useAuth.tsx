import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';



const api = 'http://localhost:8080/api';

type AuthContextType = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (credential: string ,refreshToken: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  user : any;
  session: boolean;
  error: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);
    const [session, setSession] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("token")
                const user = await AsyncStorage.getItem("user")
                const decodedToken = token ? jwtDecode(token) as { exp: number } : null;
                const currentTime = Date.now() / 1000; 
                if (decodedToken && decodedToken.exp < currentTime) {
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("user");
                    setSession(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }
                if (token) {
                    setSession(true);
                    setUser(JSON.parse(user || '{}'));
                    setError('');
                } else {
                    setSession(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Error checking session: " + error);
                setSession(false);
                setUser(null);
            }
            setLoading(false);
        };
        checkSession();
    }, []);

  const login = async (email: string, password: string):Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      

      const data =  response.data;
      const token = data.data.accessToken;
      setToken(token)
      await AsyncStorage.setItem('token', token);

      const userData = data.data.user; 
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setSession(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response?.data);
        setError(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async(credential: string, refreshToken: string ) => {
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
      setToken(token)
      await AsyncStorage.setItem('token', token);

      const userData = data.data.user;
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setSession(true)

    } catch (error) {
      console.error('Login with Google error', error);
    }
  }

  const signUp = async (email: string, password: string, fullName: string):Promise<void> => {
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
      console.log('Data',data)

    } catch (error) {
      console.error('Sign up error', error);
    } finally {
      setLoading(false);
    }
  }



  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setError('');
  };

  return (
    <AuthContext.Provider value={{ login, loginWithGoogle ,logout, signUp, user, session, error: error , }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
