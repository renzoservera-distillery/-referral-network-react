import React, { useState, useEffect, useCallback } from 'react';
import './TimeSlider.css';

const TimeSlider = ({ 
  value, 
  unit, 
  onValueChange, 
  onUnitChange,
  maxHours = 72,
  maxDays = 3,
  minValue = 1,
  label,
  description,
  useMinutesHours = false // New prop to determine which unit system to use
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Convert value to hours for internal slider calculations
  const getHoursValue = useCallback(() => {
    if (useMinutesHours) {
      return unit === 'minutes' ? Math.min(value / 60, maxHours) : value;
    } else {
      return unit === 'days' ? Math.min(value * 24, maxHours) : value;
    }
  }, [value, unit, maxHours, useMinutesHours]);

  const [sliderValue, setSliderValue] = useState(getHoursValue());

  useEffect(() => {
    const hoursValue = getHoursValue();
    setSliderValue(hoursValue);
  }, [value, unit, maxHours, useMinutesHours, getHoursValue]);

  const handleSliderChange = (hours) => {
    // Ensure the slider value respects the minimum constraint
    const constrainedHours = Math.max(hours, minValue);
    setSliderValue(constrainedHours);
    
    if (useMinutesHours) {
      if (unit === 'minutes') {
        const minutes = Math.round(constrainedHours * 60);
        onValueChange(minutes);
      } else {
        onValueChange(constrainedHours);
      }
    } else {
      if (unit === 'days') {
        const days = Math.round(constrainedHours / 24);
        onValueChange(Math.min(days, maxDays));
      } else {
        onValueChange(constrainedHours);
      }
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || 1;
    let maxValue, minValueForUnit;
    
    if (useMinutesHours) {
      maxValue = unit === 'minutes' ? maxHours * 60 : maxHours;
      minValueForUnit = unit === 'minutes' ? Math.ceil(minValue * 60) : minValue;
    } else {
      maxValue = unit === 'days' ? maxDays : maxHours;
      minValueForUnit = unit === 'days' ? Math.ceil(minValue / 24) : minValue;
    }
    
    const clampedValue = Math.min(Math.max(minValueForUnit, newValue), maxValue);
    onValueChange(clampedValue);
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    onUnitChange(newUnit);
  };

  const getSliderPercentage = () => {
    const minSliderValue = Math.max(1, minValue);
    return ((sliderValue - minSliderValue) / (maxHours - minSliderValue)) * 100;
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
            min={Math.max(1, minValue)}
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
              {useMinutesHours ? (
                // Time per Attorney (minutes/hours system)
                unit === 'minutes' ? (
                  <>
                    <span className="tick" style={{ left: '0%' }}>30m</span>
                    <span className="tick" style={{ left: '25%' }}>24h</span>
                    <span className="tick" style={{ left: '50%' }}>48h</span>
                    <span className="tick" style={{ left: '75%' }}>72h</span>
                    <span className="tick" style={{ left: '100%' }}>96h</span>
                  </>
                ) : (
                  <>
                    <span className="tick" style={{ left: '0%' }}>30m</span>
                    <span className="tick" style={{ left: '25%' }}>1d</span>
                    <span className="tick" style={{ left: '50%' }}>2d</span>
                    <span className="tick" style={{ left: '75%' }}>3d</span>
                    <span className="tick" style={{ left: '100%' }}>4d</span>
                  </>
                )
              ) : (
                // Marketplace Fallback (hours/days system)
                unit === 'days' ? (
                  <>
                    <span className="tick" style={{ left: '0%' }}>2h</span>
                    <span className="tick" style={{ left: '14.3%' }}>1d</span>
                    <span className="tick" style={{ left: '42.9%' }}>3d</span>
                    <span className="tick" style={{ left: '71.4%' }}>5d</span>
                    <span className="tick" style={{ left: '100%' }}>7d</span>
                  </>
                ) : (
                  <>
                    <span className="tick" style={{ left: '0%' }}>2h</span>
                    <span className="tick" style={{ left: '14.3%' }}>24h</span>
                    <span className="tick" style={{ left: '42.9%' }}>72h</span>
                    <span className="tick" style={{ left: '71.4%' }}>120h</span>
                    <span className="tick" style={{ left: '100%' }}>168h</span>
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
            min={useMinutesHours 
              ? (unit === 'minutes' ? Math.ceil(minValue * 60) : minValue)
              : (unit === 'days' ? Math.ceil(minValue / 24) : minValue)
            }
            max={useMinutesHours 
              ? (unit === 'minutes' ? maxHours * 60 : maxHours)
              : (unit === 'days' ? maxDays : maxHours)
            }
            onChange={handleInputChange}
          />
          <select 
            className="time-select" 
            value={unit} 
            onChange={handleUnitChange}
          >
            {useMinutesHours ? (
              <>
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
              </>
            ) : (
              <>
                <option value="hours">hours</option>
                <option value="days">days</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;