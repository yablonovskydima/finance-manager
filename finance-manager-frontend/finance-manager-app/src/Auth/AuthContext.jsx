import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }

    const validateToken = async () => {
      if (token) {
        try {
          await axios.get(`${apiUrl}/api/v1/auth/validate`, {
            params: { token }
          });
          const decodedToken = jwtDecode(token);
          setRole(decodedToken.role);
        } catch (error) {
          if (refreshToken) {
            await refreshAccessToken(refreshToken);
          } else {
            logout();
          }
        }
      }
    };

    validateToken();
  }, []);

  const refreshAccessToken = async (refreshToken) => {
    try {
      // Надсилаємо запит на оновлення токена
      const response = await axios.post(`${apiUrl}/api/v1/auth/refresh`, { refreshToken });
  
      // Перевірка наявності поля `accessToken` у відповіді
      if (response.data && response.data.accessToken) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        const decodedToken = jwtDecode(accessToken);
        setRole(decodedToken.role);
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

  const login = (username, accessToken, refreshToken) => {
    setUsername(username);
    localStorage.setItem('username', username);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const decodedToken = jwtDecode(accessToken);
    setRole(decodedToken.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUsername('');
    setRole('');
    setIsAuthenticated(false);
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ username, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;