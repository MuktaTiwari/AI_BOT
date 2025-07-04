import { Link, useNavigate } from 'react-router-dom';
import { FaRobot, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

import '../components/style/Navbar.css'
function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <FaRobot className="navbar-icon" />
          <span>AI Bot Manager</span>
        </Link>
      </div>
      
      <div className="navbar-right">
        <button 
          className="navbar-button"
          onClick={() => navigate('/settings')}
        >
          <FaUserCog />
          <span>Settings</span>
        </button>
        
        <button 
          className="navbar-button"
          onClick={() => {
            // Add logout logic here
            navigate('/login');
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;