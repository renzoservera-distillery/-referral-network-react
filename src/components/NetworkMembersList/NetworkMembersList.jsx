import React, { useState } from 'react';
import Icon from '../Icon';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { getProfessionalAvatar } from '../../utils/avatarGenerator';
import './NetworkMembersList.css';

// Sample client data for expanded view
const sampleClients = [
  { id: 1, name: 'Sarah Johnson', caseType: 'Personal Injury', date: '2024-03-15', status: 'Signed' },
  { id: 2, name: 'Michael Chen', caseType: 'Car Accident', date: '2024-03-10', status: 'Matched' },
  { id: 3, name: 'Emily Davis', caseType: 'Medical Malpractice', date: '2024-02-28', status: 'Signed' },
  { id: 4, name: 'Robert Wilson', caseType: 'Slip & Fall', date: '2024-02-15', status: 'Not Matched' },
  { id: 5, name: 'Lisa Anderson', caseType: 'Workers Comp', date: '2024-01-20', status: 'Active' },
];

const NetworkMembersList = ({ members, onAddMore, onRemoveMember, onEditMember, onFiltersOpen, activeFilters = {}, onRemoveFilter, onClearFilters, hideGrowNetwork = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

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
      <div className="members-list">
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
                  </div>
                  
                  <div className="member-stats">
                    <div className="stat-item">
                      <span className="stat-value">{stats.feePercentage}%</span>
                      <span className="stat-label">Fee</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{stats.casesReferred}</span>
                      <span className="stat-label">Referred</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{stats.casesSigned}</span>
                      <span className="stat-label">Signed</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value success">{stats.conversionRate}%</span>
                      <span className="stat-label">Rate</span>
                    </div>
                  </div>
                  
                  <div className="expand-icon">
                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="member-details">
                    {/* Clients Table - Now First */}
                    <div className="clients-section">
                      <h5>Recent Clients</h5>
                      <div className="clients-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Client Name</th>
                              <th>Case Type</th>
                              <th>Referred</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sampleClients.map(client => (
                              <tr key={client.id}>
                                <td>
                                  <a 
                                    href="#" 
                                    className="client-name-link"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      // Handle client profile navigation here
                                      console.log('Navigate to client profile:', client.name);
                                    }}
                                  >
                                    {client.name}
                                  </a>
                                </td>
                                <td>{client.caseType}</td>
                                <td>{client.date}</td>
                                <td>
                                  <span className={`status-badge ${client.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {client.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Practice Areas and Location - Now Below */}
                    <div className="details-header">
                      <div className="detail-section">
                        <div className="detail-with-icon">
                          <Icon name="briefcase" size={14} />
                          <span className="detail-value">{member.specialties.join(', ')}</span>
                        </div>
                      </div>
                      
                      <div className="detail-section">
                        <div className="detail-with-icon">
                          <Icon name="location" size={14} />
                          <span className="detail-value">{member.location}</span>
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