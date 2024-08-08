import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    const token = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

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
      const response = await axios.post(`${apiUrl}/api/v1/auth/refresh`, { refreshToken }, { withCredentials: true });

      if (response.data && response.data.accessToken) {
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
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
    Cookies.set('username', username, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
    Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
    const decodedToken = jwtDecode(accessToken);
    setRole(decodedToken.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUsername('');
    setRole('');
    setIsAuthenticated(false);
    Cookies.remove('username');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ username, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;