import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Dashboard = ({ isLoggedIn, onLogout }) => {
  const [activeSection, setActiveSection] = useState("Home");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li onClick={() => handleNavigation("Home")} className={activeSection === "Home" ? "active" : ""}>Home</li>
          <li onClick={() => handleNavigation("Profile")} className={activeSection === "Profile" ? "active" : ""}>Profile</li>
          <li onClick={() => handleNavigation("Settings")} className={activeSection === "Settings" ? "active" : ""}>Settings</li>
          <li onClick={() => handleNavigation("Reports")} className={activeSection === "Reports" ? "active" : ""}>Reports</li>
          <li onClick={() => handleNavigation("Support")} className={activeSection === "Support" ? "active" : ""}>Support</li>
        </ul>
        {isLoggedIn ? (
          <button onClick={onLogout} className="auth-button">Logout</button>
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
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
          {activeSection === "Settings" && <p>Adjust your settings here.</p>}
          {activeSection === "Reports" && <p>Check your reports here.</p>}
          {activeSection === "Support" && <p>Get support here.</p>}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
