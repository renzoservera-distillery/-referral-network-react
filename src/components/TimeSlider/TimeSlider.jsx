import React, { useState, useEffect } from 'react';
import './TimeSlider.css';

const TimeSlider = ({ 
  value, 
  unit, 
  onValueChange, 
  onUnitChange,
  maxHours = 72,
  maxDays = 3,
  label,
  description 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Convert value to hours for internal slider calculations
  const getHoursValue = () => {
    return unit === 'days' ? Math.min(value * 24, maxHours) : value;
  };

  const [sliderValue, setSliderValue] = useState(getHoursValue());

  useEffect(() => {
    const hoursValue = unit === 'days' ? Math.min(value * 24, maxHours) : value;
    setSliderValue(hoursValue);
  }, [value, unit, maxHours]);

  const handleSliderChange = (hours) => {
    setSliderValue(hours);
    
    if (unit === 'days') {
      const days = Math.round(hours / 24);
      onValueChange(Math.min(days, maxDays));
    } else {
      onValueChange(hours);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || 1;
    const maxValue = unit === 'days' ? maxDays : maxHours;
    const clampedValue = Math.min(Math.max(1, newValue), maxValue);
    onValueChange(clampedValue);
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    const currentHours = getHoursValue();
    
    if (newUnit === 'days') {
      const days = Math.round(currentHours / 24);
      onValueChange(Math.min(days, maxDays));
    } else {
      onValueChange(Math.min(currentHours, maxHours));
    }
    
    onUnitChange(newUnit);
  };

  const getSliderPercentage = () => {
    return ((sliderValue - 1) / (maxHours - 1)) * 100;
  };

  return (
    <div className="time-slider-component">
      {label && (
        <div className="time-slider-header">
          <h4>{label}</h4>
          {description && <p className="time-slider-description">{description}</p>}
        </div>
      )}
      
      <div className="time-slider-container">
        <div className="time-slider-track-wrapper">
          <input
            type="range"
            className={`time-slider-input ${isDragging ? 'dragging' : ''}`}
            min="1"
            max={maxHours}
            value={sliderValue}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          />
          <div className="time-slider-track">
            <div 
              className="time-slider-fill" 
              style={{ width: `${getSliderPercentage()}%` }}
            />
            <div className="time-slider-ticks">
              {maxDays === 7 ? (
                // Marketplace Fallback (up to 7 days)
                unit === 'days' ? (
                  <>
                    <span className="tick" style={{ left: '0%' }}>1h</span>
                    <span className="tick" style={{ left: '14.3%' }}>1d</span>
                    <span className="tick" style={{ left: '42.9%' }}>3d</span>
                    <span className="tick" style={{ left: '71.4%' }}>5d</span>
                    <span className="tick" style={{ left: '100%' }}>7d</span>
                  </>
                ) : (
                  <>
                    <span className="tick" style={{ left: '0%' }}>1h</span>
                    <span className="tick" style={{ left: '14.3%' }}>24h</span>
                    <span className="tick" style={{ left: '42.9%' }}>72h</span>
                    <span className="tick" style={{ left: '71.4%' }}>120h</span>
                    <span className="tick" style={{ left: '100%' }}>168h</span>
                  </>
                )
              ) : (
                // Time per Attorney (up to 3 days)
                unit === 'days' ? (
                  <>
                    <span className="tick" style={{ left: '0%' }}>1h</span>
                    <span className="tick" style={{ left: '33.33%' }}>1d</span>
                    <span className="tick" style={{ left: '66.66%' }}>2d</span>
                    <span className="tick" style={{ left: '100%' }}>3d</span>
                  </>
                ) : (
                  <>
                    <span className="tick" style={{ left: '0%' }}>1h</span>
                    <span className="tick" style={{ left: '33.33%' }}>24h</span>
                    <span className="tick" style={{ left: '66.66%' }}>48h</span>
                    <span className="tick" style={{ left: '100%' }}>72h</span>
                  </>
                )
              )}
            </div>
          </div>
        </div>
        
        <div className="time-slider-controls">
          <input
            type="number"
            className="time-input"
            value={value}
            min="1"
            max={unit === 'days' ? maxDays : maxHours}
            onChange={handleInputChange}
          />
          <select 
            className="time-select" 
            value={unit} 
            onChange={handleUnitChange}
          >
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;