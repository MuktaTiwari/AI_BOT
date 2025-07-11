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
  const user = JSON.parse(localStorage.getItem('user'));
  const userType = user?.userType;

  return (
    <div className="sidebar">

      <nav className="sidebar-nav">
        {userType === 'user' ? (
          <NavLink to="/conversations" className="sidebar-link">
          <FaComments className="sidebar-icon" />
          <span>Conversations</span>
        </NavLink>
        ) : (

          <>

          <NavLink to="/dashboard" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/bots" className="sidebar-link">
          <FaRobot className="sidebar-icon" />
          <span>My Bots</span>
        </NavLink>

        <NavLink to="/userlist" className="sidebar-link">
          <FaChartLine className="sidebar-icon" />
          <span>User List</span>
        </NavLink>

         <NavLink to="/conversations" className="sidebar-link">
          <FaComments className="sidebar-icon" />
          <span>Conversations</span>
        </NavLink>

        
        <NavLink to="/settings" className="sidebar-link">
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </NavLink>

        </>
        )}
        
      </nav>

     
    </div>
  );
}

export default Sidebar;