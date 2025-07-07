import { useEffect, useState } from 'react';
import { getAIbotList, createAIbot,updateAIbot , deleteAIbot } from '../api/auth';
import Navbar from '../layouts/navbar';
import Sidebar from '../layouts/sidebar';
import CreateBotModal from './CreateBotModal';
import './style/BotsList.css';
import EditBotModal from './EditBotList';
import DeleteConfirmationModal from './DeleteConfirmationModal';


function BotsList() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateBotModal, setShowCreateBotModal] = useState(false);
  const [showEditBotModal, setShowEditBotModal] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


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
  };

  const handleEdit = (botId) => {
    closeMenu();
    const bot = bots.find(b => b.id === botId);
    setSelectedBot(bot);
    setShowEditBotModal(true);
  };

  const handleUpdateBot = async (updatedBot) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const response = await updateAIbot(updatedBot.id, {
        botName: updatedBot.botName,
        messages: updatedBot.messages,
        userId: user.id
      });

      console.log('Bot updated successfully:', response);
      setShowEditBotModal(false);
      fetchBots(); // Refresh the bot list
    } catch (err) {
      console.error('Error updating bot:', err);
      setError(err.message);
    }
  };


  const handleDelete = (botId) => {
    closeMenu();
    const bot = bots.find(b => b.id === botId);
    if (bot) {
      setSelectedBot(bot);
      setShowDeleteModal(true);
    } else {
      setError('Bot not found');
    }
    
  };

  const handleDeleteBot = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {  
        throw new Error('User not authenticated');
      }
      const response = await deleteAIbot(selectedBot.id, {
        userId: user.id
      }); 
      console.log('Bot deleted successfully:', response);
      setShowDeleteModal(false);
      fetchBots(); // Refresh the bot list
    } catch (err) {
      console.error('Error deleting bot:', err);
      setError(err.message);
    }
  };

  const toggleMenu = (botId) => {
    setMenuOpen(menuOpen === botId ? null : botId);
  };

  const closeMenu = () => {
    setMenuOpen(null);
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuOpen && !e.target.closest('.dropdown-container')) {
      closeMenu();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [menuOpen]);

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
                        <td className="actions-cell">
                          <div className="dropdown-container">
                            <button
                              className="menu-button"
                              onClick={() => toggleMenu(bot.id)}
                              aria-label="Actions"
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                              </svg>
                            </button>

                            {menuOpen === bot.id && (
                              <div className="dropdown-menu">
                                <button
                                  className="dropdown-item view-btn"
                                  onClick={() => handleView(bot.id)}
                                >
                                  View
                                </button>
                                <button
                                  className="dropdown-item edit-btn"
                                  onClick={() => handleEdit(bot.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="dropdown-item delete-btn"
                                  onClick={() => handleDelete(bot.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
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

      <EditBotModal
        show={showEditBotModal}
        bot={selectedBot}
        onClose={() => {
          setShowEditBotModal(false);
          setSelectedBot(null);
          setError('');
        }}
        onUpdate={handleUpdateBot}
      />

      <DeleteConfirmationModal 
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteBot}
        botName={selectedBot ? selectedBot.botName : ''}
      
      />


    </div>
  );
}

export default BotsList;