import React, { useEffect, useRef } from 'react';
import Icon from '../Icon';
import NotificationItem from '../NotificationItem/NotificationItem';
import './NotificationDropdown.css';

const NotificationDropdown = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  onMarkAsRead, 
  onMarkAllAsRead,
  onViewAllNotifications 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="notification-dropdown-overlay">
      <div 
        ref={dropdownRef}
        className="notification-dropdown"
        role="dialog"
        aria-labelledby="notifications-title"
        aria-modal="true"
      >
        <div className="notification-dropdown-content">
          {/* Header */}
          <div className="notification-header">
            <h3 id="notifications-title" className="notification-title">
              Notifications ({unreadCount})
            </h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={onMarkAllAsRead}
              >
                <Icon name="checkmark" size={12} />
                <span>Mark all as read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Icon name="bell" size={48} />
                <p>No notifications yet</p>
                <span>You're all caught up!</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  showReadButton={notification.unread}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="notification-footer">
              <button 
                className="view-all-btn"
                onClick={onViewAllNotifications}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Tooltip for Mark as Read (when hovering) */}
        <div className="notification-tooltip" id="mark-read-tooltip">
          Mark as Read
        </div>

        {/* Pointer indicator */}
        <div className="notification-pointer" />
      </div>
    </div>
  );
};

export default NotificationDropdown;