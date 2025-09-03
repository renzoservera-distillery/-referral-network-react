import React from 'react';
import * as FluentIcons from '@fluentui/react-icons';

const iconMap = {
  'alert': 'Alert24Regular',
  'bell': 'Alert24Regular',
  'briefcase': 'Briefcase24Regular',
  'briefcase-search': 'BriefcaseSearch24Regular',
  'chart-multiple': 'ChartMultiple24Regular',
  'chat': 'Chat24Regular',
  'check': 'Checkmark24Regular',
  'checkmark': 'Checkmark24Regular',
  'chevron-down': 'ChevronDown24Regular',
  'chevron-up': 'ChevronUp24Regular',
  'chevron-left': 'ChevronLeft24Regular',
  'chevron-right': 'ChevronRight24Regular',
  'close': 'Dismiss24Regular',
  'dismiss': 'Dismiss24Regular',
  'edit': 'Edit24Regular',
  'filter': 'Filter24Regular',
  'info': 'Info24Regular',
  'layer-diagonal': 'LayerDiagonal24Regular',
  'layers': 'Layer24Regular',
  'location': 'Location24Regular',
  'menu': 'Navigation24Regular',
  'people-team': 'PeopleTeam24Regular',
  'people-team-toolbox': 'PeopleTeamToolbox24Regular',
  'percent': 'TextNumberFormat24Regular',
  'person-add': 'PersonAdd24Regular',
  'person-arrow-back': 'PersonArrowBack24Regular',
  'person-home': 'PersonBoard24Regular',
  'person-plus': 'PersonAdd24Regular',
  'plus': 'Add24Regular',
  'search': 'Search24Regular',
  'settings': 'Settings24Regular',
  'trash': 'Delete24Regular',
  'warning': 'Warning24Regular',
  'error': 'ErrorCircle24Regular',
  'success': 'CheckmarkCircle24Regular',
  'money': 'Money24Regular',
  'document-text': 'DocumentText24Regular',
  'notebook': 'Notebook24Regular',
  'person-feedback': 'PersonFeedback24Regular',
  'navigation': 'Navigation24Regular',
  'phone': 'Phone24Regular',
  'people': 'People24Regular',
  'chat-multiple': 'ChatMultiple24Regular',
  'person': 'Person24Regular',
  'person-ribbon': 'PersonRibbon24Regular',
  'layer-diagonal-person': 'LayerDiagonalPerson24Regular',
  'person-search': 'PersonSearch24Regular',
  'checkmark-circle': 'CheckmarkCircle24Regular',
  'clock-dismiss': 'ClockDismiss24Regular',
  'document-dismiss': 'DocumentDismiss24Regular',
  'clock': 'Clock24Regular',
  'store': 'BuildingRetail24Regular',
  'document-percent': 'DocumentPercent24Regular',
  'target-arrow': 'TargetArrow24Regular',
  'person-delete': 'PersonDelete24Regular',
  'building': 'Building24Regular',
  'building-people': 'BuildingPeople24Regular'
};

const getFluentIconName = (iconName, size) => {
  const baseIconName = iconMap[iconName];
  if (!baseIconName) {
    return null;
  }
  
  const sizePrefix = size <= 16 ? '16' : 
                     size <= 20 ? '20' : 
                     size <= 24 ? '24' :
                     size <= 28 ? '28' :
                     size <= 32 ? '32' : '48';
  
  const iconNameWithSize = baseIconName.replace(/24/, sizePrefix);
  
  if (FluentIcons[iconNameWithSize]) {
    return iconNameWithSize;
  }
  
  const filledIconName = iconNameWithSize.replace('Regular', 'Filled');
  if (FluentIcons[filledIconName]) {
    return filledIconName;
  }
  
  return baseIconName;
};

const Icon = ({ name, size = 24, className = '', style = {}, ...props }) => {
  const fluentIconName = getFluentIconName(name, size);
  
  if (!fluentIconName || !FluentIcons[fluentIconName]) {
    console.warn(`Icon "${name}" not found in Fluent UI icons library`);
    return (
      <div 
        className={`icon-wrapper icon-placeholder ${className}`} 
        style={{
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          opacity: 0.3,
          borderRadius: '2px',
          display: 'inline-block',
          ...style
        }}
        {...props}
      />
    );
  }
  
  const FluentIcon = FluentIcons[fluentIconName];
  
  return (
    <div 
      className={`icon-wrapper ${className}`} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        ...style 
      }}
      {...props}
    >
      <FluentIcon 
        style={{ 
          fontSize: size,
          width: size,
          height: size
        }}
      />
    </div>
  );
};

export default Icon;