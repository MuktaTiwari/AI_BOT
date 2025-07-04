import { useEffect, useState } from 'react'

import LandingPage from './components/LandingPage'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Dashborad from './components/Dashborad'
import RegisterPage from './components/RegisterPage'
import axios from 'axios'
import BotsList from './components/BotsList'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
        // Set up axios to include token in all requests if it exists
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
        <Route path='/register' element = {<RegisterPage/>}/>
        <Route path="/bots" element={<BotsList />} />
       </Routes>
    </Router>
  )
}

export default App
