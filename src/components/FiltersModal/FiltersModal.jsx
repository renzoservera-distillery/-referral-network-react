import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import LocationMultiselect from '../LocationMultiselect';
import LawFirmMultiselect from '../LawFirmMultiselect';
import GeneralMultiselect from '../GeneralMultiselect';
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
            <Icon name="close" size={16} />
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
              <Icon name="briefcase" />
              Practice Areas
            </label>
            <GeneralMultiselect
              options={practiceAreas}
              selectedValues={filters.practiceAreas}
              onChange={(areas) => setFilters(prev => ({ ...prev, practiceAreas: areas }))}
              placeholder="Select practice areas..."
              searchPlaceholder="Search more practice areas..."
              noResultsText="No practice areas found for"
              categoryLabel="Practice Area"
            />
          </div>

          {/* Law Firm Name Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <Icon name="building-people" />
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
              <Icon name="people" />
              Community
            </label>
            <GeneralMultiselect
              options={communities}
              selectedValues={filters.communities}
              onChange={(communities) => setFilters(prev => ({ ...prev, communities }))}
              placeholder="Select communities..."
              searchPlaceholder="Search more communities..."
              noResultsText="No communities found for"
              categoryLabel="Community"
            />
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