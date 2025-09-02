import React, { useState } from 'react';
import Icon from '../Icon';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';
import { useNotifications } from '../../contexts/NotificationContext';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = ({ isMobile, onMenuToggle, isMobileSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    getRecentNotifications 
  } = useNotifications();

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleViewAllNotifications = () => {
    console.log('View all notifications clicked');
    // Navigate to notifications page
    setShowNotifications(false);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        {isMobile && (
          <button 
            className="mobile-menu-toggle" 
            onClick={onMenuToggle}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileSidebarOpen}
          >
            <Icon name={isMobileSidebarOpen ? "dismiss" : "menu"} />
          </button>
        )}
        <div className="logo">
          <img src={logo} alt="AttorneyShare Logo" />
        </div>
        
        <nav className="main-nav">
          <a href="#" className="nav-item">
            <Icon name="person-home" className="nav-icon" />
            <span>My Referrals</span>
          </a>
          <a href="#" className="nav-item">
            <Icon name="briefcase-search" className="nav-icon" />
            <span>Marketplace</span>
          </a>
          <a href="#" className="nav-item active">
            <Icon name="people-team" className="nav-icon" />
            <span>My Network</span>
          </a>
          <a href="#" className="nav-item">
            <Icon name="chart-multiple" className="nav-icon" />
            <span>Analytics</span>
          </a>
        </nav>
        
        <div className="profile-container">
          <button className="icon-btn">
            <Icon name="chat" />
          </button>
          <button 
            className="icon-btn notification-btn"
            onClick={handleNotificationToggle}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            aria-expanded={showNotifications}
          >
            <Icon name="alert" />
            {unreadCount > 0 && (
              <span className="notification-badge" aria-hidden="true">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <div className="avatar">
            <img src="https://ui-avatars.com/api/?name=User&background=002e69&color=fff" alt="Profile" />
          </div>
        </div>
      </div>

      <NotificationDropdown
        isOpen={showNotifications}
        onClose={handleCloseNotifications}
        notifications={getRecentNotifications(5)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onViewAllNotifications={handleViewAllNotifications}
      />
    </header>
  );
};

export default Header;