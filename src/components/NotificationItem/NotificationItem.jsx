import React from 'react';
import Icon from '../Icon';
import './NotificationItem.css';

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  showReadButton = true 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'checkmark-circle', bgColor: '#cffed7' };
      case 'warning':
        return { name: 'clock-dismiss', bgColor: '#ffe3e7' };
      case 'error':
        return { name: 'document-dismiss', bgColor: '#ffe3e7' };
      case 'info':
      default:
        return { name: 'checkmark-circle', bgColor: '#cffed7' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const iconConfig = getNotificationIcon(notification.type);

  return (
    <div className="notification-item">
      <div className="notification-border" />
      
      {notification.avatar ? (
        <div className="notification-image-container">
          <div className="notification-avatar">
            <img 
              src={notification.avatar} 
              alt={notification.senderName || 'User'} 
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.senderName || 'U')}&background=002e69&color=fff&size=36`;
              }}
            />
          </div>
        </div>
      ) : (
        <div className="notification-image-container">
          <div 
            className="notification-icon"
            style={{ backgroundColor: iconConfig.bgColor }}
          >
            <Icon name={iconConfig.name} size={20} />
          </div>
        </div>
      )}
      
      <div className="notification-message-container">
        <div className="notification-message">
          <div className="notification-title-container">
            <div className="notification-title">
              {notification.title}
            </div>
            {notification.unread && (
              <div className="notification-status-container">
                {showReadButton && (
                  <button 
                    className="notification-mark-read-btn"
                    onClick={() => onMarkAsRead(notification.id)}
                    title="Mark as Read"
                  >
                    <Icon name="checkmark" size={16} />
                  </button>
                )}
                <div className="notification-unread-dot" />
              </div>
            )}
          </div>
          
          <div className="notification-text">
            {notification.message}
          </div>
        </div>
        
        <div className="notification-timestamp">
          <span>{formatTimeAgo(notification.timestamp)}</span>
          <span>{formatTimestamp(notification.timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;