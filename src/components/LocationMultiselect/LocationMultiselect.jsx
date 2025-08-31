import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon';
import './LocationMultiselect.css';

// US States and major cities data
const locationData = [
  // States
  { value: 'Alabama', type: 'state' },
  { value: 'Alaska', type: 'state' },
  { value: 'Arizona', type: 'state' },
  { value: 'Arkansas', type: 'state' },
  { value: 'California', type: 'state' },
  { value: 'Colorado', type: 'state' },
  { value: 'Connecticut', type: 'state' },
  { value: 'Delaware', type: 'state' },
  { value: 'Florida', type: 'state' },
  { value: 'Georgia', type: 'state' },
  { value: 'Hawaii', type: 'state' },
  { value: 'Idaho', type: 'state' },
  { value: 'Illinois', type: 'state' },
  { value: 'Indiana', type: 'state' },
  { value: 'Iowa', type: 'state' },
  { value: 'Kansas', type: 'state' },
  { value: 'Kentucky', type: 'state' },
  { value: 'Louisiana', type: 'state' },
  { value: 'Maine', type: 'state' },
  { value: 'Maryland', type: 'state' },
  { value: 'Massachusetts', type: 'state' },
  { value: 'Michigan', type: 'state' },
  { value: 'Minnesota', type: 'state' },
  { value: 'Mississippi', type: 'state' },
  { value: 'Missouri', type: 'state' },
  { value: 'Montana', type: 'state' },
  { value: 'Nebraska', type: 'state' },
  { value: 'Nevada', type: 'state' },
  { value: 'New Hampshire', type: 'state' },
  { value: 'New Jersey', type: 'state' },
  { value: 'New Mexico', type: 'state' },
  { value: 'New York', type: 'state' },
  { value: 'North Carolina', type: 'state' },
  { value: 'North Dakota', type: 'state' },
  { value: 'Ohio', type: 'state' },
  { value: 'Oklahoma', type: 'state' },
  { value: 'Oregon', type: 'state' },
  { value: 'Pennsylvania', type: 'state' },
  { value: 'Rhode Island', type: 'state' },
  { value: 'South Carolina', type: 'state' },
  { value: 'South Dakota', type: 'state' },
  { value: 'Tennessee', type: 'state' },
  { value: 'Texas', type: 'state' },
  { value: 'Utah', type: 'state' },
  { value: 'Vermont', type: 'state' },
  { value: 'Virginia', type: 'state' },
  { value: 'Washington', type: 'state' },
  { value: 'West Virginia', type: 'state' },
  { value: 'Wisconsin', type: 'state' },
  { value: 'Wyoming', type: 'state' },
  
  // Major Cities
  { value: 'New York, NY', type: 'city' },
  { value: 'Los Angeles, CA', type: 'city' },
  { value: 'Chicago, IL', type: 'city' },
  { value: 'Houston, TX', type: 'city' },
  { value: 'Phoenix, AZ', type: 'city' },
  { value: 'Philadelphia, PA', type: 'city' },
  { value: 'San Antonio, TX', type: 'city' },
  { value: 'San Diego, CA', type: 'city' },
  { value: 'Dallas, TX', type: 'city' },
  { value: 'San Jose, CA', type: 'city' },
  { value: 'Austin, TX', type: 'city' },
  { value: 'Jacksonville, FL', type: 'city' },
  { value: 'Fort Worth, TX', type: 'city' },
  { value: 'Columbus, OH', type: 'city' },
  { value: 'San Francisco, CA', type: 'city' },
  { value: 'Charlotte, NC', type: 'city' },
  { value: 'Indianapolis, IN', type: 'city' },
  { value: 'Seattle, WA', type: 'city' },
  { value: 'Denver, CO', type: 'city' },
  { value: 'Boston, MA', type: 'city' },
  { value: 'El Paso, TX', type: 'city' },
  { value: 'Detroit, MI', type: 'city' },
  { value: 'Nashville, TN', type: 'city' },
  { value: 'Portland, OR', type: 'city' },
  { value: 'Memphis, TN', type: 'city' },
  { value: 'Oklahoma City, OK', type: 'city' },
  { value: 'Las Vegas, NV', type: 'city' },
  { value: 'Louisville, KY', type: 'city' },
  { value: 'Baltimore, MD', type: 'city' },
  { value: 'Milwaukee, WI', type: 'city' },
  { value: 'Albuquerque, NM', type: 'city' },
  { value: 'Tucson, AZ', type: 'city' },
  { value: 'Fresno, CA', type: 'city' },
  { value: 'Mesa, AZ', type: 'city' },
  { value: 'Sacramento, CA', type: 'city' },
  { value: 'Atlanta, GA', type: 'city' },
  { value: 'Kansas City, MO', type: 'city' },
  { value: 'Colorado Springs, CO', type: 'city' },
  { value: 'Miami, FL', type: 'city' },
  { value: 'Raleigh, NC', type: 'city' },
  { value: 'Omaha, NE', type: 'city' },
  { value: 'Long Beach, CA', type: 'city' },
  { value: 'Virginia Beach, VA', type: 'city' },
  { value: 'Oakland, CA', type: 'city' },
  { value: 'Minneapolis, MN', type: 'city' },
  { value: 'Tulsa, OK', type: 'city' },
  { value: 'Arlington, TX', type: 'city' },
  { value: 'Tampa, FL', type: 'city' },
  { value: 'New Orleans, LA', type: 'city' },
  { value: 'Wichita, KS', type: 'city' },
  { value: 'Cleveland, OH', type: 'city' },
  
  // Counties (Major ones)
  { value: 'Los Angeles County, CA', type: 'county' },
  { value: 'Cook County, IL', type: 'county' },
  { value: 'Harris County, TX', type: 'county' },
  { value: 'Maricopa County, AZ', type: 'county' },
  { value: 'San Diego County, CA', type: 'county' },
  { value: 'Orange County, CA', type: 'county' },
  { value: 'Miami-Dade County, FL', type: 'county' },
  { value: 'Kings County, NY', type: 'county' },
  { value: 'Dallas County, TX', type: 'county' },
  { value: 'Queens County, NY', type: 'county' }
];

