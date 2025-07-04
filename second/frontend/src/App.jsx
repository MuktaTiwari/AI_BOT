import { useState } from 'react'

import LandingPage from './components/LandingPage'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Dashborad from './components/Dashborad'
import RegisterPage from './components/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path='/register' element = {<RegisterPage/>}/>
       </Routes>
    </Router>
  )
}

export default App
