import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/register' : '/api/login';
    try {
      const response = await fetch(`https://f5c6-103-105-214-47.ngrok-free.app${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        if (isRegister && data.message === 'Email already exists') {
          throw new Error('This email is already registered in the database.');
        }
        throw new Error(data.message || `${isRegister ? 'Registration' : 'Login'} failed`);
      }

      if (isRegister) {
        setMessage('Successfully registered.');
        setErrorMessage('');
      } else {
        setMessage('Successfully logged in.');
        onLogin();
        navigate('/');
      }

      setTimeout(() => setMessage(''), 3000);
      if (isRegister) {
        setIsRegister(false);
      }
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        setErrorMessage('Backend is offline or unreachable. Please try again later.');
      } else {
        setErrorMessage(error.message);
      }
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {message && <p className="success-message">{message}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        {isRegister && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="input-field"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} className="register-button">
        {isRegister ? 'Login' : 'Register'}
      </button>
    </div>
  );
};

export default Login;
