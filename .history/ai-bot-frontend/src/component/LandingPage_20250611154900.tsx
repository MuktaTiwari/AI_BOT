import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent,
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
      background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
      backgroundImage: 'url(https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
            <Box sx={{ display: 'flex', gap: '30px' }}>
              <Button color="inherit">Features</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">Contact</Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: '#4e9af1',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4e9af1',
                  borderColor: '#4e9af1'
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
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 4
      }}>
        <Typography variant="h2" component="h1" sx={{ 
          mb: 3,
          fontSize: isMobile ? '36px' : '48px',
          lineHeight: 1.2,
          '& span': {
            color: '#4e9af1'
          }
        }}>
          Experience the Future with <span>AI Chat</span>
        </Typography>
        
        <Typography variant="body1" sx={{ 
          mb: 5,
          fontSize: '18px',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          Our intelligent chatbot understands natural language, learns from interactions, and provides human-like responses to revolutionize your communication experience.
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          gap: '20px',
          mb: 5,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#fff',
              color: '#333',
              padding: '15px 35px',
              fontSize: '18px',
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
              padding: '15px 35px',
              fontSize: '18px',
              '&:hover': {
                backgroundColor: '#3a7bc8'
              }
            }}
          >
            Get Started
          </Button>
        </Box>
        
        {/* Feature Highlights */}
        <Grid container spacing={3} sx={{ mt: 5, justifyContent: 'center' }}>
  <Grid item component="div" xs={12} sm={6} md={4}>
    <Card sx={{ ... }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <MessageIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
        <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
          Smart Responses
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Context-aware replies that understand your needs
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  
  <Grid item component="div" xs={12} sm={6} md={4}>
    <Card sx={{ ... }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <PeopleIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
        <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
          Multi-User
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Supports conversations with multiple users
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  
  <Grid item component="div" xs={12} sm={6} md={4}>
    <Card sx={{ ... }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <SettingsIcon sx={{ fontSize: '40px', mb: 2, color: '#4e9af1' }} />
        <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
          Customizable
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Tailor the bot to your specific requirements
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;