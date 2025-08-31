import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon';
import './LawFirmMultiselect.css';

// Law firm names data
const lawFirmData = [
  { value: 'Smith & Associates', type: 'firm' },
  { value: 'Johnson Law Group', type: 'firm' },
  { value: 'Williams & Partners', type: 'firm' },
  { value: 'Brown Legal Services', type: 'firm' },
  { value: 'Davis Law Firm', type: 'firm' },
  { value: 'Miller & Company', type: 'firm' },
  { value: 'Wilson Legal Group', type: 'firm' },
  { value: 'Moore Law Associates', type: 'firm' },
  { value: 'Taylor & Partners', type: 'firm' },
  { value: 'Anderson Legal Services', type: 'firm' },
  { value: 'Thomas Law Group', type: 'firm' },
  { value: 'Jackson & Associates', type: 'firm' },
  { value: 'White Legal Partners', type: 'firm' },
  { value: 'Harris Law Firm', type: 'firm' },
  { value: 'Martin & Company', type: 'firm' },
  { value: 'Thompson Legal Group', type: 'firm' },
  { value: 'Garcia Law Associates', type: 'firm' },
  { value: 'Martinez & Partners', type: 'firm' },
  { value: 'Robinson Legal Services', type: 'firm' },
  { value: 'Clark Law Group', type: 'firm' },
  { value: 'Rodriguez & Associates', type: 'firm' },
  { value: 'Lewis Legal Partners', type: 'firm' },
  { value: 'Lee Law Firm', type: 'firm' },
  { value: 'Walker & Company', type: 'firm' },
  { value: 'Hall Legal Group', type: 'firm' },
  { value: 'Allen Law Associates', type: 'firm' },
  { value: 'Young & Partners', type: 'firm' },
  { value: 'Hernandez Legal Services', type: 'firm' },
  { value: 'King Law Group', type: 'firm' },
  { value: 'Wright & Associates', type: 'firm' },
  { value: 'Lopez Legal Partners', type: 'firm' },
  { value: 'Hill Law Firm', type: 'firm' },
  { value: 'Scott & Company', type: 'firm' },
  { value: 'Green Legal Group', type: 'firm' },
  { value: 'Adams Law Associates', type: 'firm' },
  { value: 'Baker & Partners', type: 'firm' },
  { value: 'Gonzalez Legal Services', type: 'firm' },
  { value: 'Nelson Law Group', type: 'firm' },
  { value: 'Carter & Associates', type: 'firm' },
  { value: 'Mitchell Legal Partners', type: 'firm' },
  { value: 'Perez Law Firm', type: 'firm' },
  { value: 'Roberts & Company', type: 'firm' },
  { value: 'Turner Legal Group', type: 'firm' },
  { value: 'Phillips Law Associates', type: 'firm' },
  { value: 'Campbell & Partners', type: 'firm' },
  { value: 'Parker Legal Services', type: 'firm' },
  { value: 'Evans Law Group', type: 'firm' },
  { value: 'Edwards & Associates', type: 'firm' },
  { value: 'Collins Legal Partners', type: 'firm' },
  { value: 'Stewart Law Firm', type: 'firm' }
];

const LawFirmMultiselect = ({ selectedFirms = [], onChange, placeholder = "Select law firms..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);

  // Filter law firms based on search term
  const filteredFirms = lawFirmData.filter(firm =>
    firm.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset focused index when filtered firms change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredFirms.length, searchTerm]);

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
    // Handle Backspace to remove selected firms when input is empty
    if (e.key === 'Backspace' && searchTerm === '' && selectedFirms.length > 0) {
      e.preventDefault();
      const lastFirm = selectedFirms[selectedFirms.length - 1];
      handleRemoveFirm(lastFirm);
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
          const nextIndex = prev < filteredFirms.length - 1 ? prev + 1 : 0;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : filteredFirms.length - 1;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredFirms.length) {
          handleToggleFirm(filteredFirms[focusedIndex]);
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
      const dropdown = dropdownRef.current.querySelector('.firm-options');
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

  const handleToggleFirm = (firm) => {
    const isSelected = selectedFirms.includes(firm.value);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedFirms.filter(f => f !== firm.value);
    } else {
      newSelection = [...selectedFirms, firm.value];
    }
    
    onChange(newSelection);
    
    // Keep dropdown open and maintain keyboard navigation after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveFirm = (firmValue) => {
    const newSelection = selectedFirms.filter(f => f !== firmValue);
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
    <div className="firm-multiselect" ref={dropdownRef}>
      <div className="firm-input-container" onClick={handleInputClick}>
        <div className="selected-firms">
          {selectedFirms.map((firm, index) => (
            <span key={index} className="firm-tag">
              {firm}
              <button
                className="remove-firm-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFirm(firm);
                }}
                aria-label={`Remove ${firm}`}
              >
                <Icon name="close" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="firm-search-input"
            placeholder={selectedFirms.length === 0 ? placeholder : "Search more law firms..."}
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
        <div className="firm-dropdown">
          <div 
            className="firm-options"
            onMouseLeave={handleMouseLeaveOptions}
          >
            {filteredFirms.length === 0 ? (
              <div className="no-results">
                No law firms found for "{searchTerm}"
              </div>
            ) : (
              filteredFirms.map((firm, index) => {
                const isSelected = selectedFirms.includes(firm.value);
                const isFocused = index === focusedIndex;
                return (
                  <div
                    key={index}
                    ref={el => optionRefs.current[index] = el}
                    className={`firm-option ${
                      isSelected ? 'selected' : ''
                    } ${isFocused ? 'focused' : ''}`}
                    onClick={() => handleToggleFirm(firm)}
                    onMouseEnter={() => handleMouseEnterOption(index)}
                  >
                    <div className="firm-info">
                      <span className="firm-name">{firm.value}</span>
                      <span className="firm-type">Law Firm</span>
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

export default LawFirmMultiselect;