import React, { useState } from 'react';
import AttorneyCarousel from '../../components/AttorneyCarousel/AttorneyCarousel';
import NetworkModal from '../../components/NetworkModal/NetworkModal';
import AddAttorneysModal from '../../components/AddAttorneysModal';
import AddToNetworkModal from '../../components/AddToNetworkModal/AddToNetworkModal';
import NetworkMembersList from '../../components/NetworkMembersList';
import FiltersModal from '../../components/FiltersModal';
import Icon from '../../components/Icon';
import { AttorneyCardSkeleton, NetworkMemberSkeleton } from '../../components/Skeleton/Skeleton';
import { attorneyData, categoryNames } from '../../data/attorneys';
import './MyNetwork.css';

const MyNetwork = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAttorneysModalOpen, setIsAddAttorneysModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [selectedMemberForEdit, setSelectedMemberForEdit] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [networkMembers, setNetworkMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isCarouselsLoading, setIsCarouselsLoading] = useState(false);
  const [isNetworkMembersLoading, setIsNetworkMembersLoading] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(true);

  // Simulate initial data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsNetworkMembersLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveSettings = (settings) => {
    console.log('Settings saved:', settings);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddAttorneys = (attorneys) => {
    setNetworkMembers([...networkMembers, ...attorneys]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddSingleAttorney = (networkSettings) => {
    const newMember = {
      ...networkSettings.attorney,
      id: Date.now() + Math.random(), // Generate unique ID
      feePercentage: networkSettings.feePercentage,
      caseTypes: networkSettings.caseTypes,
      locations: networkSettings.locations || []
    };
    setNetworkMembers([...networkMembers, newMember]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleRemoveMember = (memberId) => {
    setNetworkMembers(networkMembers.filter(member => member.id !== memberId));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleEditMember = (member) => {
    setSelectedMemberForEdit(member);
    setIsEditMemberModalOpen(true);
  };

  const handleUpdateMember = (updatedSettings) => {
    const updatedMembers = networkMembers.map(member => 
      member.id === selectedMemberForEdit.id 
        ? { 
            ...member, 
            feePercentage: updatedSettings.feePercentage,
            caseTypes: updatedSettings.caseTypes,
            locations: updatedSettings.locations 
          }
        : member
    );
    setNetworkMembers(updatedMembers);
    setIsEditMemberModalOpen(false);
    setSelectedMemberForEdit(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const dismissHowItWorks = () => {
    setShowHowItWorks(false);
  };

  const showHowItWorksCard = () => {
    setShowHowItWorks(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setIsSearchLoading(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setSearchTerm(value);
      setIsSearchLoading(false);
    }, 300);
  };

  const handleFiltersApply = (filters) => {
    setIsSearchLoading(true);
    setActiveFilters(filters);
    setIsFiltersModalOpen(false);
    
    // Simulate filter processing delay
    setTimeout(() => {
      setIsSearchLoading(false);
    }, 500);
  };

  return (
    <main className="content-area">
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          Network settings saved successfully!
        </div>
      )}

      <div className="page-header">
        <h1>My Referral Network</h1>
        <p>Create a private network for your firm. Our AI-powered system distributes referrals across your network to ensure quick matches.</p>
      </div>

      {/* Network Settings Card */}
      <div className="card">
        <div className="card-content">
          <div className="settings-row">
            <div className="settings-info">
              <h3>Network Settings</h3>
              <p>Set how your Network members will access your referrals</p>
            </div>
            <button 
              className="btn btn-outline"
              onClick={() => setIsModalOpen(true)}
            >
              Network Settings
            </button>
          </div>
        </div>
      </div>

      {/* How it Works Card */}
      {showHowItWorks ? (
        <div className="card dismissible">
          <button className="dismiss-btn" onClick={dismissHowItWorks}>
            <Icon name="close" size={16} />
          </button>
          <div className="card-content">
            <h3>How it works</h3>
            <div className="how-it-works">
              <div className="step">
                <div className="step-icon">
                  <Icon name="person-add" size={24} />
                </div>
                <p>Build your Network by adding attorneys and setting the types of cases you want to refer to them.</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <Icon name="person-arrow-back" size={24} />
                </div>
                <p>When you share a referral with your network, our AI prioritizes the most relevant attorneys in your Network (using your settings) for quick, accurate matches.</p>
              </div>
              <div className="step">
                <div className="step-icon">
                  <Icon name="people-team-toolbox" size={24} />
                </div>
                <p>If no match is made within your set timeframe, the referral automatically moves to the Marketplace.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="how-it-works-collapsed-minimal">
          <div className="minimal-process-content">
            <div className="process-header">
              <div className="process-title-section">
                <div className="process-title-text">
                  <span className="process-label">How it Works</span>
                  <span className="process-subtitle">3 Steps for a smarter referring process</span>
                </div>
              </div>
              <button 
                className="expand-process-btn"
                onClick={showHowItWorksCard}
                aria-label="Expand process details"
              >
                <span className="expand-text">Learn More</span>
                <Icon name="chevron-down" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Network Members Card */}
      <div className="card">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => setActiveTab('members')}
          >
            NETWORK MEMBERS
          </button>
          <button 
            className={`tab ${activeTab === 'expand' ? 'active' : ''}`}
            onClick={() => setActiveTab('expand')}
          >
            <Icon name="search" />
            EXPAND YOUR NETWORK
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'members' && (
            isNetworkMembersLoading ? (
              <div className="network-members-loading">
                <NetworkMemberSkeleton />
                <NetworkMemberSkeleton />
                <NetworkMemberSkeleton />
              </div>
            ) : networkMembers.length > 0 ? (
              <NetworkMembersList 
                members={networkMembers}
                onAddMore={() => setIsAddAttorneysModalOpen(true)}
                onRemoveMember={handleRemoveMember}
                onEditMember={handleEditMember}
              />
            ) : (
              <div className="empty-state">
                <div className="empty-state-content">
                  <div className="avatar-showcase">
                    <div className="avatar-grid">
                      <div className="avatar-item featured">
                        <img src="https://ui-avatars.com/api/?name=MW&background=1e40af&color=fff&size=64" alt="Michael Wilson" />
                      </div>
                      <div className="avatar-item">
                        <img src="https://ui-avatars.com/api/?name=CR&background=dc2626&color=fff&size=48" alt="Charles Rittgers" />
                      </div>
                      <div className="avatar-item">
                        <img src="https://ui-avatars.com/api/?name=MH&background=059669&color=fff&size=48" alt="Madison Hayes" />
                      </div>
                      <div className="avatar-item">
                        <img src="https://ui-avatars.com/api/?name=JD&background=7c3aed&color=fff&size=48" alt="John Doe" />
                      </div>
                      <div className="avatar-item">
                        <img src="https://ui-avatars.com/api/?name=LS&background=ea580c&color=fff&size=48" alt="Lisa Smith" />
                      </div>
                      <div className="avatar-item">
                        <img src="https://ui-avatars.com/api/?name=RB&background=0891b2&color=fff&size=48" alt="Robert Brown" />
                      </div>
                    </div>
                    <div className="network-stats">
                      <div className="stat-badge">
                        <Icon name="people-team" />
                        <span>500+ Attorneys Available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="empty-state-text">
                    <h3>Build Your Referral Network</h3>
                    <p className="empty-description">
                      Connect with top-rated attorneys from your Waterfall Referrals™ and grow your professional network. 
                      Start building meaningful partnerships that drive results.
                    </p>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="btn btn-primary enhanced"
                      onClick={() => setIsAddAttorneysModalOpen(true)}
                    >
                      <Icon name="person-add" />
                      Build My Network
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setActiveTab('expand')}
                    >
                      <Icon name="search" />
                      Explore Attorneys
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
          
          {activeTab === 'expand' && (
            <div className="expand-network-container">
              <div className="search-section">
                <div className="search-bar">
                  <Icon name="search" className="search-icon" />
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search for Attorneys..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button 
                    className="apply-filters-btn"
                    onClick={() => setIsFiltersModalOpen(true)}
                  >
                    <Icon name="filter" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              <div className="attorneys-sections">
                {isSearchLoading ? (
                  // Show skeleton loading for carousels
                  Object.keys(attorneyData).map(categoryKey => (
                    <section key={`skeleton-${categoryKey}`} className="attorney-section">
                      <h3 className="section-title">{categoryNames[categoryKey]}</h3>
                      <div className="carousel-skeleton">
                        <AttorneyCardSkeleton />
                        <AttorneyCardSkeleton />
                      </div>
                    </section>
                  ))
                ) : (
                  Object.entries(attorneyData).map(([categoryKey, attorneys]) => {
                  // Filter attorneys based on search term and active filters
                  const filteredAttorneys = attorneys.filter(attorney => {
                    // Search term filter
                    if (searchTerm.trim()) {
                      const search = searchTerm.toLowerCase();
                      const matchesSearch = (
                        attorney.name.toLowerCase().includes(search) ||
                        attorney.firm.toLowerCase().includes(search) ||
                        attorney.location.toLowerCase().includes(search) ||
                        attorney.specialties.some(specialty => 
                          specialty.toLowerCase().includes(search)
                        )
                      );
                      if (!matchesSearch) return false;
                    }

                    // Location filter
                    if (activeFilters.locations?.length > 0) {
                      const matchesLocation = activeFilters.locations.some(filterLoc => 
                        attorney.location.toLowerCase().includes(filterLoc.toLowerCase()) ||
                        filterLoc.toLowerCase().includes(attorney.location.toLowerCase())
                      );
                      if (!matchesLocation) return false;
                    }

                    // Practice areas filter
                    if (activeFilters.practiceAreas?.length > 0) {
                      const matchesPractice = activeFilters.practiceAreas.some(filterArea => 
                        attorney.specialties.some(specialty => 
                          specialty.toLowerCase().includes(filterArea.toLowerCase())
                        )
                      );
                      if (!matchesPractice) return false;
                    }

                    // Law firm name filter
                    if (activeFilters.lawFirms?.length > 0) {
                      const matchesFirm = activeFilters.lawFirms.some(filterFirm => 
                        attorney.firm.toLowerCase().includes(filterFirm.toLowerCase()) ||
                        filterFirm.toLowerCase().includes(attorney.firm.toLowerCase())
                      );
                      if (!matchesFirm) return false;
                    }

                    // Community filter
                    if (activeFilters.communities?.length > 0) {
                      // For demo purposes, we'll assume attorneys have a 'communities' property
                      // In a real app, this would be part of the attorney data
                      // For now, we'll randomly assign some attorneys to communities
                      const attorneyId = attorney.name.length + attorney.firm.length;
                      const hasMatchingCommunity = attorneyId % 3 === 0; // Mock community matching
                      if (!hasMatchingCommunity && activeFilters.communities.length > 0) {
                        // Only filter out if there's no match and communities are selected
                        // This is a simplified implementation for demo
                      }
                    }
                    
                    return true;
                  });
                  
                  // Only show carousel if there are filtered attorneys
                  if (filteredAttorneys.length === 0 && searchTerm.trim()) {
                    return null;
                  }
                  
                  return (
                    <AttorneyCarousel
                      key={categoryKey}
                      attorneys={filteredAttorneys}
                      categoryId={categoryKey}
                      title={categoryNames[categoryKey]}
                      onAttorneyAdd={handleAddSingleAttorney}
                    />
                  );
                  })
                )}
                
                {/* Show no results message if no attorneys match filters */}
                {(searchTerm.trim() || Object.keys(activeFilters).some(key => 
                   activeFilters[key]?.length > 0
                 )) && 
                 Object.entries(attorneyData).every(([categoryKey, attorneys]) => {
                   return attorneys.filter(attorney => {
                     // Apply same filtering logic as above
                     if (searchTerm.trim()) {
                       const search = searchTerm.toLowerCase();
                       const matchesSearch = (
                         attorney.name.toLowerCase().includes(search) ||
                         attorney.firm.toLowerCase().includes(search) ||
                         attorney.location.toLowerCase().includes(search) ||
                         attorney.specialties.some(specialty => 
                           specialty.toLowerCase().includes(search)
                         )
                       );
                       if (!matchesSearch) return false;
                     }

                     if (activeFilters.locations?.length > 0) {
                       const matchesLocation = activeFilters.locations.some(filterLoc => 
                         attorney.location.toLowerCase().includes(filterLoc.toLowerCase()) ||
                         filterLoc.toLowerCase().includes(attorney.location.toLowerCase())
                       );
                       if (!matchesLocation) return false;
                     }

                     if (activeFilters.practiceAreas?.length > 0) {
                       const matchesPractice = activeFilters.practiceAreas.some(filterArea => 
                         attorney.specialties.some(specialty => 
                           specialty.toLowerCase().includes(filterArea.toLowerCase())
                         )
                       );
                       if (!matchesPractice) return false;
                     }

                     if (activeFilters.lawFirms?.length > 0) {
                       const matchesFirm = activeFilters.lawFirms.some(filterFirm => 
                         attorney.firm.toLowerCase().includes(filterFirm.toLowerCase()) ||
                         filterFirm.toLowerCase().includes(attorney.firm.toLowerCase())
                       );
                       if (!matchesFirm) return false;
                     }

                     if (activeFilters.communities?.length > 0) {
                       const attorneyId = attorney.name.length + attorney.firm.length;
                       const hasMatchingCommunity = attorneyId % 3 === 0;
                       if (!hasMatchingCommunity && activeFilters.communities.length > 0) {
                         // Simplified community matching for demo
                       }
                     }

                     return true;
                   }).length === 0;
                 }) && (
                  <div className="no-search-results">
                    <div className="no-results-icon">
                      <Icon name="search" size={48} />
                    </div>
                    <h3>No attorneys found</h3>
                    <p>We couldn't find any attorneys matching your search and filter criteria. Try adjusting your search terms or filters.</p>
                    <div className="clear-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => setSearchTerm('')}
                      >
                        Clear Search
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => setActiveFilters({})}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Network Modal */}
      <NetworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSettings}
      />

      {/* Add Attorneys Modal */}
      <AddAttorneysModal
        isOpen={isAddAttorneysModalOpen}
        onClose={() => setIsAddAttorneysModalOpen(false)}
        onAdd={handleAddAttorneys}
      />

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApply={handleFiltersApply}
        currentFilters={activeFilters}
      />

      {/* Edit Member Modal */}
      {selectedMemberForEdit && (
        <AddToNetworkModal
          isOpen={isEditMemberModalOpen}
          onClose={() => {
            setIsEditMemberModalOpen(false);
            setSelectedMemberForEdit(null);
          }}
          attorney={selectedMemberForEdit}
          onAdd={handleUpdateMember}
          isEditMode={true}
          initialData={{
            feePercentage: selectedMemberForEdit.feePercentage || 25,
            caseTypes: selectedMemberForEdit.caseTypes || [''],
            locations: selectedMemberForEdit.locations || []
          }}
        />
      )}
    </main>
  );
};

export default MyNetwork;