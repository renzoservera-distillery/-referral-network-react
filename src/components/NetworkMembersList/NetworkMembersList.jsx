import React, { useState } from 'react';
import Icon from '../Icon';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './NetworkMembersList.css';

// Sample client data for expanded view
const sampleClients = [
  { id: 1, name: 'Sarah Johnson', caseType: 'Personal Injury', date: '2024-03-15', status: 'Signed' },
  { id: 2, name: 'Michael Chen', caseType: 'Car Accident', date: '2024-03-10', status: 'Matched' },
  { id: 3, name: 'Emily Davis', caseType: 'Medical Malpractice', date: '2024-02-28', status: 'Signed' },
  { id: 4, name: 'Robert Wilson', caseType: 'Slip & Fall', date: '2024-02-15', status: 'Not Matched' },
  { id: 5, name: 'Lisa Anderson', caseType: 'Workers Comp', date: '2024-01-20', status: 'Active' },
];

const NetworkMembersList = ({ members, onAddMore, onRemoveMember, onEditMember }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  // Filter members based on search
  const filteredMembers = members.filter(member => {
    const search = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(search) ||
      member.firm.toLowerCase().includes(search) ||
      member.location.toLowerCase().includes(search)
    );
  });

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
      <div className="compact-add-section">
        <div className="compact-add-content">
          <div className="compact-add-left">
            <div className="compact-avatars">
              <div className="compact-avatar-item">
                <img src="https://ui-avatars.com/api/?name=AM&background=059669&color=fff&size=32" alt="Attorney" />
              </div>
              <div className="compact-avatar-item">
                <img src="https://ui-avatars.com/api/?name=BL&background=dc2626&color=fff&size=32" alt="Attorney" />
              </div>
              <div className="compact-avatar-item">
                <img src="https://ui-avatars.com/api/?name=CN&background=1e40af&color=fff&size=32" alt="Attorney" />
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
            <Icon name="search" />
            Discover Attorneys
          </button>
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
            onClick={() => setShowFilters(!showFilters)}
          >
            <Icon name="filter" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filter-options">
            <select className="filter-select">
              <option value="">All Specialties</option>
              <option value="personal-injury">Personal Injury</option>
              <option value="criminal">Criminal Defense</option>
              <option value="family">Family Law</option>
            </select>
            <select className="filter-select">
              <option value="">All Locations</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="san-francisco">San Francisco</option>
              <option value="san-diego">San Diego</option>
            </select>
            <select className="filter-select">
              <option value="">Fee Range</option>
              <option value="20-25">20-25%</option>
              <option value="25-30">25-30%</option>
              <option value="30-35">30-35%</option>
            </select>
          </div>
        )}
      </div>

      {/* Members List */}
      <div className="members-list">
        {filteredMembers.length === 0 ? (
          <div className="no-members-found">
            <p>No members found matching your search</p>
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
                      src={`https://ui-avatars.com/api/?name=${member.initials}&background=002e69&color=fff`}
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

                    {/* Clients Table */}
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
                                <td>{client.name}</td>
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

                    <div className="member-actions">
                      <button 
                        className="btn-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditMember && onEditMember(member);
                        }}
                      >
                        <Icon name="edit" />
                        Edit Settings
                      </button>
                      <button className="btn-message">
                        <Icon name="chat" />
                        Send Message
                      </button>
                      <button 
                        className="btn-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveClick(member);
                        }}
                      >
                        <Icon name="trash" />
                        Remove from Network
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
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