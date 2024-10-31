import React, { useState } from 'react';
import './App.css'; // Keep your CSS here

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Home");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li onClick={() => handleNavigation("Home")} className={activeSection === "Home" ? "active" : ""}>Home</li>
          <li onClick={() => handleNavigation("Profile")} className={activeSection === "Profile" ? "active" : ""}>Profile</li>
          <li onClick={() => handleNavigation("Settings")} className={activeSection === "Settings" ? "active" : ""}>Settings</li>
          <li onClick={() => handleNavigation("Reports")} className={activeSection === "Reports" ? "active" : ""}>Reports</li>
          <li onClick={() => handleNavigation("Support")} className={activeSection === "Support" ? "active" : ""}>Support</li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        <header>
          <h1>{activeSection}</h1>
        </header>
        <section className="content">
          {activeSection === "Home" && <p>Welcome to the Home Dashboard!</p>}
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
