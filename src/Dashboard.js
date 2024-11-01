import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Dashboard = ({ isLoggedIn, userId, onLogout }) => {
  const [activeSection, setActiveSection] = useState('Home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchProfileData();
      fetchUserPosts();
    }
  }, [isLoggedIn, userId]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`https://f5c6-103-105-214-47.ngrok-free.app/api/profile/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch profile data');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      setErrorMessage('Could not fetch profile data.');
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`https://f5c6-103-105-214-47.ngrok-free.app/api/user-posts/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch user posts');
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      setErrorMessage('Could not fetch user posts.');
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="business-title" onClick={() => setActiveSection('Home')}>Business Title</div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => setActiveSection('Auction')}>Auction</button>
          <div className="dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`dropdown-button ${dropdownOpen ? 'open' : ''}`}
            >
              Account
            </button>
            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <button className="dropdown-item" onClick={() => setActiveSection('Profile')}>Profile</button>
              {isLoggedIn ? (
                <button className="dropdown-item auth-button" onClick={onLogout}>Logout</button>
              ) : (
                <Link to="/login" className="dropdown-item auth-button">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="main-content">
        <header>
          <h1>{activeSection}</h1>
        </header>
        <section className="content">
          {activeSection === 'Home' && (
            <div>
              {isLoggedIn && userInfo ? (
                <p>Welcome back, {userInfo.username}</p>
              ) : (
                <p>Welcome! Please log in to access more features.</p>
              )}
            </div>
          )}
          {activeSection === 'Auction' && <p>This is the auction content.</p>}
          {activeSection === 'Profile' && (
            <div>
              {userInfo ? (
                <div>
                  <h2>Profile Information</h2>
                  <p><strong>Username:</strong> {userInfo.username}</p>
                  <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
              ) : (
                <p>{errorMessage || 'Loading profile...'}</p>
              )}
              <h2>Your Posts</h2>
              {userPosts.length > 0 ? (
                <ul>
                  {userPosts.map((post) => (
                    <li key={post.id}>
                      <h3>{post.product_name}</h3>
                      <p>Type: {post.product_type}</p>
                      <img src={post.product_image} alt={post.product_name} />
                      <p>Current Bid: ${post.current_bid}</p>
                      <p>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{errorMessage || 'No posts available.'}</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
