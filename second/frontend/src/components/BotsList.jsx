import { useEffect, useState } from 'react';
import { getAIbotList, createAIbot } from '../api/auth';
import Navbar from '../layouts/navbar';
import Sidebar from '../layouts/sidebar';
import CreateBotModal from './CreateBotModal';
import './style/BotsList.css';

function BotsList() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateBotModal, setShowCreateBotModal] = useState(false);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const response = await getAIbotList(user.id);
      setBots(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch bots');
      console.error('Error fetching bots:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async (botData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const dataToSend = {
        botName: botData.botName,
        messages: botData.messages,
        userId: user.id
      };

      const response = await createAIbot(dataToSend);

      if (!response) {
        throw new Error('No response received from server');
      }

      console.log('Bot created successfully:', response);
      setShowCreateBotModal(false);
      fetchBots(); // Refresh the bot list
    } catch (err) {
      console.error('Error creating bot:', err);
      setError(err.message);
    }
  };

  const handleView = (botId) => {
    console.log('View bot:', botId);
    // Implement view functionality
  };

  const handleEdit = (botId) => {
    console.log('Edit bot:', botId);
    // Implement edit functionality
  };

  const handleDelete = (botId) => {
    console.log('Delete bot:', botId);
    // Implement delete functionality
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="bots-header">
            <h1>My Bots</h1>
            <button
              className="create-bot-button"
              onClick={() => setShowCreateBotModal(true)}
            >
              Create New Bot
            </button>
          </div>
          
          {loading ? (
            <div className="loading">Loading your bots...</div>
          ) : error ? (
            <div className="error">Error: {error}</div>
          ) : (
            <div className="bots-table-container">
              {bots.length === 0 ? (
                <div className="no-bots">
                  <p>You haven't created any bots yet.</p>
                  <button 
                    className="create-bot-button"
                    onClick={() => setShowCreateBotModal(true)}
                  >
                    Create Your First Bot
                  </button>
                </div>
              ) : (
                <table className="bots-table">
                  <thead>
                    <tr>
                      <th>Bot Name</th>
                      <th>Messages</th>
                      <th>URLs</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bots.map(bot => (
                      <tr key={bot.id}>
                        <td>{bot.botName}</td>
                        <td>
                          {bot.messages && bot.messages.length > 0 ? (
                            <ul className="messages-list">
                              {bot.messages.map((msg, index) => (
                                <li key={index}>{msg.text}</li>
                              ))}
                            </ul>
                          ) : 'No messages'}
                        </td>
                        <td>
                          {bot.messages && bot.messages.length > 0 ? (
                            <ul className="urls-list">
                              {bot.messages.map((msg, index) => (
                                <li key={index}>
                                  <a href={msg.url} target="_blank" rel="noopener noreferrer">
                                    {msg.url || 'No URL'}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : 'No URLs'}
                        </td>
                        <td>{new Date(bot.createdAt).toLocaleString()}</td>
                        <td className="actions-cell">
                          <button 
                            className="view-btn"
                            onClick={() => handleView(bot.id)}
                          >
                            View
                          </button>
                          <button 
                            className="edit-btn"
                            onClick={() => handleEdit(bot.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(bot.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <CreateBotModal
        show={showCreateBotModal}
        onClose={() => {
          setShowCreateBotModal(false);
          setError('');
        }}
        onCreate={handleCreateBot}
      />
    </div>
  );
}

export default BotsList;