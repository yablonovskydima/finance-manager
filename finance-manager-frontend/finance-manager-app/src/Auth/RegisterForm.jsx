import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const RegisterForm = () => {
const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8083';

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/register`, { login, email, password, confirmPassword });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      authLogin(login);
      navigate('/categories');
    } catch (error) {
      setErrorMessage(error.response.data.message || "Registration failed")
    }
  };

  const validateLogin = (value) => {
    const regex = /^[A-Za-z0-9]{5,}$/;
    return regex.test(value);
  };

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(value);
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?@#$%^&*(),\.<>\[\]{}"'|\\:;`~+\-*\/]).{8,}$/;
    return regex.test(value);
  };

  const handleLoginChange = (e) => {
    const { value } = e.target;
    setLogin(value);
    if (!validateLogin(value)) {
      setLoginError('Login must be at least 5 characters long and contain only letters and numbers.');
    } else {
      setLoginError('');
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const renderLoginTooltip = (props) => (
    <Tooltip id="login-tooltip"  {...props} >
      Login must be at least 5 characters long and contain only letters and numbers.
    </Tooltip>
  );

  const renderEmailTooltip = (props) => (
    <Tooltip id="email-tooltip" {...props}>
      Enter a valid email address.
    </Tooltip>
  );

  const renderPasswordTooltip = (props) => (
    <Tooltip id="password-tooltip" {...props}>
      Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
    </Tooltip>
  );

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title mb-0">Register</h5>
          </div>
          <div className="card-body">
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
              <label htmlFor="login" className="form-label">
                    Login
                    <OverlayTrigger
                      placement="right"
                      overlay={renderLoginTooltip}
                    >
                      <span className="ms-2 text-info" style={{ cursor: 'pointer' }}>?</span>
                    </OverlayTrigger>
                  </label>
                  <input
                    type="text"
                    id="login"
                    className={`form-control ${loginError ? 'is-invalid' : ''}`}
                    value={login}
                    onChange={handleLoginChange}
                    required
                  />
                  {loginError && <div className="invalid-feedback">{loginError}</div>}
              </div>
              <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                        <OverlayTrigger
                        placement="right"
                        overlay={renderEmailTooltip}
                        >
                        <span className="ms-2 text-info" style={{ cursor: 'pointer' }}>?</span>
                        </OverlayTrigger>
                    </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="mb-3">
              <label htmlFor="password" className="form-label">
                    Password
                    <OverlayTrigger
                      placement="right"
                      overlay={renderPasswordTooltip}
                    >
                      <span className="ms-2 text-info" style={{ cursor: 'pointer' }}>?</span>
                    </OverlayTrigger>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RegisterForm;