import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import LocationMultiselect from '../LocationMultiselect';
import LawFirmMultiselect from '../LawFirmMultiselect';
import bodyScrollManager from '../../utils/bodyScrollManager';
import './FiltersModal.css';

const practiceAreas = [
  'Personal Injury',
  'Car Accidents',
  'Medical Malpractice',
  'Slip & Fall',
  'Workers Compensation',
  'Criminal Defense',
  'DUI',
  'Family Law',
  'Divorce',
  'Child Custody',
  'Employment Law',
  'Business Law',
  'Real Estate',
  'Immigration',
  'Tax Law',
  'Estate Planning',
  'Bankruptcy',
  'Intellectual Property'
];

const communities = [
  'Hispanic/Latino Community',
  'African American Community',
  'Asian American Community',
  'LGBTQ+ Community',
  'Veterans Community',
  'Senior Citizens Community',
  'Small Business Community',
  'Disability Community',
  'Religious Communities',
  'Immigrant Community'
];

const FiltersModal = ({ isOpen, onClose, onApply, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    locations: [],
    practiceAreas: [],
    lawFirms: [],
    communities: []
  });

  // Initialize filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setFilters({
        locations: currentFilters.locations || [],
        practiceAreas: currentFilters.practiceAreas || [],
        lawFirms: currentFilters.lawFirms || [],
        communities: currentFilters.communities || []
      });
    }
  }, [isOpen, currentFilters]);

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePracticeAreaToggle = (area) => {
    setFilters(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(pa => pa !== area)
        : [...prev.practiceAreas, area]
    }));
  };

  const handleCommunityToggle = (community) => {
    setFilters(prev => ({
      ...prev,
      communities: prev.communities.includes(community)
        ? prev.communities.filter(c => c !== community)
        : [...prev.communities, community]
    }));
  };

  const handleClearAll = () => {
    setFilters({
      locations: [],
      practiceAreas: [],
      lawFirms: [],
      communities: []
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const hasActiveFilters = () => {
    return filters.locations.length > 0 ||
           filters.practiceAreas.length > 0 ||
           filters.lawFirms.length > 0 ||
           filters.communities.length > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="filters-modal-overlay" onClick={handleOverlayClick}>
      <div className="filters-modal">
        <div className="modal-header">
          <h2>Filter Attorneys</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-body">
          {/* Location Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <Icon name="location" />
              Location
            </label>
            <LocationMultiselect
              selectedLocations={filters.locations}
              onChange={(locations) => setFilters(prev => ({ ...prev, locations }))}
              placeholder="Select locations..."
            />
          </div>

          {/* Practice Areas Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <Icon name="briefcase-search" />
              Practice Areas
            </label>
            <div className="checkbox-grid">
              {practiceAreas.map((area) => (
                <label key={area} className={`checkbox-item ${filters.practiceAreas.includes(area) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={filters.practiceAreas.includes(area)}
                    onChange={() => handlePracticeAreaToggle(area)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Law Firm Name Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <Icon name="briefcase" />
              Law Firm Name
            </label>
            <LawFirmMultiselect
              selectedFirms={filters.lawFirms}
              onChange={(firms) => setFilters(prev => ({ ...prev, lawFirms: firms }))}
              placeholder="Select law firms..."
            />
          </div>

          {/* Community Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <Icon name="person-plus" />
              Community
            </label>
            <div className="checkbox-grid">
              {communities.map((community) => (
                <label key={community} className={`checkbox-item ${filters.communities.includes(community) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={filters.communities.includes(community)}
                    onChange={() => handleCommunityToggle(community)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">{community}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-actions">
            <button 
              className="btn-clear" 
              onClick={handleClearAll}
              disabled={!hasActiveFilters()}
            >
              Clear All
            </button>
            <div className="primary-actions">
              <button className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-apply" onClick={handleApply}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;