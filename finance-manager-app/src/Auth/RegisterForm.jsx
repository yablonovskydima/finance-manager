import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const RegisterForm = () => {
const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { login, email, password, confirmPassword });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      authLogin(login);
      navigate('/categories');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
    <div>
        <label>Login</label>
        <input type="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;