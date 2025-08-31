import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width, 
        height, 
        borderRadius 
      }}
    />
  );
};

const AttorneyCardSkeleton = () => {
  return (
    <div className="attorney-card-skeleton">
      <div className="skeleton-header">
        <Skeleton width="48px" height="48px" borderRadius="50%" />
        <div className="skeleton-button">
          <Skeleton width="60px" height="24px" borderRadius="12px" />
        </div>
      </div>
      <div className="skeleton-info">
        <Skeleton width="70%" height="16px" className="skeleton-name" />
        <Skeleton width="50%" height="14px" className="skeleton-firm" />
        <Skeleton width="40%" height="14px" className="skeleton-location" />
        <div className="skeleton-specialties">
          <Skeleton width="80px" height="20px" borderRadius="4px" />
          <Skeleton width="100px" height="20px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
};

const NetworkMemberSkeleton = () => {
  return (
    <div className="network-member-skeleton">
      <div className="skeleton-member-row">
        <Skeleton width="40px" height="40px" borderRadius="50%" />
        <div className="skeleton-member-info">
          <Skeleton width="60%" height="16px" />
          <Skeleton width="40%" height="14px" />
        </div>
        <div className="skeleton-stats">
          <Skeleton width="30px" height="14px" />
          <Skeleton width="30px" height="14px" />
          <Skeleton width="30px" height="14px" />
          <Skeleton width="30px" height="14px" />
        </div>
      </div>
    </div>
  );
};

export { Skeleton, AttorneyCardSkeleton, NetworkMemberSkeleton };