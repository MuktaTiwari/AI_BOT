import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './component/LandingPage';
import ChatDashboard from './component/ChatDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;