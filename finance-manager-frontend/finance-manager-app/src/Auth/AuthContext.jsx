import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('accessToken');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    const validateToken = async () => {
      if (token) {
        try {
          await axios.get(`${apiUrl}/api/v1/auth/validate`, {
            params: { token }
          });
          setUsername(storedUsername);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('username');
        }
      }
    };

    validateToken();
  }, [apiUrl]);

  const login = (username) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;