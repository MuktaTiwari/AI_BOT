import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Message as MessageIcon,
  People as PeopleIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      p: 0,
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        p: isMobile ? '20px' : '20px 50px'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between', p: 0 }}>
          <Typography variant="h6" component="div" sx={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#4e9af1',
            '& span': { color: '#fff' }
          }}>
            AI<span>Chat</span>
          </Typography>

          {!isMobile && (
            <Box sx={{
              display: 'flex',
              gap: '30px',
              '& a': {
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s',
                '&:hover': { color: '#4e9af1' }
              }
            }}>
              <Button color="inherit" sx={{ p: 0, minWidth: 'auto' }}>Features</Button>
              <Button color="inherit" sx={{ p: 0, minWidth: 'auto' }}>About</Button>
              <Button color="inherit" sx={{ p: 0, minWidth: 'auto' }}>Contact</Button>
            </Box>
          )}

          <Box sx={{
            display: 'flex',
            gap: '15px'
          }}>
            <Button
              variant="outlined"
              sx={{
                border: '2px solid #4e9af1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4e9af1',
                  border: '2px solid #4e9af1'
                },
                p: '10px 25px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4e9af1',
                '&:hover': {
                  backgroundColor: '#3a7bc8'
                },
                p: '10px 25px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        flex: 1,
        width: '100%',
        maxWidth: '100%',
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h2" component="h1" sx={{
          mb: '20px',
          fontSize: isMobile ? '36px' : '48px',
          lineHeight: 1.2,
          '& span': { color: '#4e9af1' }
        }}>
          Experience the Future with <span>AI Chat</span>
        </Typography>

        <Typography variant="body1" sx={{
          mb: '40px',
          fontSize: '18px',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          Our intelligent chatbot understands natural language, learns from interactions, and provides human-like responses to revolutionize your communication experience.
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: '20px',
          mb: '40px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#333',
              '&:hover': { backgroundColor: '#e6e6e6' },
              p: '15px 35px',
              fontSize: '18px',
              borderRadius: '30px',
              fontWeight: 600
            }}
          >
            Try Demo
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4e9af1',
              '&:hover': { backgroundColor: '#3a7bc8' },
              p: '15px 35px',
              fontSize: '18px',
              borderRadius: '30px',
              fontWeight: 600
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Feature Highlights */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          mt: '60px',
          flexWrap: 'wrap',
          width: '100%',
          ...(isMobile && {
            flexDirection: 'column',
            alignItems: 'center'
          })
        }}>
          {[{
            icon: <MessageIcon sx={{ fontSize: '40px', mb: '15px', color: '#4e9af1' }} />,
            title: 'Smart Responses',
            desc: 'Context-aware replies that understand your needs'
          }, {
            icon: <PeopleIcon sx={{ fontSize: '40px', mb: '15px', color: '#4e9af1' }} />,
            title: 'Multi-User',
            desc: 'Supports conversations with multiple users'
          }, {
            icon: <SettingsIcon sx={{ fontSize: '40px', mb: '15px', color: '#4e9af1' }} />,
            title: 'Customizable',
            desc: 'Tailor the bot to your specific requirements'
          }].map((feature, i) => (
            <Box key={i} sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              p: '25px',
              borderRadius: '15px',
              width: '200px',
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-10px)'
              }
            }}>
              {feature.icon}
              <Typography variant="h5" component="h3" sx={{ mb: '10px' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', opacity: 0.8 }}>
                {feature.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
