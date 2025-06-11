import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
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
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      backgroundRepeat: 'no-repeat',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden' // Prevent horizontal scroll
    }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        width: '100%',
        py: isMobile ? 2 : 0
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            px: 0,
            width: '100%'
          }}>
            <Typography variant="h6" component="div" sx={{ 
              fontSize: '28px',
              fontWeight: 700,
              color: '#4e9af1',
              '& span': {
                color: '#fff'
              }
            }}>
              AI<span>Chat</span>
            </Typography>
            
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                gap: '30px',
                '& .MuiButton-root': {
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                  minWidth: 'auto',
                  px: 1,
                  '&:hover': {
                    color: '#4e9af1',
                    backgroundColor: 'transparent'
                  }
                }
              }}>
                <Button>Features</Button>
                <Button>About</Button>
                <Button>Contact</Button>
              </Box>
            )}

            <Box sx={{ 
              display: 'flex', 
              gap: '15px',
              '& .MuiButton-root': {
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '16px',
                px: 3,
                py: 1
              }
            }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  border: '2px solid #4e9af1',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#4e9af1',
                    border: '2px solid #4e9af1'
                  }
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
                  }
                }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 4,
        width: '100%'
      }}>
        <Typography variant="h2" component="h1" sx={{ 
          mb: 3,
          fontSize: isMobile ? '2.5rem' : '3.5rem',
          lineHeight: 1.2,
          '& span': {
            color: '#4e9af1'
          }
        }}>
          Experience the Future with <span>AI Chat</span>
        </Typography>
        
        <Typography variant="body1" sx={{ 
          mb: 4,
          fontSize: '1.1rem',
          opacity: 0.9,
          lineHeight: 1.6,
          maxWidth: '700px',
          px: 2
        }}>
          Our intelligent chatbot understands natural language, learns from interactions, and provides human-like responses to revolutionize your communication experience.
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          gap: 3,
          mb: 5,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#fff',
              color: '#333',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '30px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#e6e6e6'
              }
            }}
          >
            Try Demo
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#4e9af1',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '30px',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#3a7bc8'
              }
            }}
          >
            Get Started
          </Button>
        </Box>
        
        {/* Feature Highlights */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          mt: 6,
          flexWrap: 'wrap',
          width: '100%'
        }}>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            p: 3,
            borderRadius: '15px',
            width: isMobile ? '100%' : '280px',
            textAlign: 'center',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)'
            }
          }}>
            <MessageIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
            <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
              Smart Responses
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Context-aware replies that understand your needs
            </Typography>
          </Box>
          
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            p: 3,
            borderRadius: '15px',
            width: isMobile ? '100%' : '280px',
            textAlign: 'center',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)'
            }
          }}>
            <PeopleIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
            <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
              Multi-User
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Supports conversations with multiple users
            </Typography>
          </Box>
          
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            p: 3,
            borderRadius: '15px',
            width: isMobile ? '100%' : '280px',
            textAlign: 'center',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)'
            }
          }}>
            <SettingsIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
            <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
              Customizable
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Tailor the bot to your specific requirements
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;