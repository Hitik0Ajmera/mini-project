import React, { createContext, useState, useEffect } from 'react';
import api from '../../Services/api';
// import api from '../../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/Admin/profile');
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();

    // Listen for auth updates from the interceptor
    const handleAuthUpdate = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn);
      setUser(null);
    };
    window.addEventListener('auth-update', handleAuthUpdate);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('auth-update', handleAuthUpdate);
    };
  }, []);

  const logout = async () => {
    try {
      await api.post('/Auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed: ' + (error.response?.data?.Errors?.join(', ') || error.message));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};