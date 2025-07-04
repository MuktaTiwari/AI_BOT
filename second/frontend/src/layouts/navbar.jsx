import { Link, useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import { CiSettings } from "react-icons/ci";
import { useState, useEffect, useRef } from 'react';
import '../components/style/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef(null);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <FaRobot className="navbar-icon" />
          <span>AI Bot Manager</span>
        </Link>
      </div>
      
      <div className="navbar-right">
        <div className="settings-container" ref={settingsRef}>
          <button 
            className="navbar-button settings-button"
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          >
            <CiSettings />
          </button>
          
          {showSettingsMenu && (
            <div className="settings-dropdown">
              <button 
                className="dropdown-item"
                onClick={() => {
                  navigate('/settings');
                  setShowSettingsMenu(false);
                }}
              >
                Settings
              </button>
              <button 
                className="dropdown-item"
                onClick={() => {
                  handleLogout();
                  setShowSettingsMenu(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;