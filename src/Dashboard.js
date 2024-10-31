import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Dashboard = ({ isLoggedIn, onLogout }) => {
  const [activeSection, setActiveSection] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setDropdownOpen(false);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="business-title">Business Title</div>
        <div className="nav-links">
          <Link to="/auction" className="nav-link">Auction</Link>
          <div className="dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`dropdown-button ${dropdownOpen ? 'open' : ''}`}
            >
              Account
            </button>
            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <button
                className="dropdown-item"
                onClick={() => handleNavigation("Profile")}
              >
                Profile
              </button>
              {isLoggedIn ? (
                <button className="dropdown-item auth-button" onClick={onLogout}>
                  Logout
                </button>
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
          {activeSection === "Home" && (
            <div>
              {isLoggedIn ? (
                <p>Welcome back! You are logged in.</p>
              ) : (
                <p>Welcome! Please log in to access more features.</p>
              )}
            </div>
          )}
          {activeSection === "Profile" && <p>Here’s where your profile information goes.</p>}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
