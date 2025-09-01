import React, { useEffect } from 'react';
import Icon from '../Icon';
import bodyScrollManager from '../../utils/bodyScrollManager';
import './ConfirmationModal.css';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning" // warning, danger, info
}) => {
  const modalRef = React.useRef(null);
  const cancelButtonRef = React.useRef(null);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Focus management and body scroll prevention
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      const previouslyFocused = document.activeElement;
      
      // Focus cancel button when modal opens (safer default for confirmation)
      setTimeout(() => {
        if (cancelButtonRef.current) {
          cancelButtonRef.current.focus();
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

  // Keyboard handling with focus trap
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

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay" onClick={handleOverlayClick}>
      <div 
        className="confirmation-modal"
        ref={modalRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-message"
      >
        <div className="confirmation-modal-header">
          <div className={`confirmation-icon ${type}`} aria-hidden="true">
            {type === 'warning' && <Icon name="alert" size={32} />}
            {type === 'danger' && <Icon name="alert" size={32} />}
            {type === 'info' && <Icon name="info" size={32} />}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="confirmation-modal-content">
          <h2 id="confirmation-title">{title}</h2>
          <p id="confirmation-message">{message}</p>
        </div>

        <div className="confirmation-modal-footer">
          <button 
            className="btn-cancel" 
            onClick={onClose}
            ref={cancelButtonRef}
          >
            {cancelText}
          </button>
          <button 
            className={`btn-confirm ${type}`}
            onClick={handleConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;