import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Avatar, 
  IconButton, 
  TextField, 
  Badge, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs,
  Tab,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Send as SendIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreVertIcon,
  InsertEmoticon as EmojiIcon,
  AttachFile as AttachFileIcon,
  Check as CheckIcon
} from '@mui/icons-material';

// Define types for our data
type User = {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: string | null;
  unread: number;
};

type Message = {
  id: number;
  text: string;
  sender: number; // 0 is current user
  timestamp: Date;
  read: boolean;
};

const ChatDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State management with proper types
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online', lastSeen: null, unread: 3 },
      { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', status: 'online', lastSeen: null, unread: 0 },
      { id: 3, name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', status: 'offline', lastSeen: '2 hours ago', unread: 0 },
      { id: 4, name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4', status: 'away', lastSeen: '30 minutes ago', unread: 0 },
    ];

    const mockMessages: Message[] = [
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
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 0, // 0 represents current user
      timestamp: new Date(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format message date
  const formatDate = (date: Date) => {
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

  // Status indicator color
  const getStatusColor = (status: 'online' | 'away' | 'offline') => {
    switch (status) {
      case 'online': return 'success';
      case 'away': return 'warning';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Left sidebar */}
      <Box sx={{ 
        width: isMobile ? '100%' : 350, 
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* User header */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between', bgcolor: '#f0f2f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color="success"
              >
                <Avatar src="https://i.pravatar.cc/150?img=5" />
              </Badge>
            </Box>
            <Box>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* Search bar */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              bgcolor: '#f0f2f5',
              borderRadius: 1,
              '& fieldset': { border: 'none' }
            }}
          />
        </Box>
        
        {/* Navigation tabs */}
        <Tabs 
          value={activeTab} 
          onChange={(e: React.SyntheticEvent, newValue: string) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            value="chats" 
            icon={<MessageIcon />} 
            iconPosition="start" 
            label="Chats" 
            sx={{ minHeight: 48 }}
          />
          <Tab 
            value="contacts" 
            icon={<PeopleIcon />} 
            iconPosition="start" 
            label="Contacts" 
            sx={{ minHeight: 48 }}
          />
          <Tab 
            value="settings" 
            icon={<SettingsIcon />} 
            iconPosition="start" 
            label="Settings" 
            sx={{ minHeight: 48 }}
          />
        </Tabs>
        
        {/* User list */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List>
            {filteredUsers.map(user => (
              <ListItem 
                key={user.id}
                button
                selected={activeUser === user.id}
                onClick={() => setActiveUser(user.id)}
                sx={{
                  '&.Mui-selected': { bgcolor: '#f0f2f5' },
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color={getStatusColor(user.status)}
                  >
                    <Avatar src={user.avatar} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.lastSeen ? `Last seen ${user.lastSeen}` : 'Online'}
                  secondaryTypographyProps={{ noWrap: true }}
                />
                {user.unread > 0 && (
                  <Chip 
                    label={user.unread} 
                    size="small" 
                    color="primary" 
                    sx={{ minWidth: 20, height: 20 }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      
      {/* Main chat area */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#e5ddd5',
        backgroundImage: 'url(https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png)',
        backgroundRepeat: 'repeat'
      }}>
        {activeUser ? (
          <>
            {/* Chat header */}
            <AppBar position="static" color="default" elevation={0}>
              <Toolbar sx={{ justifyContent: 'space-between', bgcolor: '#f0f2f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={users.find(u => u.id === activeUser)?.avatar} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1">
                      {users.find(u => u.id === activeUser)?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {users.find(u => u.id === activeUser)?.status === 'online' ? 'Online' : 'Offline'}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            
            {/* Messages area */}
            <Box sx={{ 
              flex: 1, 
              p: 2, 
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {messages.map((message, index) => {
                const showDate = index === 0 || 
                  formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                
                return (
                  <React.Fragment key={message.id}>
                    {showDate && (
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        my: 2 
                      }}>
                        <Chip 
                          label={formatDate(message.timestamp)} 
                          size="small"
                          sx={{ bgcolor: '#e1f3fb' }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        mb: 1,
                        maxWidth: '70%',
                        alignSelf: message.sender === 0 ? 'flex-end' : 'flex-start',
                        flexDirection: message.sender === 0 ? 'row-reverse' : 'row'
                      }}
                    >
                      {message.sender !== 0 && (
                        <Avatar 
                          src={users.find(u => u.id === message.sender)?.avatar} 
                          sx={{ width: 32, height: 32, mr: 1, alignSelf: 'flex-end' }}
                        />
                      )}
                      <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: message.sender === 0 ? 'flex-end' : 'flex-start'
                      }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: message.sender === 0 ? '#d9fdd3' : 'white',
                            borderTopLeftRadius: message.sender !== 0 ? 0 : undefined,
                            borderTopRightRadius: message.sender === 0 ? 0 : undefined
                          }}
                        >
                          <Typography variant="body2">{message.text}</Typography>
                        </Paper>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          mt: 0.5
                        }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(message.timestamp)}
                          </Typography>
                          {message.sender === 0 && (
                            <CheckIcon 
                              fontSize="small" 
                              sx={{ 
                                ml: 0.5,
                                color: message.read ? '#4fc3f7' : '#90a4ae'
                              }} 
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </Box>
            
            {/* Message input */}
            <Box sx={{ 
              p: 1.5, 
              bgcolor: '#f0f2f5',
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 1
              }}>
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <EmojiIcon />
                </IconButton>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={handleKeyPress}
                  sx={{ 
                    mx: 1,
                    '& fieldset': { border: 'none' }
                  }}
                />
                <IconButton 
                  color="primary"
                  disabled={!inputMessage.trim()}
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f8f9fa'
          }}>
            <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
              <Typography variant="h4" color="text.secondary" gutterBottom>
                Welcome to ChatApp
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select a chat to start messaging
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatDashboard;