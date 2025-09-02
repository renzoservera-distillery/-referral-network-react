import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext();

// Action types
const NOTIFICATION_ACTIONS = {
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING'
};

// Initial state
const initialState = {
  notifications: [],
  loading: false,
  error: null
};

// Reducer
function notificationReducer(state, action) {
  switch (action.type) {
    case NOTIFICATION_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    
    case NOTIFICATION_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    
    case NOTIFICATION_ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, unread: false }
            : notification
        )
      };
    
    case NOTIFICATION_ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          unread: false
        }))
      };
    
    case NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    case NOTIFICATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
}

// Mock data for demonstration
const mockNotifications = [
  {
    id: '1',
    type: 'success',
    title: 'New Invitation',
    message: '[Seller Attorney] invited you to a referral - let them know if you\'re interested.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    unread: true,
    senderName: 'Seller Attorney',
    avatar: null
  },
  {
    id: '2',
    type: 'info',
    title: 'Referral Status Update Requested',
    message: '[Seller Attorney] requested a status update for [Client name].',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    unread: true,
    senderName: 'Seller Attorney',
    avatar: 'https://ui-avatars.com/api/?name=SA&background=002e69&color=fff&size=36'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Waterfall Invitation Expired',
    message: 'The referral invitation from [Seller Attorney] has expired.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    unread: false,
    senderName: 'System',
    avatar: null
  },
  {
    id: '4',
    type: 'error',
    title: 'Referral Removed',
    message: 'Your referral for [client name] has been removed.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    unread: false,
    senderName: 'System',
    avatar: null
  }
];

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Initialize with mock data
  useEffect(() => {
    dispatch({
      type: NOTIFICATION_ACTIONS.SET_NOTIFICATIONS,
      payload: mockNotifications
    });
  }, []);

  // Actions
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      unread: true
    };
    dispatch({
      type: NOTIFICATION_ACTIONS.ADD_NOTIFICATION,
      payload: newNotification
    });
  };

  const markAsRead = (id) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.MARK_AS_READ,
      payload: id
    });
  };

  const markAllAsRead = () => {
    dispatch({
      type: NOTIFICATION_ACTIONS.MARK_ALL_AS_READ
    });
  };

  const removeNotification = (id) => {
    dispatch({
      type: NOTIFICATION_ACTIONS.REMOVE_NOTIFICATION,
      payload: id
    });
  };

  // Helper functions
  const getUnreadCount = () => {
    return state.notifications.filter(n => n.unread).length;
  };

  const getRecentNotifications = (limit = 5) => {
    return state.notifications.slice(0, limit);
  };

  const value = {
    notifications: state.notifications,
    loading: state.loading,
    error: state.error,
    unreadCount: getUnreadCount(),
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getRecentNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;