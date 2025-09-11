import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import { getProfessionalAvatar } from '../../utils/avatarGenerator';
import bodyScrollManager from '../../utils/bodyScrollManager';
import './AddToNetworkModal.css';

const AddToNetworkModal = ({ isOpen, onClose, attorney, onAdd, isEditMode = false, initialData = null }) => {
  const [feePercentage, setFeePercentage] = useState(25);
  const [caseTypes, setCaseTypes] = useState(['']);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const modalRef = React.useRef(null);
  const firstInputRef = React.useRef(null);
  const lastFocusableRef = React.useRef(null);

  // Initialize form when modal opens
  useEffect(() => {
    if (isOpen && attorney) {
      if (isEditMode && initialData) {
        // Edit mode: prefill with existing data and show advanced settings
        setFeePercentage(initialData.feePercentage || 25);
        setCaseTypes(initialData.caseTypes && initialData.caseTypes.length > 0 ? initialData.caseTypes : ['']);
        setShowAdvancedSettings(true);
      } else {
        // Add mode: reset to defaults
        setFeePercentage(25);
        setCaseTypes(['']);
        setShowAdvancedSettings(false);
      }
    }
  }, [isOpen, attorney, isEditMode, initialData]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      const previouslyFocused = document.activeElement;
      
      // Focus first input when modal opens
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 100);

      // Prevent body scroll
      bodyScrollManager.lock();

      return () => {
        // Restore body scroll and focus
        bodyScrollManager.unlock();
        if (previouslyFocused && previouslyFocused.focus) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isOpen]);

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements?.length) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  const handleAdd = () => {
    const networkSettings = {
      attorney: attorney,
      feePercentage,
      caseTypes: caseTypes.filter(ct => ct.trim() !== ''),
      addedDate: new Date().toISOString()
    };
    
    onAdd(networkSettings);
    onClose();
  };

  const updateCaseType = (index, value) => {
    const newCaseTypes = [...caseTypes];
    newCaseTypes[index] = value;
    setCaseTypes(newCaseTypes);
  };

  const addNewCaseType = () => {
    setCaseTypes([...caseTypes, '']);
  };

  const removeCaseType = (index) => {
    if (caseTypes.length > 1) {
      const newCaseTypes = caseTypes.filter((_, i) => i !== index);
      setCaseTypes(newCaseTypes);
    }
  };

  const shouldShowAddButton = caseTypes[caseTypes.length - 1].trim() !== '';

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !attorney) return null;

  return (
    <div className="add-to-network-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="add-to-network-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-header">
          <h2 id="modal-title">{isEditMode ? 'Edit Network Member' : 'Add to My Network'}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="modal-content-scroll" id="modal-description">
          {/* Attorney Details Section */}
          <div className="attorney-details-section">
            <div className="attorney-profile">
              <div className="attorney-avatar-large">
                <img 
                  src={getProfessionalAvatar(attorney, 80)}
                  alt={attorney.name}
                  loading="lazy"
                />
              </div>
              <div className="attorney-info-main">
                <h3>{attorney.name}</h3>
                <p className="attorney-firm-text">{attorney.firm}</p>
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
                
                {/* Advanced Settings Toggle - Aligned with Info */}
                <button 
                  className="advanced-settings-button"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  type="button"
                  aria-expanded={showAdvancedSettings}
                  aria-controls="advanced-settings-content"
                >
                  <Icon 
                    name="settings" 
                    size={16} 
                  />
                  <span>{showAdvancedSettings ? 'Hide' : 'View'} Advanced Settings</span>
                  <Icon 
                    name="chevron-down" 
                    size={16} 
                    className="chevron-icon"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div className={`configuration-section ${showAdvancedSettings ? 'with-settings' : 'no-settings'}`}>

          {/* Collapsible Advanced Settings */}
          <div 
            id="advanced-settings-content"
            className={`advanced-settings-content ${showAdvancedSettings ? 'expanded' : 'collapsed'}`}
          >
          {/* Fee Percentage */}
          <div className="config-group">
            <label className="config-label" htmlFor="fee-range">
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 18, 
                height: 18, 
                fontSize: 16, 
                fontWeight: 'bold',
                color: '#6b7280'
              }}>%</span>
              Referral Fee Percentage
            </label>
            <div className="fee-slider-container">
              <input
                id="fee-range"
                type="range"
                min="10"
                max="40"
                value={feePercentage}
                onChange={(e) => setFeePercentage(parseInt(e.target.value))}
                className="fee-slider"
                ref={firstInputRef}
                aria-label={`Referral fee percentage: ${feePercentage}%`}
              />
              <div className="fee-display">
                <input
                  id="fee-number"
                  type="number"
                  min="10"
                  max="40"
                  value={feePercentage}
                  onChange={(e) => setFeePercentage(parseInt(e.target.value) || 25)}
                  className="fee-input"
                  aria-label="Fee percentage as number"
                />
                <span className="fee-percent">%</span>
              </div>
            </div>
            <div className="fee-hints">
              <span className={feePercentage <= 20 ? 'active' : ''}>Low</span>
              <span className={feePercentage > 20 && feePercentage <= 30 ? 'active' : ''}>Standard</span>
              <span className={feePercentage > 30 ? 'active' : ''}>High</span>
            </div>
          </div>

          {/* Referring Rules */}
          <div className="config-group">
            <label className="config-label">
              <Icon name="target-arrow" />
              Referring Rules
            </label>
            <div className="referring-rules-section">
              <div className="rule-input-group">
                <div className="case-types-list">
                  {caseTypes.map((caseType, index) => (
                    <div key={index} className="case-type-input-wrapper">
                      <input
                        type="text"
                        className="rule-input"
                        placeholder='e.g., "Traffic accidents with injuries" or "Medical malpractice under 100K"'
                        value={caseType}
                        onChange={(e) => updateCaseType(index, e.target.value)}
                        aria-label={`Case type ${index + 1}`}
                        id={`case-type-${index}`}
                      />
                      {caseTypes.length > 1 && (
                        <button
                          className="remove-case-type-btn"
                          onClick={() => removeCaseType(index)}
                          aria-label="Remove case type"
                        >
                          <Icon name="close" size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {shouldShowAddButton && (
                    <button
                      className="add-case-type-btn"
                      onClick={addNewCaseType}
                    >
                      <Icon name="plus" />
                      Add New Case Type
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          </div>
        </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="footer-buttons">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button 
              className="btn-add-to-network" 
              onClick={handleAdd}
              ref={lastFocusableRef}
            >
              {isEditMode ? 'Save Changes' : 'Add to Network'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToNetworkModal;