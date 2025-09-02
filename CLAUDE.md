# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AttorneyShare - A React 18 referral network application for legal professionals built with Create React App. Deployed on Vercel with automatic deployments from GitHub.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Run specific test file
npm test -- NetworkMembersList.test.js

# Run tests with coverage
npm test -- --coverage --watchAll=false

# ESLint check (via react-scripts)
EXTEND_ESLINT=true npm start
```

## Deployment

**GitHub Repository**: https://github.com/renzoservera-distillery/-referral-network-react
**Live URL**: https://referral-network-react-bmx9.vercel.app/

Push to main branch triggers automatic Vercel deployment.

## Architecture & Key Patterns

### Core Application Structure

**Main Layout Flow**:
```
App.js
├── Header (fixed top navigation)
├── Sidebar (collapsible, mobile-responsive)
└── Main Content
    └── MyNetwork (primary view)
        ├── NetworkMembersList
        ├── AttorneyCarousel sections
        └── Modal system
```

### Modal System Architecture

All modals use `bodyScrollManager` singleton to prevent scroll conflicts. Pattern:

```jsx
// Parent component manages state
const [isModalOpen, setIsModalOpen] = useState(false);

// Modal implementation
useEffect(() => {
  if (isOpen) {
    bodyScrollManager.lock();
    return () => bodyScrollManager.unlock();
  }
}, [isOpen]);
```

**Key Modals**:
- `AddToNetworkModal`: Dual-mode (add/edit) with attorney configuration
- `NetworkModal`: Referral settings with TimeSlider components
- `FiltersModal`: Advanced filtering with multi-select components
- `ConfirmationModal`: Reusable confirmation dialogs

### Component Patterns

**Icon System** (`components/Icon`):
- Dynamic SVG loading from `assets/icons/` (128+ icons)
- Async with fallback handling
- Forces `currentColor` for proper color inheritance
- Usage: `<Icon name="person-add" size={24} />`

**Notification System** (`contexts/NotificationContext`):
- Context-based state management for app-wide notifications
- `NotificationDropdown`: Positioned dropdown with unread count
- `NotificationItem`: Individual notification with icon, timestamp, mark as read
- Uses `useNotifications` hook for component integration

**Complex Form Components**:
- `TimeSlider`: Custom dual-control slider (input + range)
- `LocationMultiselect`: Hierarchical location selection with search
- `LawFirmMultiselect`: Multi-select with categorization

**Data Display Components**:
- `AttorneyCarousel`: Touch/drag-enabled horizontal scroll with overlay buttons
- `NetworkMembersList`: Expandable cards with inline client tables
  - Recent Clients table columns: Client Name, Case Type, Referred, Status
  - Status values: "Signed", "Matched", "Not Matched", "Active"

### State Management

**Network Members Structure**:
```javascript
{
  id: number,
  name: string,
  firm: string,
  location: string,
  specialties: string[],
  feePercentage: number,    // Added when attorney joins network
  caseTypes: string[],       // Added when attorney joins network
  locations: string[]        // Added when attorney joins network
}
```

**Data Sources**:
- `src/data/attorneys.js`: Centralized attorney data by category
- Component-level state management with React hooks
- No external state management library

### Mobile Responsiveness

**Breakpoints**:
- Desktop: > 768px
- Tablet: 768px
- Mobile: 480px

**Mobile-Specific Features**:
- Hamburger menu navigation
- Full-screen modals on mobile
- Touch-optimized carousels
- Safe area support for notched devices

### Critical UI/UX Patterns

**Empty States**: 
- Avatar showcases with statistics
- Gradient backgrounds (#002e69 primary)
- Multiple CTAs with clear hierarchy

**Accessibility**:
- WCAG 2.1 AA compliance
- Focus management in modals
- ARIA labels on interactive elements
- Minimum 44px touch targets on mobile

**Performance Optimizations**:
- Skeleton loading states (`components/Skeleton`)
- Lazy-loaded icon components
- Optimized carousel with virtual scrolling consideration

## Technical Considerations

### Body Scroll Management
Always use `bodyScrollManager` utility for modals to prevent scroll lock conflicts between multiple modals.

### Git Workflow
Repository uses main branch. Changes require:
1. `git add -A`
2. `git commit -m "Description"`
3. `git push origin main` (triggers Vercel deployment)

### CSS Architecture
- Component-scoped CSS files (each component has its own .css file)
- No CSS-in-JS or CSS Modules
- Heavy use of CSS gradients and transforms
- Consistent color palette: primary #002e69
- Font system: Inter (via Google Fonts) as primary font family
- Icon-based UI patterns: briefcase icon for practice areas, location icon for locations

### Consistent UI Patterns
**Icon + Label Display**:
- Practice areas: `<Icon name="briefcase" size={14} />` + text
- Locations: `<Icon name="location" size={14} />` + text
- Used consistently across NetworkMembersList, AddToNetworkModal, AddAttorneysModal

### Browser Support
Configured for modern browsers via browserslist in package.json. IE11 not supported.