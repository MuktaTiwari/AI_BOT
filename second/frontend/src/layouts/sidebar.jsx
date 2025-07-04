import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaRobot,
  FaChartLine,
  FaCog,
  FaComments,
  FaPlus
} from 'react-icons/fa';
import '../components/style/Sidebar.css'
function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/bots" className="sidebar-link">
          <FaRobot className="sidebar-icon" />
          <span>My Bots</span>
        </NavLink>

        <NavLink to="/analytics" className="sidebar-link">
          <FaChartLine className="sidebar-icon" />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/conversations" className="sidebar-link">
          <FaComments className="sidebar-icon" />
          <span>Conversations</span>
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <button
        className="sidebar-create-btn"
        onClick={() => navigate('/create-bot')}
      >
        <FaPlus />
        <span>Create New Bot</span>
      </button>
    </div>
  );
}

export default Sidebar;