import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashborad from './components/Dashborad';
import RegisterPage from './components/RegisterPage';
import BotsList from './components/BotsList';
import UserList from './components/Users';
import Conversations from './components/Conversations';
import ChatPage from './components/ChatPage';
import './App.css';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/bots" element={<BotsList />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/chat/:botId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;