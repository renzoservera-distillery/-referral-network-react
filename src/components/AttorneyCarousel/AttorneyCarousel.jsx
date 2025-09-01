import React, { useState } from 'react';
import Icon from '../Icon';
import AddToNetworkModal from '../AddToNetworkModal';
import './AttorneyCarousel.css';

const AttorneyCard = ({ attorney, onAddClick, isDragging, wasDragged }) => {
  const handleClick = (e) => {
    // Prevent click if we were dragging or are currently dragging
    if (isDragging || wasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onAddClick(attorney);
  };

  return (
    <div className={`attorney-card ${isDragging ? 'dragging' : ''}`}>
      <button 
        className="btn-add-corner" 
        onClick={handleClick}
        aria-label={`Add ${attorney.name} to network`}
      >
        <Icon name="plus" size={16} />
        <span>Add to Network</span>
      </button>
      
      <div className="attorney-avatar">
        <img
          src={`https://ui-avatars.com/api/?name=${attorney.initials}&background=random`}
          alt={attorney.name}
          draggable={false}
        />
      </div>
      <div className="attorney-info">
        <h4 className="attorney-name">{attorney.name}</h4>
        <p className="attorney-firm">{attorney.firm}</p>
        <div className="attorney-practice-areas">
          <Icon name="briefcase" className="practice-icon" size={14} />
          <span className="practice-areas-text">
            {attorney.specialties.join(', ')}
          </span>
        </div>
        <div className="attorney-location-row">
          <Icon name="location" className="location-icon" size={14} />
          <span className="location-text">{attorney.location}</span>
        </div>
      </div>
    </div>
  );
};

const AttorneyCarousel = ({ attorneys, categoryId, title, onAttorneyAdd }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedAttorney, setSelectedAttorney] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, position: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [wasDragged, setWasDragged] = useState(false);
  
  const cardsPerView = 2;
  const totalCards = attorneys.length;
  const maxPosition = Math.max(0, totalCards - cardsPerView);

  const navigateNext = () => {
    if (currentPosition < maxPosition) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const navigatePrev = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const handleAddClick = (attorney) => {
    setSelectedAttorney(attorney);
    setIsModalOpen(true);
  };

  const handleAddToNetwork = (networkSettings) => {
    if (onAttorneyAdd) {
      onAttorneyAdd(networkSettings);
    }
    setIsModalOpen(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    // Don't start drag if clicking on a button
    if (e.target.classList.contains('btn-add-corner') || e.target.closest('.btn-add-corner')) {
      return;
    }
    
    e.preventDefault();
    setIsDragging(true);
    setWasDragged(false);
    setDragStart({
      x: e.clientX,
      position: currentPosition
    });
    setDragOffset(0);
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const containerWidth = 400; // More accurate carousel width per card
    const dragDistance = -deltaX / containerWidth;
    
    // Mark as dragged if moved significantly
    if (Math.abs(deltaX) > 5) {
      setWasDragged(true);
    }
    
    // Calculate new position with constraints
    let newPosition = dragStart.position + dragDistance;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    const finalOffset = newPosition - dragStart.position;
    setDragOffset(finalOffset);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    document.body.style.userSelect = '';
    
    // Calculate final position based on drag distance
    const finalPosition = dragStart.position + dragOffset;
    
    // Determine snap position based on drag distance
    let snapPosition;
    if (Math.abs(dragOffset) > 0.3) {
      // If dragged significantly, snap to the direction of drag
      snapPosition = dragOffset > 0 ? Math.ceil(finalPosition) : Math.floor(finalPosition);
    } else {
      // If small drag, snap to nearest whole position
      snapPosition = Math.round(finalPosition);
    }
    
    // Constrain to valid range
    const constrainedPosition = Math.max(0, Math.min(snapPosition, maxPosition));
    
    // Set the final position and reset drag offset
    setCurrentPosition(constrainedPosition);
    setDragOffset(0);
    
    // Reset wasDragged after a short delay to allow click prevention
    setTimeout(() => setWasDragged(false), 100);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e) => {
    // Don't start drag if touching a button
    if (e.target.classList.contains('btn-add-corner') || e.target.closest('.btn-add-corner')) {
      return;
    }
    
    const touch = e.touches[0];
    setIsDragging(true);
    setWasDragged(false);
    setDragStart({
      x: touch.clientX,
      position: currentPosition
    });
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const containerWidth = 400;
    const dragDistance = -deltaX / containerWidth;
    
    // Mark as dragged if moved significantly
    if (Math.abs(deltaX) > 5) {
      setWasDragged(true);
    }
    
    let newPosition = dragStart.position + dragDistance;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    const finalOffset = newPosition - dragStart.position;
    setDragOffset(finalOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Calculate final position based on drag distance
    const finalPosition = dragStart.position + dragOffset;
    
    // Determine snap position based on drag distance
    let snapPosition;
    if (Math.abs(dragOffset) > 0.3) {
      // If dragged significantly, snap to the direction of drag
      snapPosition = dragOffset > 0 ? Math.ceil(finalPosition) : Math.floor(finalPosition);
    } else {
      // If small drag, snap to nearest whole position
      snapPosition = Math.round(finalPosition);
    }
    
    // Constrain to valid range
    const constrainedPosition = Math.max(0, Math.min(snapPosition, maxPosition));
    
    setCurrentPosition(constrainedPosition);
    setDragOffset(0);
    
    // Reset wasDragged after a short delay to allow click prevention
    setTimeout(() => setWasDragged(false), 100);
  };

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, dragOffset, maxPosition]);

  const translateX = -((currentPosition + dragOffset) * (100 / cardsPerView));

  return (
    <section className="attorney-section">
      <h3 className="section-title">{title}</h3>
      <div className="carousel-container">
        <button
          className={`carousel-btn carousel-prev ${currentPosition === 0 ? 'disabled' : ''}`}
          onClick={navigatePrev}
          disabled={currentPosition === 0}
          aria-label="Previous"
        >
          <Icon name="chevron-left" />
        </button>
        
        <div 
          className="attorney-carousel"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`attorney-carousel-track ${isDragging ? 'dragging' : ''}`}
            style={{ 
              transform: `translateX(${translateX}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
          >
            {attorneys.map((attorney, index) => (
              <AttorneyCard 
                key={index} 
                attorney={attorney} 
                onAddClick={handleAddClick}
                isDragging={isDragging}
                wasDragged={wasDragged}
              />
            ))}
          </div>
        </div>
        
        <button
          className={`carousel-btn carousel-next ${currentPosition >= maxPosition ? 'disabled' : ''}`}
          onClick={navigateNext}
          disabled={currentPosition >= maxPosition}
          aria-label="Next"
        >
          <Icon name="chevron-right" />
        </button>
      </div>

      {/* Add to Network Modal */}
      <AddToNetworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attorney={selectedAttorney}
        onAdd={handleAddToNetwork}
      />
    </section>
  );
};

export default AttorneyCarousel;