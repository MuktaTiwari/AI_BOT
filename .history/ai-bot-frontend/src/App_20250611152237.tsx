import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chart

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
      <ChatDashboard></>
      </div>
    </>
  )
}

export default App
