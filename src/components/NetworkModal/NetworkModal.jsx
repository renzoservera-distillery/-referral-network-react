import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import TimeSlider from '../TimeSlider';
import bodyScrollManager from '../../utils/bodyScrollManager';
import './NetworkModal.css';

const NetworkModal = ({ isOpen, onClose, onSave }) => {
  const [referringMethod, setReferringMethod] = useState('waterfall');
  const [timeValue, setTimeValue] = useState(30);
  const [timeUnit, setTimeUnit] = useState('minutes');
  const [marketplaceValue, setMarketplaceValue] = useState(2);
  const [marketplaceUnit, setMarketplaceUnit] = useState('hours');

  // Helper function to convert time values to hours for comparison
  const convertToHours = (value, unit) => {
    switch (unit) {
      case 'minutes':
        return value / 60;
      case 'days':
        return value * 24;
      case 'hours':
      default:
        return value;
    }
  };

  // Helper function to convert hours back to appropriate unit/value
  const convertFromHours = (hours, preferredUnit = 'hours') => {
    switch (preferredUnit) {
      case 'minutes':
        return { value: Math.round(hours * 60), unit: 'minutes' };
      case 'days':
        if (hours >= 24) {
          return { value: Math.round(hours / 24), unit: 'days' };
        }
        return { value: Math.round(hours), unit: 'hours' };
      case 'hours':
      default:
        return { value: Math.round(hours), unit: 'hours' };
    }
  };

  // Update marketplace value when time per attorney changes
  const handleTimeValueChange = (newValue) => {
    setTimeValue(newValue);
    
    const newTimeInHours = convertToHours(newValue, timeUnit);
    const currentMarketplaceInHours = convertToHours(marketplaceValue, marketplaceUnit);
    
    // If marketplace fallback is less than time per attorney, sync it
    if (currentMarketplaceInHours < newTimeInHours) {
      const minMarketplaceHours = Math.max(Math.ceil(newTimeInHours), 2); // Minimum 2 hours for marketplace, round up
      const converted = convertFromHours(minMarketplaceHours, marketplaceUnit);
      setMarketplaceValue(converted.value);
      setMarketplaceUnit(converted.unit);
    }
  };

  const handleTimeUnitChange = (newUnit) => {
    // Convert current value to the new unit properly
    const currentTimeInHours = convertToHours(timeValue, timeUnit);
    const converted = convertFromHours(currentTimeInHours, newUnit);
    
    setTimeValue(converted.value);
    setTimeUnit(newUnit);
    
    // Check if marketplace needs to be updated
    const currentMarketplaceInHours = convertToHours(marketplaceValue, marketplaceUnit);
    
    // If marketplace fallback is less than time per attorney, sync it
    if (currentMarketplaceInHours < currentTimeInHours) {
      const minMarketplaceHours = Math.max(Math.ceil(currentTimeInHours), 2); // Minimum 2 hours for marketplace, round up
      const marketplaceConverted = convertFromHours(minMarketplaceHours, marketplaceUnit);
      setMarketplaceValue(marketplaceConverted.value);
      setMarketplaceUnit(marketplaceConverted.unit);
    }
  };

  const handleMarketplaceValueChange = (newValue) => {
    const newMarketplaceInHours = convertToHours(newValue, marketplaceUnit);
    const timeInHours = convertToHours(timeValue, timeUnit);
    
    // Ensure marketplace value is never less than time per attorney
    if (newMarketplaceInHours >= timeInHours) {
      setMarketplaceValue(newValue);
    }
  };

  const handleMarketplaceUnitChange = (newUnit) => {
    // Convert current marketplace value to the new unit properly
    const currentMarketplaceInHours = convertToHours(marketplaceValue, marketplaceUnit);
    const converted = convertFromHours(currentMarketplaceInHours, newUnit);
    
    const timeInHours = convertToHours(timeValue, timeUnit);
    
    // Ensure the converted value is still >= time per attorney
    if (convertToHours(converted.value, newUnit) >= timeInHours) {
      setMarketplaceValue(converted.value);
      setMarketplaceUnit(newUnit);
    } else {
      // If the conversion would make it less than time per attorney, adjust to minimum
      const minMarketplaceHours = Math.max(Math.ceil(timeInHours), 2); // Round up to avoid decimals
      const adjustedConverted = convertFromHours(minMarketplaceHours, newUnit);
      setMarketplaceValue(adjustedConverted.value);
      setMarketplaceUnit(newUnit);
    }
  };


  const handleSave = () => {
    const settings = {
      referringMethod,
      timePerAttorney: `${timeValue} ${timeUnit}`,
      marketplaceFallback: `${marketplaceValue} ${marketplaceUnit}`
    };
    
    onSave(settings);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="network-modal">
        <div className="network-modal-header">
          <h2>Referral Network Settings</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>
        
        <div className="network-modal-content">
          {/* Referring Method Section */}
          <div className="settings-section">
            <div className="section-header">
              <Icon name="layers" className="section-icon" />
              <h3>Referring Method</h3>
            </div>
            <p className="section-description">How referrals will be sent to your network</p>
            
            <div className="referring-options">
              <label className={`radio-card ${referringMethod === 'waterfall' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="referring-method"
                  value="waterfall"
                  checked={referringMethod === 'waterfall'}
                  onChange={(e) => setReferringMethod(e.target.value)}
                />
                <div className="radio-card-content">
                  <div className="radio-card-header">
                    <div className="custom-radio"></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4>Waterfall Referrals™</h4>
                        <span className="badge">One at a time</span>
                      </div>
                      <p className="radio-card-description" style={{ margin: 0 }}>
                        Send referrals to the best fit attorney, then cascade to the next one if not accepted. Referrals will be distributed evenly to qualifying attorneys in your network.
                      </p>
                    </div>
                  </div>
                </div>
              </label>
              
              <label className="radio-card disabled">
                <input type="radio" name="referring-method" value="broadcast" disabled />
                <div className="radio-card-content">
                  <div className="radio-card-header">
                    <div className="custom-radio"></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <h4>Broadcast</h4>
                        <span className="badge coming-soon">Coming Soon</span>
                        <span className="badge secondary">Multiple at once</span>
                      </div>
                      <p className="radio-card-description" style={{ margin: 0 }}>
                        Send referrals to 5 attorneys simultaneously, then cascade to the next bunch if not accepted. The first attorney to confirm receives client information.
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Time per Attorney Section */}
          <div className="settings-section">
            <div className="section-header">
              <svg className="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h3>Time per Attorney</h3>
            </div>
            <p className="section-description">How long each attorney has before the case moves to the next in the queue</p>
            
            <TimeSlider
              value={timeValue}
              unit={timeUnit}
              onValueChange={handleTimeValueChange}
              onUnitChange={handleTimeUnitChange}
              maxHours={96}
              maxDays={4}
              minValue={0.5}
              useMinutesHours={true}
            />
          </div>
          
          {/* Marketplace Fallback Section */}
          <div className="settings-section">
            <div className="section-header">
              <svg className="section-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h3>Marketplace Fallback</h3>
            </div>
            <p className="section-description">Send referrals to the marketplace if no one accepts within the specified time.</p>
            
            <TimeSlider
              value={marketplaceValue}
              unit={marketplaceUnit}
              onValueChange={handleMarketplaceValueChange}
              onUnitChange={handleMarketplaceUnitChange}
              maxHours={168}
              maxDays={7}
              minValue={Math.max(Math.ceil(convertToHours(timeValue, timeUnit)), 2)}
            />
          </div>
        </div>
        
        <div className="network-modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default NetworkModal;