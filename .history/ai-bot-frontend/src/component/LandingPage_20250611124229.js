import React from 'react';
import { FiMessageSquare, FiUsers, FiSettings, FiSend } from 'react-icons/fi';
import { IoMdNotifications } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

import '../style/LandingPage.css'
const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">AI<span>Chat</span></div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="auth-buttons">
          <button className="btn btn-login">Login</button>
          <button className="btn btn-register">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Experience the Future with <span>AI Chat</span></h1>
        <p>Our intelligent chatbot understands natural language, learns from interactions, and provides human-like responses to revolutionize your communication experience.</p>
        <div className="cta-buttons">
          <button className="btn btn-cta btn-demo">Try Demo</button>
          <button className="btn btn-cta btn-register">Get Started</button>
        </div>
        
        {/* Feature Highlights */}
        <div className="features">
          <div className="feature">
            <div className="feature-icon"><FiMessageSquare /></div>
            <h3>Smart Responses</h3>
            <p>Context-aware replies that understand your needs</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><FiUsers /></div>
            <h3>Multi-User</h3>
            <p>Supports conversations with multiple users</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><FiSettings /></div>
            <h3>Customizable</h3>
            <p>Tailor the bot to your specific requirements</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;