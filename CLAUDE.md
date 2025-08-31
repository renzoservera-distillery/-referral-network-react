# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React 18** application for a referral network system called "AttorneyShare". It's a single-page application built with Create React App that allows attorneys to manage their referral networks, discover new attorneys, and track network members.

## Development Commands

```bash
# Start development server (runs on localhost:3000)
npm start

# Build production bundle
npm build

# Run tests
npm test

# Run tests in watch mode (default)
npm test

# Run a specific test file
npm test -- MyComponent.test.js

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

## Architecture & Key Patterns

### Application Structure
- **Single main view**: Currently focused on "My Network" functionality with routing prepared for expansion
- **Layout**: Fixed header + optional sidebar + main content area
- **State management**: React hooks (useState) at component level, no external state management library

### Component Architecture

#### Core Layout Components
- `App.js`: Main application container, manages view routing and sidebar visibility
- `Header`: Fixed navigation bar with main navigation items and user profile
- `Sidebar`: Collapsible navigation sidebar (currently minimal)

#### Modal System
The application uses a comprehensive modal system for user interactions:
- `NetworkModal`: Network settings configuration (referral methods, time sliders)
- `AddToNetworkModal`: Add attorneys to network with configuration (fee %, case types, locations)
- `AddAttorneysModal`: Bulk attorney selection
- `FiltersModal`: Advanced filtering options

**Modal Pattern**: All modals follow the same pattern:
- `isOpen` prop for visibility
- `onClose` callback for closing
- `onSave`/`onAdd` callbacks for actions
- Overlay click handling
- Body scroll prevention when open

#### Data Management

**Attorney Data**: Centralized in `src/data/attorneys.js`
- Organized by categories (referred, invited, losAngeles, carAccidents, etc.)
- Each attorney has: name, firm, location, specialties, initials
- Category names provided separately for UI display

**Network Members**: Managed as stateful arrays with operations:
- Add single attorney (with network settings)
- Add multiple attorneys
- Remove member
- Edit member settings (fee %, case types, locations)

#### Icon System
Custom SVG icon system (`components/Icon`):
- Dynamic imports from `assets/icons/` (128+ SVG files available)
- Async loading with error handling and fallbacks
- Supports size, className, and standard props
- Parses SVG content for proper currentColor inheritance

#### Form Components

**Complex Form Inputs**:
- `TimeSlider`: Custom range slider with hour/day units, tick marks, and dual controls (numeric input + slider)
- `LocationMultiselect`: Advanced location selection with search and categorization
- `LawFirmMultiselect`: Multi-select for law firm filtering

**Form Pattern**: Custom form components handle:
- Internal state management
- Value/onChange pattern for parent communication
- Responsive design
- Validation and constraints

#### Data Display Components

**AttorneyCarousel**: Horizontal scrollable attorney cards
- Drag/touch navigation with smooth scrolling
- Overlapping navigation buttons over cards
- Modal integration for "Add to Network" actions

**NetworkMembersList**: 
- Expandable member cards with detailed views
- Search and filtering capabilities
- Inline actions (edit, remove)
- Client data tables within expanded views
- Two states: Empty state with onboarding, populated state with member management

### Styling Approach
- **CSS Modules pattern**: Each component has its own `.css` file
- **Gradient-heavy design**: Extensive use of CSS gradients for modern aesthetics
- **Interactive elements**: Hover effects, transforms, and smooth transitions throughout
- **Responsive design**: Mobile-first approach with media queries
- **Design system**: Consistent color palette centered around `#002e69` (primary blue)

### Enhanced UI Patterns

**Empty States**: Sophisticated empty states with:
- Avatar showcases and statistical badges
- Gradient backgrounds and modern styling
- Multiple call-to-action buttons
- Engaging copy and visual hierarchy

**Card Interactions**: 
- Hover effects with elevation and scaling
- Layered z-index management for overlapping elements
- Smooth transitions and micro-interactions

## Key Technical Considerations

### Icon Usage
Icons are referenced by filename (without extension) from the `assets/icons/` directory:
```jsx
<Icon name="person-add" size={24} />
```

### Modal State Management
All modals use a consistent pattern with parent-managed state. When adding new modals, follow the established pattern for proper body scroll handling and overlay interactions.

### Attorney Data Structure
When working with attorney data, always use the centralized data in `src/data/attorneys.js`. Network members have additional properties: `feePercentage`, `caseTypes`, `locations`.

### Responsive Considerations
The application is designed to work across devices. Many components have specific mobile breakpoints at 768px and 480px. Complex components like carousels and sliders have touch/drag support.