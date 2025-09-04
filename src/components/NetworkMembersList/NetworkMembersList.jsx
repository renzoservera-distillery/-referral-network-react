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
  const [layoutMode, setLayoutMode] = useState('default'); // Layout state

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
        
        {/* Layout Switcher */}
        <div className="layout-switcher">
          <label htmlFor="layout-select">View:</label>
          <select 
            id="layout-select"
            className="layout-select" 
            value={layoutMode} 
            onChange={(e) => setLayoutMode(e.target.value)}
          >
            <option value="default">Default List</option>
            <option value="grid">Card Grid</option>
            <option value="visual">Visual Cards</option>
            <option value="preview">List with Preview</option>
            <option value="table">Compact Table</option>
          </select>
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
          layoutMode === 'grid' ? (
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
                      <div className="member-fee-badge">
                        <span>Fee: {stats.feePercentage}%</span>
                      </div>
                    </div>
                    
                    {/* Performance metrics bar */}
                    <div className="member-metrics-bar">
                      <div className="performance-section">
                        <div className="perf-metric-item">
                          <span className="perf-metric-value">{stats.casesReferred}</span>
                          <span className="perf-metric-label">Referred</span>
                        </div>
                        <div className="perf-divider"></div>
                        <div className="perf-metric-item">
                          <span className="perf-metric-value">{stats.casesSigned}</span>
                          <span className="perf-metric-label">Signed</span>
                        </div>
                        <div className="perf-divider"></div>
                        <div className="perf-metric-item highlight">
                          <span className="perf-metric-value">{stats.conversionRate}%</span>
                          <span className="perf-metric-label">Rate</span>
                          <div 
                            className="perf-metric-indicator" 
                            data-performance={stats.conversionRate >= 75 ? 'high' : stats.conversionRate >= 50 ? 'medium' : 'low'}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {expandedMember === member.id && (
                      <div className="grid-card-expanded">
                        <div className="expanded-content">
                          <div className="actions-row">
                            <button 
                              className="btn-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditMember && onEditMember(member);
                              }}
                            >
                              <Icon name="edit" size={16} />
                              Edit Settings
                            </button>
                            <button className="btn-action">
                              <Icon name="chat" size={16} />
                              Send Message
                            </button>
                            <button 
                              className="btn-action danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveClick(member);
                              }}
                            >
                              <Icon name="trash" size={16} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : layoutMode === 'visual' ? (
            // Layout 2: Visual Cards
            <div className="members-visual-cards">
              {filteredMembers.map(member => {
                const stats = getMemberStats(member);
                const isExpanded = expandedMember === member.id;
                
                return (
                  <div key={member.id} className={`visual-card ${isExpanded ? 'expanded' : ''}`}>
                    <div className="visual-card-main">
                      <div className="visual-card-left">
                        <img 
                          src={getProfessionalAvatar(member, 96)}
                          alt={member.name}
                          className="visual-avatar"
                        />
                      </div>
                      
                      <div className="visual-card-center">
                        <h3 className="visual-name">{member.name}</h3>
                        <p className="visual-firm">{member.firm}</p>
                        
                        <div className="visual-info">
                          <div className="visual-info-row">
                            <Icon name="location" size={16} />
                            <span>{member.location}</span>
                          </div>
                          <div className="visual-info-row">
                            <Icon name="briefcase" size={16} />
                            <span>{member.specialties.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="member-fee-badge">
                          <span>Fee: {stats.feePercentage}%</span>
                        </div>
                        
                        <div className="preview-performance-section">
                          <div className="preview-performance-grid">
                            <div className="preview-perf-card">
                              <span className="preview-perf-value">{stats.casesReferred}</span>
                              <span className="preview-perf-label">Referred</span>
                            </div>
                            <div className="preview-perf-card">
                              <span className="preview-perf-value">{stats.casesSigned}</span>
                              <span className="preview-perf-label">Signed</span>
                            </div>
                            <div className="preview-perf-card conversion" data-performance={stats.conversionRate >= 70 ? 'high' : stats.conversionRate >= 50 ? 'medium' : 'low'}>
                              <span className="preview-perf-value conversion">{stats.conversionRate}%</span>
                              <span className="preview-perf-label">Rate</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="visual-card-right">
                        <button 
                          className="visual-action-btn primary"
                          onClick={() => toggleMemberExpansion(member.id)}
                        >
                          <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} />
                          View Details
                        </button>
                        <button 
                          className="visual-action-btn"
                          onClick={() => onEditMember && onEditMember(member)}
                        >
                          <Icon name="edit" size={16} />
                          Edit
                        </button>
                        <button className="visual-action-btn">
                          <Icon name="chat" size={16} />
                          Message
                        </button>
                        <button 
                          className="visual-action-btn danger"
                          onClick={() => handleRemoveClick(member)}
                        >
                          <Icon name="trash" size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="visual-card-details">
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : layoutMode === 'preview' ? (
            // Layout 3: List with Preview
            filteredMembers.map(member => {
              const stats = getMemberStats(member);
              const isExpanded = expandedMember === member.id;
              
              return (
                <div key={member.id} className={`preview-member-card ${isExpanded ? 'expanded' : ''}`}>
                  <div 
                    className="preview-row"
                    onClick={() => toggleMemberExpansion(member.id)}
                  >
                    <div className="preview-left">
                      <div className="preview-avatar">
                        <img 
                          src={getProfessionalAvatar(member, 56)}
                          alt={member.name}
                        />
                      </div>
                      
                      <div className="preview-info">
                        <h4>{member.name}</h4>
                        <p className="preview-firm">{member.firm}</p>
                        <div className="preview-meta">
                          <span className="preview-location">
                            <Icon name="location" size={12} />
                            {member.location}
                          </span>
                          <span className="preview-specialties">
                            <Icon name="briefcase" size={12} />
                            {member.specialties.join(', ')}
                          </span>
                        </div>
                        <div className="member-fee-badge">
                          <span>Fee: {stats.feePercentage}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="preview-right">
                      <div className="preview-performance-section">
                        <div className="preview-performance-grid">
                          <div className="preview-perf-card">
                            <span className="preview-perf-value">{stats.casesReferred}</span>
                            <span className="preview-perf-label">Referred</span>
                          </div>
                          <div className="preview-perf-card">
                            <span className="preview-perf-value">{stats.casesSigned}</span>
                            <span className="preview-perf-label">Signed</span>
                          </div>
                          <div className="preview-perf-card conversion" data-performance={stats.conversionRate >= 70 ? 'high' : stats.conversionRate >= 50 ? 'medium' : 'low'}>
                            <span className="preview-perf-value conversion">{stats.conversionRate}%</span>
                            <span className="preview-perf-label">Rate</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="expand-icon">
                        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="member-details">

                      <div className="member-actions">
                        <button 
                          className="btn-edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditMember && onEditMember(member);
                          }}
                        >
                          <Icon name="edit" size={16} />
                          Edit Settings
                        </button>
                        <button className="btn-message">
                          <Icon name="chat" size={16} />
                          Send Message
                        </button>
                        <button 
                          className="btn-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveClick(member);
                          }}
                        >
                          <Icon name="trash" size={16} />
                          Remove from Network
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : layoutMode === 'table' ? (
            // Layout 4: Compact Table
            <div className="members-table-container">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>Attorney</th>
                    <th>Law Firm</th>
                    <th>Fee</th>
                    <th>Referred</th>
                    <th>Signed</th>
                    <th>Rate</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map(member => {
                    const stats = getMemberStats(member);
                    const isExpanded = expandedMember === member.id;
                    
                    return (
                      <React.Fragment key={member.id}>
                        <tr 
                          className={`table-row ${isExpanded ? 'expanded' : ''}`}
                          onClick={() => toggleMemberExpansion(member.id)}
                        >
                          <td className="attorney-cell">
                            <div className="attorney-info">
                              <img 
                                src={getProfessionalAvatar(member, 40)}
                                alt={member.name}
                                className="table-avatar"
                              />
                              <span className="attorney-name">{member.name}</span>
                            </div>
                          </td>
                          <td className="firm-cell">{member.firm}</td>
                          <td className="fee-cell">
                            <span className="fee-badge">{stats.feePercentage}%</span>
                          </td>
                          <td className="stat-cell">{stats.casesReferred}</td>
                          <td className="stat-cell">{stats.casesSigned}</td>
                          <td className="rate-cell">
                            <span className="rate-value success">{stats.conversionRate}%</span>
                          </td>
                          <td className="expand-cell">
                            <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} />
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="table-expanded-row">
                            <td colSpan="7" className="expanded-content">
                              <div className="member-details">
{/* Referring Rules Section */}
                                <div className="referring-rules-section">
                                  <h5>Referring Rules</h5>
                                  <div className="details-header">
                                    <div className="detail-section">
                                      <div className="detail-with-icon">
                                        <Icon name="briefcase" size={14} />
                                        <span className="detail-label">Case Types:</span>
                                        <span className="detail-value">{member.specialties.join(', ')}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="detail-section">
                                      <div className="detail-with-icon">
                                        <Icon name="location" size={14} />
                                        <span className="detail-label">Locations:</span>
                                        <span className="detail-value">{member.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="member-actions">
                                  <button 
                                    className="btn-edit"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEditMember && onEditMember(member);
                                    }}
                                  >
                                    <Icon name="edit" size={16} />
                                    Edit Settings
                                  </button>
                                  <button className="btn-message">
                                    <Icon name="chat" size={16} />
                                    Send Message
                                  </button>
                                  <button 
                                    className="btn-remove"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveClick(member);
                                    }}
                                  >
                                    <Icon name="trash" size={16} />
                                    Remove from Network
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
          filteredMembers.map(member => {
            const stats = getMemberStats(member);
            const isExpanded = expandedMember === member.id;
            
            return (
              <div key={member.id} className={`member-card ${isExpanded ? 'expanded' : ''}`}>
                {/* Member Row */}
                <div 
                  className="member-row"
                  onClick={() => toggleMemberExpansion(member.id)}
                >
                  <div className="member-avatar">
                    <img 
                      src={getProfessionalAvatar(member, 64)}
                      alt={member.name}
                    />
                  </div>
                  
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <p className="member-firm">{member.firm}</p>
                    <div className="member-fee-badge">
                      <span>Fee: {stats.feePercentage}%</span>
                    </div>
                  </div>
                  
                  <div className="member-performance">
                    <div className="performance-stats">
                      <div className="perf-stat-item">
                        <span className="perf-stat-value">{stats.casesReferred}</span>
                        <span className="perf-stat-label">Referred</span>
                      </div>
                      <div className="perf-stat-item">
                        <span className="perf-stat-value">{stats.casesSigned}</span>
                        <span className="perf-stat-label">Signed</span>
                      </div>
                      <div className="perf-stat-item">
                        <span className="perf-stat-value success">{stats.conversionRate}%</span>
                        <span className="perf-stat-label">Rate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="expand-icon">
                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="member-details">
{/* Referring Rules Section */}
                    <div className="referring-rules-section">
                      <h5>Referring Rules</h5>
                      <div className="details-header">
                        <div className="detail-section">
                          <div className="detail-with-icon">
                            <Icon name="briefcase" size={14} />
                            <span className="detail-label">Case Types:</span>
                            <span className="detail-value">{member.specialties.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="detail-section">
                          <div className="detail-with-icon">
                            <Icon name="location" size={14} />
                            <span className="detail-label">Locations:</span>
                            <span className="detail-value">{member.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="member-actions">
                      <button 
                        className="btn-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMember && onEditMember(member);
                        }}
                      >
                        <Icon name="edit" size={16} />
                        Edit Settings
                      </button>
                      <button className="btn-message">
                        <Icon name="chat" size={16} />
                        Send Message
                      </button>
                      <button 
                        className="btn-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveClick(member);
                        }}
                      >
                        <Icon name="trash" size={16} />
                        Remove from Network
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )) : null}
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