import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon';
import './GeneralMultiselect.css';

const GeneralMultiselect = ({ 
  options = [], 
  selectedValues = [], 
  onChange, 
  placeholder = "Select options...",
  searchPlaceholder = "Search more...",
  noResultsText = "No results found",
  categoryLabel = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset focused index when filtered options change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredOptions.length, searchTerm]);

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
    // Handle Backspace to remove selected values when input is empty
    if (e.key === 'Backspace' && searchTerm === '' && selectedValues.length > 0) {
      e.preventDefault();
      const lastValue = selectedValues[selectedValues.length - 1];
      handleRemoveValue(lastValue);
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
          const nextIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          scrollToOption(nextIndex);
          return nextIndex;
        });
        break;
      
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleToggleOption(filteredOptions[focusedIndex]);
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
      const dropdown = dropdownRef.current.querySelector('.general-options');
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

  const handleToggleOption = (option) => {
    const isSelected = selectedValues.includes(option);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedValues.filter(v => v !== option);
    } else {
      newSelection = [...selectedValues, option];
    }
    
    onChange(newSelection);
    
    // Keep dropdown open and maintain keyboard navigation after selection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveValue = (value) => {
    const newSelection = selectedValues.filter(v => v !== value);
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
    <div className="general-multiselect" ref={dropdownRef}>
      <div className="general-input-container" onClick={handleInputClick}>
        <div className="selected-values">
          {selectedValues.map((value, index) => (
            <span key={index} className="value-tag">
              {value}
              <button
                className="remove-value-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveValue(value);
                }}
                aria-label={`Remove ${value}`}
              >
                <Icon name="close" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="general-search-input"
            placeholder={selectedValues.length === 0 ? placeholder : searchPlaceholder}
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
        <div className="general-dropdown">
          <div 
            className="general-options"
            onMouseLeave={handleMouseLeaveOptions}
          >
            {filteredOptions.length === 0 ? (
              <div className="no-results">
                {noResultsText} "{searchTerm}"
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option);
                const isFocused = index === focusedIndex;
                return (
                  <div
                    key={index}
                    ref={el => optionRefs.current[index] = el}
                    className={`general-option ${
                      isSelected ? 'selected' : ''
                    } ${isFocused ? 'focused' : ''}`}
                    onClick={() => handleToggleOption(option)}
                    onMouseEnter={() => handleMouseEnterOption(index)}
                  >
                    <div className="option-info">
                      <span className="option-name">{option}</span>
                      {categoryLabel && <span className="option-category">{categoryLabel}</span>}
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

export default GeneralMultiselect;