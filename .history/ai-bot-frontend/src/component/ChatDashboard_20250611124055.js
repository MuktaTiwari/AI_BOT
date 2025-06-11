import React, { useState, useEffect } from 'react';
import { FiSend, FiUsers, FiMessageSquare, FiSettings, FiLogOut } from 'react-icons/fi';
import { BsThreeDotsVertical, BsEmojiSmile, BsPaperclip } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import { useRef } from 'react';

import '../style/'
const ChatDashboard = () => {
  // State management
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data initialization
  useEffect(() => {
    // Simulate API call to fetch users
    const mockUsers = [
      { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online', lastSeen: null },
      { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', status: 'online', lastSeen: null },
      { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', status: 'offline', lastSeen: '2 hours ago' },
      { id: 4, name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4', status: 'away', lastSeen: '30 minutes ago' },
    ];

    // Simulate API call to fetch messages
    const mockMessages = [
      { id: 1, text: 'Hello there!', sender: 1, timestamp: new Date(Date.now() - 3600000), read: true },
      { id: 2, text: 'Hi! How are you?', sender: 2, timestamp: new Date(Date.now() - 1800000), read: true },
      { id: 3, text: 'I was wondering if we could meet tomorrow?', sender: 1, timestamp: new Date(Date.now() - 1200000), read: true },
      { id: 4, text: 'Sure, what time works for you?', sender: 0, timestamp: new Date(Date.now() - 600000), read: false },
    ];

    setUsers(mockUsers);
    setMessages(mockMessages);
    setActiveUser(mockUsers[0].id);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 0, // 0 represents current user
      timestamp: new Date(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // In a real app, you would send the message to your backend here
    // sendMessageToBackend(newMessage);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format message date
  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="chat-dashboard">
      {/* Left sidebar */}
      <div className="sidebar">
        {/* User header */}
        <div className="user-header">
          <div className="user-avatar">
            <img src="https://i.pravatar.cc/150?img=5" alt="User" />
            <span className="status-indicator online"></span>
          </div>
          <div className="user-actions">
            <button><IoMdNotifications /></button>
            <button><BsThreeDotsVertical /></button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Navigation tabs */}
        <div className="tabs">
          <button 
            className={activeTab === 'chats' ? 'active' : ''}
            onClick={() => setActiveTab('chats')}
          >
            <FiMessageSquare /> Chats
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''}
            onClick={() => setActiveTab('contacts')}
          >
            <FiUsers /> Contacts
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> Settings
          </button>
        </div>
        
        {/* User list */}
        <div className="user-list">
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className={`user-item ${activeUser === user.id ? 'active' : ''}`}
              onClick={() => setActiveUser(user.id)}
            >
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
                <span className={`status-indicator ${user.status}`}></span>
              </div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.lastSeen ? `Last seen ${user.lastSeen}` : 'Online'}</p>
              </div>
              {user.id === 1 && <span className="unread-count">3</span>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="chat-container">
        {activeUser ? (
          <>
            {/* Chat header */}
            <div className="chat-header">
              <div className="chat-user">
                <img src={users.find(u => u.id === activeUser)?.avatar} alt="User" />
                <div>
                  <h3>{users.find(u => u.id === activeUser)?.name}</h3>
                  <p>{users.find(u => u.id === activeUser)?.status === 'online' ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="chat-actions">
                <button><BsThreeDotsVertical /></button>
              </div>
            </div>
            
            {/* Messages area */}
            <div className="message-list">
              {messages.map((message, index) => {
                // Group messages by date
                const showDate = index === 0 || 
                  formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <div className="date-divider">
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                    )}
                    <div 
                      className={`message ${message.sender === 0 ? 'sent' : 'received'}`}
                    >
                      {message.sender !== 0 && (
                        <img 
                          src={users.find(u => u.id === message.sender)?.avatar} 
                          alt="Sender" 
                          className="message-avatar"
                        />
                      )}
                      <div className="message-content">
                        <p>{message.text}</p>
                        <span className="message-time">
                          {formatTime(message.timestamp)}
                          {message.sender === 0 && (
                            <span className={`read-status ${message.read ? 'read' : 'unread'}`}>
                              ✓✓
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="message-input">
              <button 
                className="emoji-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <BsEmojiSmile />
              </button>
              <button className="attachment-btn">
                <BsPaperclip />
              </button>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={handleKeyPress}
                rows="1"
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="welcome-message">
              <h2>Welcome to ChatApp</h2>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;