const LocationMultiselect = ({ selectedLocations = [], onChange, placeholder = "Select locations..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);

  // Filter locations based on search term
  const filteredLocations = locationData.filter(location =>
    location.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset focused index when filtered locations change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredLocations.length, searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // Handle Backspace to remove selected locations when input is empty
    if (e.key === 'Backspace' && searchTerm === '' && selectedLocations.length > 0) {
      e.preventDefault();
      const lastLocation = selectedLocations[selectedLocations.length - 1];
      handleRemoveLocation(lastLocation);
      return;
    }

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev < filteredLocations.length - 1 ? prev + 1 : 0;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : filteredLocations.length - 1;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredLocations.length) {
          handleToggleLocation(filteredLocations[focusedIndex]);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
      
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // Scroll to focused option
  const scrollToOption = (index) => {
    const option = optionRefs.current[index];
    if (option && dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector('.location-options');
      if (dropdown) {
        const optionTop = option.offsetTop;
        const optionBottom = optionTop + option.offsetHeight;
        const dropdownTop = dropdown.scrollTop;
        const dropdownBottom = dropdownTop + dropdown.offsetHeight;

        if (optionTop < dropdownTop) {
          dropdown.scrollTop = optionTop;
        } else if (optionBottom > dropdownBottom) {
          dropdown.scrollTop = optionBottom - dropdown.offsetHeight;
        }
      }
    }
  };

  const handleToggleLocation = (location) => {
    const isSelected = selectedLocations.includes(location.value);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedLocations.filter(loc => loc !== location.value);
    } else {
      newSelection = [...selectedLocations, location.value];
    }
    
    onChange(newSelection);
    
    // Keep dropdown open and maintain keyboard navigation after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveLocation = (locationValue) => {
    const newSelection = selectedLocations.filter(loc => loc !== locationValue);
    onChange(newSelection);
  };

  const handleInputClick = () => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMouseEnterOption = (index) => {
    setFocusedIndex(index);
  };

  const handleMouseLeaveOptions = () => {
    // Reset focus when mouse leaves the options area
    // This ensures keyboard navigation works after mouse interaction
    setFocusedIndex(-1);
  };

  // Reset focus index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  return (
    <div className="location-multiselect" ref={dropdownRef}>
      <div className="location-input-container" onClick={handleInputClick}>
        <div className="selected-locations">
          {selectedLocations.map((location, index) => (
            <span key={index} className="location-tag">
              {location}
              <button
                className="remove-location-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveLocation(location);
                }}
                aria-label={`Remove ${location}`}
              >
                <Icon name="close" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="location-search-input"
            placeholder={selectedLocations.length === 0 ? placeholder : "Search more locations..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>
        <Icon name="chevron-down" className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="location-dropdown">
          <div 
            className="location-options"
            onMouseLeave={handleMouseLeaveOptions}
          >
            {filteredLocations.length === 0 ? (
              <div className="no-results">
                No locations found for "{searchTerm}"
              </div>
            ) : (
              filteredLocations.map((location, index) => {
                const isSelected = selectedLocations.includes(location.value);
                const isFocused = index === focusedIndex;
                return (
                  <div
                    key={index}
                    ref={el => optionRefs.current[index] = el}
                    className={`location-option ${
                      isSelected ? 'selected' : ''
                    } ${isFocused ? 'focused' : ''}`}
                    onClick={() => handleToggleLocation(location)}
                    onMouseEnter={() => handleMouseEnterOption(index)}
                  >
                    <div className="location-info">
                      <span className="location-name">{location.value}</span>
                      <span className="location-type">{location.type}</span>
                    </div>
                    {isSelected && (
                      <Icon name="check" className="check-icon" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMultiselect;