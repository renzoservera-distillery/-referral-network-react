import React from 'react';
import Icon from '../Icon';
import './Sidebar.css';

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'my-network', icon: 'person-ribbon', label: 'My Referral Network' },
    { id: 'waterfall-referrals', icon: 'layer-diagonal-person', label: 'Waterfall Referrals' },
    { id: 'members-directory', icon: 'person-search', label: 'Members Directory' }
  ];

  const handleItemClick = (e, itemId) => {
    e.preventDefault();
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <a 
            key={item.id}
            href="#" 
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={(e) => handleItemClick(e, item.id)}
            aria-current={activeItem === item.id ? 'page' : undefined}
          >
            <Icon name={item.icon} className="menu-icon" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;