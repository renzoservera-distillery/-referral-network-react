import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../Icon';
import bodyScrollManager from '../../utils/bodyScrollManager';
import { getProfessionalAvatar } from '../../utils/avatarGenerator';
import './AddAttorneysModal.css';

// Sample attorney data - this would come from your database
const sampleAttorneys = [
  { id: 1, name: 'Michael B. Wilson', firm: 'Wilson & Associates', location: 'Los Angeles, CA', specialties: ['Personal Injury', 'Medical Malpractice'], initials: 'MW' },
  { id: 2, name: 'Charles Rittgers', firm: 'Rittgers Law', location: 'San Francisco, CA', specialties: ['Criminal Defense', 'DUI'], initials: 'CR' },
  { id: 3, name: 'Madison Hayes', firm: 'Hayes Legal Group', location: 'San Diego, CA', specialties: ['Family Law', 'Divorce'], initials: 'MH' },
  { id: 4, name: 'Sarah Johnson', firm: 'Johnson Legal', location: 'Sacramento, CA', specialties: ['Employment Law', 'Discrimination'], initials: 'SJ' },
  { id: 5, name: 'Robert Chen', firm: 'Chen & Partners', location: 'Los Angeles, CA', specialties: ['Business Law', 'Contracts'], initials: 'RC' },
  { id: 6, name: 'Emily Rodriguez', firm: 'Rodriguez Law Firm', location: 'San Jose, CA', specialties: ['Immigration', 'Visas'], initials: 'ER' },
  { id: 7, name: 'David Thompson', firm: 'Thompson Legal', location: 'Oakland, CA', specialties: ['Real Estate', 'Property Law'], initials: 'DT' },
  { id: 8, name: 'Lisa Park', firm: 'Park & Associates', location: 'Fresno, CA', specialties: ['Tax Law', 'Estate Planning'], initials: 'LP' },
  { id: 9, name: 'James Miller', firm: 'Miller Law Group', location: 'Long Beach, CA', specialties: ['Personal Injury', 'Car Accidents'], initials: 'JM' },
  { id: 10, name: 'Amanda White', firm: 'White Legal Services', location: 'Anaheim, CA', specialties: ['Workers Compensation', 'Disability'], initials: 'AW' },
];

const AddAttorneysModal = ({ isOpen, onClose, onAdd, existingMembers = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttorneys, setSelectedAttorneys] = useState(new Set());
  const [selectAll, setSelectAll] = useState(true);

  // Filter out attorneys that are already in the network
  const availableAttorneys = useMemo(() => {
    return sampleAttorneys.filter(attorney => 
      !existingMembers.some(member => 
        member.name === attorney.name && member.firm === attorney.firm
      )
    );
  }, [existingMembers]);

  // Initialize with all available attorneys selected
  useEffect(() => {
    if (isOpen && selectAll) {
      setSelectedAttorneys(new Set(availableAttorneys.map(a => a.id)));
    }
  }, [isOpen, selectAll, availableAttorneys]);

  // Filter attorneys based on search term
  const filteredAttorneys = useMemo(() => {
    if (!searchTerm) return availableAttorneys;
    
    const lowerSearch = searchTerm.toLowerCase();
    return availableAttorneys.filter(attorney => 
      attorney.name.toLowerCase().includes(lowerSearch) ||
      attorney.firm.toLowerCase().includes(lowerSearch) ||
      attorney.location.toLowerCase().includes(lowerSearch) ||
      attorney.specialties.some(s => s.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, availableAttorneys]);

  const handleSelectAll = () => {
    if (selectAll) {
      // Unselect all
      setSelectedAttorneys(new Set());
      setSelectAll(false);
    } else {
      // Select all filtered attorneys
      setSelectedAttorneys(new Set(filteredAttorneys.map(a => a.id)));
      setSelectAll(true);
    }
  };

  const handleToggleAttorney = (attorneyId) => {
    const newSelected = new Set(selectedAttorneys);
    if (newSelected.has(attorneyId)) {
      newSelected.delete(attorneyId);
      setSelectAll(false);
    } else {
      newSelected.add(attorneyId);
      // Check if all filtered attorneys are now selected
      if (filteredAttorneys.every(a => newSelected.has(a.id))) {
        setSelectAll(true);
      }
    }
    setSelectedAttorneys(newSelected);
  };

  // Calculate the actual count of available selected attorneys
  const availableSelectedCount = useMemo(() => {
    return availableAttorneys.filter(attorney => selectedAttorneys.has(attorney.id)).length;
  }, [availableAttorneys, selectedAttorneys]);

  const handleAdd = () => {
    const attorneysToAdd = availableAttorneys.filter(a => selectedAttorneys.has(a.id));
    onAdd(attorneysToAdd);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Update select all state when filtered list changes
  useEffect(() => {
    if (filteredAttorneys.length > 0) {
      setSelectAll(filteredAttorneys.every(a => selectedAttorneys.has(a.id)));
    }
  }, [filteredAttorneys, selectedAttorneys]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      bodyScrollManager.lock();
    } else {
      bodyScrollManager.unlock();
    }
    
    return () => {
      bodyScrollManager.unlock();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="add-attorneys-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-attorneys-modal">
        <div className="add-attorneys-header">
          <h2>Add to My Referral Network</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>
        
        <div className="add-attorneys-subheader">
          <p>Select attorneys from your Waterfall Referrals™ or previous referral partners</p>
        </div>

        <div className="add-attorneys-controls">
          <div className="search-container">
            <Icon name="search" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, firm, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="select-all-container">
            <span className="select-all-label">Select All</span>
            <button 
              className={`toggle-switch ${selectAll ? 'active' : ''}`}
              onClick={handleSelectAll}
              aria-label="Toggle select all"
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="attorneys-list">
          {availableAttorneys.length === 0 ? (
            <div className="no-results">
              <p>All attorneys are already in your network</p>
            </div>
          ) : filteredAttorneys.length === 0 ? (
            <div className="no-results">
              <p>No attorneys found matching "{searchTerm}"</p>
            </div>
          ) : (
            filteredAttorneys.map(attorney => (
              <div 
                key={attorney.id} 
                className={`attorney-item ${selectedAttorneys.has(attorney.id) ? 'selected' : ''}`}
                onClick={() => handleToggleAttorney(attorney.id)}
              >
                <div className="attorney-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedAttorneys.has(attorney.id)}
                    onChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="checkmark"></span>
                </div>
                
                <div className="attorney-avatar">
                  <img 
                    src={getProfessionalAvatar(attorney, 48)} 
                    alt={attorney.name} 
                  />
                </div>
                
                <div className="attorney-info">
                  <h4>{attorney.name}</h4>
                  <p className="attorney-firm">{attorney.firm}</p>
                  <div className="attorney-details-inline">
                    <div className="detail-with-icon">
                      <Icon name="briefcase" size={14} />
                      <span>{attorney.specialties.join(', ')}</span>
                    </div>
                    <div className="detail-with-icon">
                      <Icon name="location" size={14} />
                      <span>{attorney.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="add-attorneys-footer">
          <div className="selected-count">
            {availableSelectedCount} attorney{availableSelectedCount !== 1 ? 's' : ''} selected
          </div>
          <div className="footer-buttons">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button 
              className="btn-add" 
              onClick={handleAdd}
              disabled={availableSelectedCount === 0}
            >
              Add {availableSelectedCount > 0 && `(${availableSelectedCount})`} to Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAttorneysModal;