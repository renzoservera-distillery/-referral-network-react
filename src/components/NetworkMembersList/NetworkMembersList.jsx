import React, { useState } from 'react';
import Icon from '../Icon';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { getProfessionalAvatar } from '../../utils/avatarGenerator';
import './NetworkMembersList.css';


const NetworkMembersList = ({ members, onAddMore, onRemoveMember, onEditMember, onFiltersOpen, activeFilters = {}, onRemoveFilter, onClearFilters, hideGrowNetwork = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [layoutMode, setLayoutMode] = useState('grid'); // Layout state - only Card Grid now

  // Filter members based on search and advanced filters
  const filteredMembers = members.filter(member => {
    // Search term filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        member.name.toLowerCase().includes(search) ||
        member.firm.toLowerCase().includes(search) ||
        member.location.toLowerCase().includes(search) ||
        (member.specialties && member.specialties.some(specialty => 
          specialty.toLowerCase().includes(search)
        ))
      );
      if (!matchesSearch) return false;
    }

    // Location filter
    if (activeFilters.locations?.length > 0) {
      const matchesLocation = activeFilters.locations.some(filterLoc => 
        member.location.toLowerCase().includes(filterLoc.toLowerCase()) ||
        filterLoc.toLowerCase().includes(member.location.toLowerCase())
      );
      if (!matchesLocation) return false;
    }

    // Practice areas filter
    if (activeFilters.practiceAreas?.length > 0) {
      const matchesPractice = activeFilters.practiceAreas.some(filterArea => 
        member.specialties && member.specialties.some(specialty => 
          specialty.toLowerCase().includes(filterArea.toLowerCase())
        )
      );
      if (!matchesPractice) return false;
    }

    // Law firm filter
    if (activeFilters.lawFirms?.length > 0) {
      const matchesFirm = activeFilters.lawFirms.some(filterFirm => 
        member.firm.toLowerCase().includes(filterFirm.toLowerCase()) ||
        filterFirm.toLowerCase().includes(member.firm.toLowerCase())
      );
      if (!matchesFirm) return false;
    }

    return true;
  });

  // Helper functions for filter chips
  const hasActiveFilters = Object.keys(activeFilters).some(key => activeFilters[key]?.length > 0);
  const hasSearchTerm = searchTerm.trim().length > 0;

  // Clear functions
  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    onClearFilters();
  };

  const toggleMemberExpansion = (memberId) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  const handleRemoveClick = (member) => {
    setMemberToRemove(member);
    setShowRemoveConfirmation(true);
  };

  const handleConfirmRemove = () => {
    if (memberToRemove && onRemoveMember) {
      onRemoveMember(memberToRemove.id);
    }
    setMemberToRemove(null);
    setShowRemoveConfirmation(false);
  };

  const handleCancelRemove = () => {
    setMemberToRemove(null);
    setShowRemoveConfirmation(false);
  };

  // Calculate statistics for each member
  const getMemberStats = (member) => {
    // In a real app, this would come from the database
    const casesReferred = Math.floor(Math.random() * 50) + 10;
    const casesSigned = Math.floor(casesReferred * 0.7);
    const feePercentage = 25 + Math.floor(Math.random() * 10);
    
    return {
      casesReferred,
      casesSigned,
      feePercentage,
      conversionRate: Math.round((casesSigned / casesReferred) * 100)
    };
  };

  return (
    <div className="network-members-container">
      {/* Enhanced Compact Add to Network Section */}
      {!hideGrowNetwork && (
        <div className="compact-add-section">
          <div className="compact-add-content">
            <div className="compact-add-left">
              <div className="compact-avatars">
                <div className="compact-avatar-item">
                  <img src={getProfessionalAvatar({name: 'Alexandra Mitchell'}, 32)} alt="Attorney" />
                </div>
                <div className="compact-avatar-item">
                  <img src={getProfessionalAvatar({name: 'Brandon Lee'}, 32)} alt="Attorney" />
                </div>
                <div className="compact-avatar-item">
                  <img src={getProfessionalAvatar({name: 'Carlos Nguyen'}, 32)} alt="Attorney" />
                </div>
                <div className="compact-avatar-count">
                  <span>+47</span>
                </div>
              </div>
              <div className="compact-add-text">
                <h4>Grow Your Network</h4>
                <p>Connect with 50+ more qualified attorneys</p>
              </div>
            </div>
            <button className="btn-add-more enhanced" onClick={onAddMore}>
              Add Attorneys
            </button>
          </div>
        </div>
      )}

      {/* Network Global Stats */}
      <div className="network-stats-section">
        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="document-text" size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Referred Cases</div>
            <div className="stat-details">
              <span className="stat-number">163</span>
              <span className="stat-subtitle">20% from total</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="people" size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Matched Cases</div>
            <div className="stat-details">
              <span className="stat-number">145</span>
              <span className="stat-subtitle">89% match rate</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="clock" size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Avg Match Time</div>
            <div className="stat-details">
              <span className="stat-number">1:30h</span>
              <span className="stat-subtitle">135% faster</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon-container">
            <Icon name="checkmark-circle" size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-title">Signed Cases</div>
            <div className="stat-details">
              <span className="stat-number">58</span>
              <span className="stat-subtitle">35% sign rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="members-search-section">
        <div className="members-search-bar">
          <Icon name="search" className="search-icon" />
          <input
            type="text"
            className="members-search-input"
            placeholder="Search network members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="apply-filters-btn"
            onClick={onFiltersOpen}
          >
            <Icon name="filter" />
            <span>Filters</span>
          </button>
        </div>
        
      </div>

      {/* Filter Chips */}
      {hasActiveFilters && (
        <div className="filter-chips-section">
          <div className="filter-chips-container">
            <span className="filter-chips-label">Active Filters:</span>
            <div className="filter-chips">
              {Object.entries(activeFilters).map(([filterType, values]) =>
                values.map(value => (
                  <div key={`${filterType}-${value}`} className="filter-chip">
                    <span className="filter-chip-text">
                      {filterType === 'practiceAreas' && 'Practice: '}
                      {filterType === 'locations' && 'Location: '}
                      {filterType === 'lawFirms' && 'Firm: '}
                      {filterType === 'communities' && 'Community: '}
                      {value}
                    </span>
                    <button
                      className="filter-chip-remove"
                      onClick={() => onRemoveFilter(filterType, value)}
                      aria-label={`Remove ${value} filter`}
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ))
              )}
              {Object.keys(activeFilters).length > 1 && (
                <button
                  className="clear-all-filters-btn"
                  onClick={onClearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className={`members-list layout-${layoutMode}`}>
        {filteredMembers.length === 0 && (hasSearchTerm || hasActiveFilters) ? (
          <div className="no-search-results">
            <div className="no-results-icon">
              <Icon name="search" size={48} />
            </div>
            <h3>No network members found</h3>
            <p>We couldn't find any network members matching your search and filter criteria. Try adjusting your search terms or filters.</p>
            <div className="clear-actions">
              {hasSearchTerm && (
                <button 
                  className="btn btn-outline"
                  onClick={clearSearch}
                >
                  Clear Search
                </button>
              )}
              {hasActiveFilters && (
                <button 
                  className="btn btn-outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : filteredMembers.length > 0 ? (
            // Layout 1: Card Grid
            <div className="members-grid">
              {filteredMembers.map(member => {
                const stats = getMemberStats(member);
                return (
                  <div key={member.id} className="member-grid-card minimal">
                    <button 
                      className="btn-view-details secondary" 
                      onClick={() => toggleMemberExpansion(member.id)}
                      aria-label={`View details for ${member.name}`}
                    >
                      <Icon name={expandedMember === member.id ? 'chevron-up' : 'chevron-down'} size={16} />
                      <span>{expandedMember === member.id ? 'Hide Details' : 'View Details'}</span>
                    </button>
                    
                    <div className="member-avatar">
                      <img
                        src={getProfessionalAvatar(member, 100)}
                        alt={member.name}
                      />
                    </div>
                    <div className="member-info">
                      <h4 className="member-name">{member.name}</h4>
                      <p className="member-firm">{member.firm}</p>
                      <div className="member-referring-rules">
                        <Icon name="target-arrow" className="referring-icon" size={14} />
                        <span className="referring-rules-text">
                          {member.specialties.join(', ')} under 100K
                        </span>
                      </div>
                      <div className="member-practice-areas">
                        <Icon name="briefcase" className="practice-icon" size={14} />
                        <span className="practice-areas-text">
                          {member.specialties.join(', ')}
                        </span>
                      </div>
                      <div className="member-location-row">
                        <Icon name="location" className="location-icon" size={14} />
                        <span className="location-text">{member.location}</span>
                      </div>
                    </div>
                    
                    {expandedMember === member.id && (
                      <div className="grid-card-expanded">
                        <div className="expanded-content">
                          {/* Statistics section */}
                          <div className="statistics-section">
                            <div className="stat-item">
                              <div className="stat-value">{stats.feePercentage}%</div>
                              <div className="stat-label">Fee</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                              <div className="stat-value">{stats.casesReferred}</div>
                              <div className="stat-label">Referred</div>
                            </div>
                            <div className="stat-item">
                              <div className="stat-value">{stats.casesSigned}</div>
                              <div className="stat-label">Signed</div>
                            </div>
                            <div className="stat-item">
                              <div className="stat-value">{stats.conversionRate}%</div>
                              <div className="stat-label">Sign Rate</div>
                            </div>
                          </div>
                          
                          <div className="action-container">
                            <button 
                              className="btn-message-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Icon name="chat" size={16} />
                              <span>Message</span>
                            </button>
                            <div className="action-buttons">
                              <button 
                                className="btn-icon-text"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditMember && onEditMember(member);
                                }}
                              >
                                <Icon name="edit" size={12} />
                                <span>Edit</span>
                              </button>
                              <button 
                                className="btn-icon-text danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveClick(member);
                                }}
                              >
                                <Icon name="trash" size={12} />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
        ) : null}
      </div>

      {/* Remove Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRemoveConfirmation}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        type="danger"
        title="Remove Network Member"
        message={memberToRemove ? `Are you sure you want to remove ${memberToRemove.name} from your referral network? This action cannot be undone.` : ''}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};

export default NetworkMembersList;