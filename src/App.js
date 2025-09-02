import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MyNetwork from './pages/MyNetwork/MyNetwork';
import { NotificationProvider } from './contexts/NotificationContext';
import bodyScrollManager from './utils/bodyScrollManager';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('my-network');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileSidebarOpen(false);
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    
    // Ensure body scroll is reset on app load
    bodyScrollManager.forceUnlock();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up on unmount
      bodyScrollManager.forceUnlock();
    };
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarItemClick = (itemId) => {
    setActiveView(itemId);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <NotificationProvider>
      <div className="app-container">
        <Header 
          isMobile={isMobile}
          onMenuToggle={toggleMobileSidebar}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        <div className="main-content">
          {(showSidebar && !isMobile) && (
            <Sidebar 
              activeItem={activeView}
              onItemClick={handleSidebarItemClick}
            />
          )}
          {/* Mobile Sidebar Overlay */}
          {isMobile && isMobileSidebarOpen && (
            <div className="mobile-sidebar-overlay" onClick={() => setIsMobileSidebarOpen(false)}>
              <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
                <Sidebar 
                  activeItem={activeView}
                  onItemClick={handleSidebarItemClick}
                />
              </div>
            </div>
          )}
          <div className="page-content">
            {activeView === 'my-network' && <MyNetwork />}
            {activeView === 'waterfall-referrals' && <div className="page-placeholder">Waterfall Referrals - Coming Soon</div>}
            {activeView === 'members-directory' && <div className="page-placeholder">Members Directory - Coming Soon</div>}
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App;