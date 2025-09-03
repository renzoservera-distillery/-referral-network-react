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
- Dynamic SVG loading from `assets/icons/` (130+ icons)
- Async loading with DOMParser for SVG content extraction
- Fallback placeholder for missing/invalid icons
- Forces `currentColor` for proper color inheritance
- Loading state with skeleton placeholder
- Usage: `<Icon name="person-add" size={24} />`

**Notification System** (`contexts/NotificationContext`):
- Context-based state management for app-wide notifications
- Reducer pattern with actions: SET_NOTIFICATIONS, ADD_NOTIFICATION, MARK_AS_READ, etc.
- `NotificationDropdown`: Positioned dropdown with unread count badge
- `NotificationItem`: Individual notification with icon, timestamp, mark as read functionality
- Uses `useNotifications` hook for component integration
- Mock data system with notification types: success, info, warning, error

**Complex Form Components**:
- `TimeSlider`: Custom dual-control slider (input + range)
- `LocationMultiselect`: Hierarchical location selection with search
- `LawFirmMultiselect`: Multi-select with categorization

**Data Display Components**:
- `AttorneyCarousel`: Touch/drag-enabled horizontal scroll with overlay buttons
- `NetworkMembersList`: Multi-layout expandable cards with statistics separation
  - **4 Layout Options**: Default List, Card Grid, Visual Cards, List with Preview
  - **Layout Switcher**: Dropdown selector allowing users to switch between layout modes
  - **Statistics Architecture**: Clear separation between user configuration (fee %) and attorney performance metrics
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
- `src/data/attorneys.js`: Centralized attorney data by category (referred, invited, losAngeles, carAccidents, personalInjury, lawTigers)
- `categoryNames` export maps category keys to display titles
- Component-level state management with React hooks
- No external state management library

**Attorney Data Structure**:
```javascript
{
  name: "Michael B. Wilson",
  firm: "Wilson & Associates", 
  location: "Los Angeles, CA",
  specialties: ["Personal Injury", "Car Accidents"],
  initials: "MW" // Used for avatar generation
}
```

### Advanced Filtering Architecture

**Search Debouncing Pattern**:
MyNetwork implements search debouncing with 500ms delay:
```jsx
const [inputValue, setInputValue] = useState(''); // User input
const [searchTerm, setSearchTerm] = useState(''); // Debounced value

useEffect(() => {
  const debounceTimer = setTimeout(() => {
    setSearchTerm(inputValue);
    setIsSearchLoading(false);
  }, 500);
  return () => clearTimeout(debounceTimer);
}, [inputValue]);
```

**Filter State Management**:
- `activeFilters`: Object with arrays for each filter type (locations, practiceAreas, lawFirms, communities)
- Separate filter states for Expand Network and Network Members sections
- Filter chips provide individual removal with `onRemoveFilter(filterType, value)`
- Clear All functionality when multiple filter categories are active

**Category Visibility Logic**:
Attorney carousels are conditionally rendered - categories with no matching results are hidden when search/filters are active.

**Attorney Exclusion Logic**:
- Attorneys already in network are filtered out from Expand Network section
- Complex multi-field search matching (name, firm, location, specialties)
- Nested filter logic with AND conditions between filter types

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
- Skeleton loading states with shimmer animations
- Touch-optimized button sizes (minimum 44px targets)

### Consistent UI Patterns
**Icon + Label Display**:
- Practice areas: `<Icon name="briefcase" size={14} />` + text
- Locations: `<Icon name="location" size={14} />` + text
- Used consistently across NetworkMembersList, AddToNetworkModal, AddAttorneysModal

### TimeSlider System Architecture

**Dual Time Unit Systems**:
- Time per Attorney: Uses minutes/hours system (`useMinutesHours={true}`)
- Marketplace Fallback: Uses hours/days system (`useMinutesHours={false}`)

**Synchronization Logic**:
- NetworkModal implements cross-system conversion between different time units
- Marketplace Fallback minimum is dynamically calculated: `Math.max(convertToHours(timeValue, timeUnit), 2)`
- Time per Attorney minimum: 30 minutes (0.5 hours)
- Marketplace Fallback minimum: 2 hours

**TimeSlider Component Pattern**:
```jsx
// Time per Attorney (minutes/hours)
<TimeSlider
  value={timeValue}
  unit={timeUnit}
  onValueChange={handleTimeValueChange}
  onUnitChange={handleTimeUnitChange}
  minValue={0.5}
  useMinutesHours={true}
/>

// Marketplace Fallback (hours/days)
<TimeSlider
  value={marketplaceValue}
  unit={marketplaceUnit}
  minValue={Math.max(convertToHours(timeValue, timeUnit), 2)}
  useMinutesHours={false}
/>
```

**Unit Conversion Functions**:
NetworkModal contains helper functions for time conversion:
- `convertToHours(value, unit)`: Normalizes all time values to hours for comparison
- `convertFromHours(hours, preferredUnit)`: Converts hours back to target unit system

### NetworkMembersList Layout System

**Layout Architecture**:
The NetworkMembersList component implements a sophisticated multi-layout system with 4 distinct viewing options:

1. **Default List Layout**: Expandable rows with fee badge and performance metrics separation
2. **Card Grid Layout**: Split metrics bar (fee section left, performance section right)  
3. **Visual Cards Layout**: Fee badge in left section, performance grid in center
4. **List with Preview Layout**: Enhanced statistics grid with separated fee configuration

**Statistics Separation Pattern**:
Critical UX architecture separating user configuration from attorney performance data:

```jsx
// User Configuration (editable by user)
- Fee Percentage: User-set referral fee, styled in brand blue (#002e69)
- Visual Treatment: Badges, smaller sizing, hover states indicating editability

// Attorney Performance (read-only metrics)  
- Cases Referred: Number of cases sent to attorney
- Cases Signed: Number of cases attorney accepted
- Conversion Rate: Success rate percentage with performance indicators
- Visual Treatment: Prominent display with success colors (#10b981)
```

**Layout State Management**:
```jsx
const [layoutMode, setLayoutMode] = useState('default');
// Options: 'default', 'grid', 'visual', 'preview'
```

**Performance Indicators**: Color-coded bottom bars showing performance levels:
- High (≥70%): Green (#10b981)  
- Medium (50-69%): Orange (#f59e0b)
- Low (<50%): Red (#ef4444)

### Browser Support
Configured for modern browsers via browserslist in package.json. IE11 not supported.

## Important Development Constraints

### Code Style Requirements
- **No Comments**: Code should be self-documenting without inline comments
- **No New Files**: Always prefer editing existing files over creating new ones
- **No Documentation Files**: Never proactively create README, .md files, or documentation unless explicitly requested

### Component Creation Guidelines
- Check existing components first before creating new ones
- Use existing libraries and utilities only (check package.json dependencies)
- Follow established patterns for Icon usage, modal implementation, and time slider configuration
- Maintain consistent naming: camelCase for variables, PascalCase for components

### Critical UX Architecture Patterns
- **Statistics Separation**: Always distinguish user configuration (fee %) from attorney performance metrics
- **Visual Hierarchy**: Use brand blue (#002e69) for user settings, success green (#10b981) for performance
- **Data Ownership Clarity**: Make it visually clear which data users control vs. attorney-driven metrics
- **Performance Indicators**: Implement color-coded indicators (high/medium/low) for conversion rates
- **Layout Consistency**: When adding new layouts, maintain the fee/performance separation pattern