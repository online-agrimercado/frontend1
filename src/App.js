import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(loggedInStatus);
    setUserId(storedUserId);
    setUsername(storedUsername);
  }, []);

  const handleLogin = (id, username) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  return (
    <Router basename="/frontend1">
      <Routes>
        <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} userId={userId} username={username} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
