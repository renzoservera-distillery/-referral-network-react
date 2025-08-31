// Body scroll manager to prevent conflicts between multiple modals
class BodyScrollManager {
  constructor() {
    this.lockCount = 0;
    this.originalOverflow = '';
  }

  lock() {
    if (this.lockCount === 0) {
      // Store original overflow value
      this.originalOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
    }
    this.lockCount++;
  }

  unlock() {
    this.lockCount = Math.max(0, this.lockCount - 1);
    
    if (this.lockCount === 0) {
      // Restore original overflow value
      document.body.style.overflow = this.originalOverflow;
    }
  }

  // Force unlock (for cleanup)
  forceUnlock() {
    console.log('Force unlocking body scroll, lockCount was:', this.lockCount);
    this.lockCount = 0;
    document.body.style.overflow = this.originalOverflow || '';
    console.log('Body overflow reset to:', document.body.style.overflow);
  }

  // Debug method
  getStatus() {
    return {
      lockCount: this.lockCount,
      currentOverflow: document.body.style.overflow,
      originalOverflow: this.originalOverflow
    };
  }
}

// Create singleton instance
const bodyScrollManager = new BodyScrollManager();

export default bodyScrollManager;