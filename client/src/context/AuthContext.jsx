import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = JSON.parse(atob(payloadBase64));
      const exp = decodedJson.exp;
      if (exp && Date.now() >= exp * 1000) {
        return true;
      }
      return false;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        if (isTokenExpired(storedToken)) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
          setLoading(false);
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/about') {
            window.location.href = '/login';
          }
          return;
        }

        // Verify with the backend server via protected history endpoint
        try {
          const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const verifyUrl = API.endsWith('/api') ? `${API}/history` : `${API}/api/history`;
          const res = await fetch(verifyUrl, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (!res.ok) {
            throw new Error('Token rejected by server');
          }

          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error("Token verification failed on initialization:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/about') {
            window.location.href = '/login';
          }
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      console.error('Login request error:', err);
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { token, user: userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      console.error('Register request error:', err);
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: message };
    }
  };

  const setSession = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    setSession,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
