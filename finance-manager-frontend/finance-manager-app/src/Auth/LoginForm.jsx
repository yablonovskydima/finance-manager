import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, { username, password });
  
      if (response.data && response.data.accessToken && response.data.refreshToken) {
        Cookies.set('accessToken', response.data.accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 7, secure: true, sameSite: 'Strict' });
        login(username, response.data.accessToken, response.data.refreshToken);
        navigate('/categories');
      } else {
        throw new Error('Invalid response from login');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to login';
      setErrorMessage(message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Login</h5>
            </div>
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;