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
        onValueChange(Math.round(constrainedHours));
      }
    } else {
      if (unit === 'days') {
        const days = Math.round(constrainedHours / 24);
        onValueChange(Math.min(days, maxDays));
      } else {
        onValueChange(Math.round(constrainedHours));
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
    return ((sliderValue - minValue) / (maxHours - minValue)) * 100;
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
            min={minValue}
            max={maxHours}
            value={sliderValue}
            onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
            step={useMinutesHours && unit === 'minutes' ? 0.5 : 1}
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
                // Minutes/hours system - 30 minutes to 96 hours
                (() => {
                  // Calculate tick positions for 0.5 to 96 hours range
                  const range = maxHours - minValue;
                  return (
                    <>
                      <span className="tick" style={{ left: '0%' }}>30m</span>
                      <span className="tick" style={{ left: `${((24 - minValue) / range) * 100}%` }}>24h</span>
                      <span className="tick" style={{ left: `${((48 - minValue) / range) * 100}%` }}>48h</span>
                      <span className="tick" style={{ left: `${((72 - minValue) / range) * 100}%` }}>72h</span>
                      <span className="tick" style={{ left: '100%' }}>96h</span>
                    </>
                  );
                })()
              ) : (
                // Hours/days system - dynamic based on minValue
                (() => {
                  const formatTickLabel = (hours) => {
                    if (hours < 24) return `${hours}h`;
                    const days = Math.round(hours / 24);
                    return `${days}d`;
                  };
                  
                  const range = maxHours - minValue;
                  const tickValues = [];
                  
                  // Always show min value
                  tickValues.push(minValue);
                  
                  // Add intermediate values
                  if (minValue <= 24 && maxHours >= 24) tickValues.push(24);
                  if (minValue <= 48 && maxHours >= 48) tickValues.push(48);
                  if (minValue <= 72 && maxHours >= 72) tickValues.push(72);
                  
                  // Always show max value
                  if (!tickValues.includes(maxHours)) tickValues.push(maxHours);
                  
                  return (
                    <>
                      {tickValues.map((hours, index) => (
                        <span 
                          key={index}
                          className="tick" 
                          style={{ left: `${((hours - minValue) / range) * 100}%` }}
                        >
                          {formatTickLabel(hours)}
                        </span>
                      ))}
                    </>
                  );
                })()
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