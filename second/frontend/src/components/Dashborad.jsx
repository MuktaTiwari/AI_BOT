import { useState } from 'react';
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";
import './style/Dashboard.css';

function Dashboard() {
  const stats = [
    { title: "Total Bots", value: 5, change: "+2" },
    { title: "Active Conversations", value: 12, change: "+5" },
    { title: "Messages Today", value: 342, change: "+28%" },
    { title: "User Satisfaction", value: "92%", change: "+3%" }
  ];

  const recentBots = [
    { name: "Customer Support", lastActive: "2 hours ago", status: "active" },
    { name: "Sales Assistant", lastActive: "1 day ago", status: "active" },
    { name: "Tech Help", lastActive: "3 days ago", status: "inactive" }
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-section">
          <div className="recent-bots">
            <h2>Recent Bots</h2>
            <div className="bots-list">
              {recentBots.map((bot, index) => (
                <div className="bot-card" key={index}>
                  <div className="bot-info">
                    <h3>{bot.name}</h3>
                    <p>Last active: {bot.lastActive}</p>
                  </div>
                  <div className={`bot-status ${bot.status}`}>
                    {bot.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-button">
                <span>View Analytics</span>
              </button>
              <button className="action-button">
                <span>Manage Integrations</span>
              </button>
            </div>
          </div>
        </div>

        <div className="activity-feed">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <p>New conversation started with Customer Support bot</p>
              <small>10 minutes ago</small>
            </div>
            <div className="activity-item">
              <p>Updated Sales Assistant bot configuration</p>
              <small>2 hours ago</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;