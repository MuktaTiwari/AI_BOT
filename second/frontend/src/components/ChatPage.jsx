import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllAIBot } from '../api/auth';
import ChatWindow from './ChatWindow';
import Navbar from '../layouts/navbar';
import Sidebar from '../layouts/sidebar';
import './style/ChatPage.css';

function ChatPage() {
  const { botId } = useParams();
  const navigate = useNavigate();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBot = async () => {
      try {
        const response = await getAllAIBot();
        const selectedBot = response.data.find(b => b.id.toString() === botId);
        if (!selectedBot) {
          setError('Bot not found');
        } else {
          setBot(selectedBot);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bot", error);
        setError('Failed to load bot');
        setLoading(false);
      }
    };
    fetchBot();
  }, [botId]);

  if (loading) return <div className="loading">Loading bot...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="chat-page-container">
      <Navbar />
      <Sidebar />
      <div className="chat-page-content">
        <ChatWindow bot={bot} />
      </div>
    </div>
  );
}

export default ChatPage;