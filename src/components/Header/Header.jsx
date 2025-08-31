import React from 'react';
import Icon from '../Icon';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = ({ isMobile, onMenuToggle, isMobileSidebarOpen }) => {
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
            <Icon name={isMobileSidebarOpen ? "close" : "menu"} />
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
          <button className="icon-btn notification-btn">
            <Icon name="alert" />
            <span className="notification-badge"></span>
          </button>
          <div className="avatar">
            <img src="https://ui-avatars.com/api/?name=User&background=002e69&color=fff" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;