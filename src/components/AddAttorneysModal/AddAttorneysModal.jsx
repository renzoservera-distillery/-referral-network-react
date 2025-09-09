import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../Icon';
import bodyScrollManager from '../../utils/bodyScrollManager';
import { getProfessionalAvatar } from '../../utils/avatarGenerator';
import './AddAttorneysModal.css';

// Custom user names and law firms
const userNames = [
  "Isabela Orlacchio-Garcia",
  "April Bonifatto-Martinick",
  "Ashley Dominguez Garcia",
  "Shahab Mossavar-Rahmani",
  "Carson Phillips-Spotts",
  "Michelle Fonseca-Kamana",
  "Annie Martin-McDonough",
  "LaShaunté Henry-Steele",
  "Neyleen Ortiz-Beljajev",
  "Jennifer Gore-Cuthbert"
];

const lawFirms = [
  "Sutton Street Group",
  "McMullin Injury Law",
  "The Tuke Firm, PLLC",
  "Singleton Schreiber",
  "The Byrne Law Group",
  "Hymanson & Hymanson",
  "Woolsey Morcom PLLC",
  "The Mattox Law Firm",
  "Clark Frost Zucchi",
  "Schaar & Silva LLP"
];

// Sample attorney data - this would come from your database
const sampleAttorneys = [
  { id: 1, name: userNames[0], firm: lawFirms[0], location: 'Los Angeles, CA', specialties: ['Personal Injury', 'Medical Malpractice'], initials: 'IO' },
  { id: 2, name: userNames[1], firm: lawFirms[1], location: 'San Francisco, CA', specialties: ['Criminal Defense', 'DUI'], initials: 'AB' },
  { id: 3, name: userNames[2], firm: lawFirms[2], location: 'San Diego, CA', specialties: ['Family Law', 'Divorce'], initials: 'AD' },
  { id: 4, name: userNames[3], firm: lawFirms[3], location: 'Sacramento, CA', specialties: ['Employment Law', 'Discrimination'], initials: 'SM' },
  { id: 5, name: userNames[4], firm: lawFirms[4], location: 'Los Angeles, CA', specialties: ['Business Law', 'Contracts'], initials: 'CP' },
  { id: 6, name: userNames[5], firm: lawFirms[5], location: 'San Jose, CA', specialties: ['Immigration', 'Visas'], initials: 'MF' },
  { id: 7, name: userNames[6], firm: lawFirms[6], location: 'Oakland, CA', specialties: ['Real Estate', 'Property Law'], initials: 'AM' },
  { id: 8, name: userNames[7], firm: lawFirms[7], location: 'Fresno, CA', specialties: ['Tax Law', 'Estate Planning'], initials: 'LH' },
  { id: 9, name: userNames[8], firm: lawFirms[8], location: 'Long Beach, CA', specialties: ['Personal Injury', 'Car Accidents'], initials: 'NO' },
  { id: 10, name: userNames[9], firm: lawFirms[9], location: 'Anaheim, CA', specialties: ['Workers Compensation', 'Disability'], initials: 'JG' },
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