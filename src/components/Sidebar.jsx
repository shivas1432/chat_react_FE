import { Settings, User, Activity, Monitor, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/global.css';

const Sidebar = ({ contacts = [], currentUserId }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
      <Link to="/chat" className="sidebar-title">
        <h2>CHAT BOX</h2>
      </Link>
        <nav>
          <Link to="/settings" className="sidebar-link">
            <Settings className="sidebar-icon" />
            Settings
          </Link>
          <Link to={`/profile/${currentUserId}`} className="sidebar-link">
            <User className="sidebar-icon" />
            My Profile
          </Link>
          <Link to="/activity" className="sidebar-link">
            <Activity className="sidebar-icon" />
            Activity
          </Link>
          <Link to="/friends" className="sidebar-link">
            <Monitor className="sidebar-icon" />
            Friends
          </Link>
          <h3 className="sidebar-friends-title">My Friends</h3>
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <Link key={contact.id} to={`/profile/${contact.id}`} className="sidebar-link">
                <Users className="sidebar-icon" />
                {contact.name}
              </Link>
            ))
          ) : (
            <p className="sidebar-no-friends">No friends available</p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
