# AttorneyShare - Referral Network Application

A modern React 18 application for legal professionals to manage and expand their referral networks. Built with Create React App and deployed on Vercel with automatic deployments from GitHub.

## 🌟 Features

### Core Functionality
- **Network Management**: Build and manage your attorney referral network
- **Smart Referral System**: Waterfall referrals with time-based cascading
- **Attorney Discovery**: Browse and filter attorneys by practice area, location, and law firm
- **Real-time Statistics**: Track referral performance, conversion rates, and fee percentages
- **Advanced Filtering**: Multi-select filters with visual filter chips
- **Responsive Design**: Mobile-first design with touch-optimized interactions

### Key Components
- **Attorney Carousels**: Touch-enabled horizontal scrolling with overlay controls
- **Network Members List**: Expandable cards with detailed client tables and statistics
- **Time-based Settings**: Configurable time limits with dual slider systems
- **Modal System**: Comprehensive modal architecture with scroll management
- **Icon System**: Dynamic SVG loading with 128+ icons

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/renzoservera-distillery/-referral-network-react.git
cd referral-network-react

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## 📦 Available Scripts

### Development
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run specific test file
npm test -- NetworkMembersList.test.js

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

### Code Quality
```bash
# ESLint check (via react-scripts)
EXTEND_ESLINT=true npm start
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Icon/            # Dynamic SVG icon system
│   ├── TimeSlider/      # Dual-control time slider
│   ├── NetworkMembersList/  # Member management
│   ├── AttorneyCarousel/    # Touch-enabled carousels
│   ├── AddToNetworkModal/   # Attorney configuration modal
│   ├── NetworkModal/        # Referral settings modal
│   ├── FiltersModal/        # Advanced filtering
│   └── ...
├── pages/               # Page components
│   └── MyNetwork/       # Main network management page
├── data/               # Static data and mock data
│   └── attorneys.js    # Centralized attorney data
├── utils/              # Utility functions
│   └── bodyScrollManager.js  # Modal scroll management
└── assets/
    └── icons/          # SVG icon library (128+ icons)
```

## 🎨 Architecture & Design Patterns

### Component Architecture
```
App.js
├── Header (fixed navigation)
├── Sidebar (collapsible, mobile-responsive)
└── Main Content
    └── MyNetwork (primary view)
        ├── NetworkMembersList
        ├── AttorneyCarousel sections
        └── Modal system
```

### State Management
- **React Hooks**: useState, useEffect, useCallback for local state
- **No External Libraries**: Pure React state management
- **Modal State**: Centralized modal management with bodyScrollManager

### Data Flow
- **Centralized Data**: `src/data/attorneys.js` contains all attorney data
- **Component Props**: Standard prop drilling for state management
- **Event Handling**: Custom handlers for complex interactions

## ⚙️ Key Features Deep Dive

### Referral Network Settings
- **Time per Attorney**: 30 minutes to 72 hours (minutes/hours system)
- **Marketplace Fallback**: 2 hours to 7 days (hours/days system)
- **Waterfall System**: Sequential referral distribution with time limits
- **Synchronization**: Marketplace Fallback automatically adjusts to maintain logical constraints

### Advanced Filtering System
- **Multi-select Filters**: Practice areas, locations, law firms, communities
- **Visual Filter Chips**: Individual removal with clear all option
- **Search Integration**: Debounced search with filter combination
- **Empty State Handling**: Conditional clear buttons and no-results states

### Time Slider Components
- **Dual Unit Systems**: Supports both minutes/hours and hours/days
- **Dynamic Constraints**: Minimum values adjust based on related settings
- **Visual Feedback**: Tick marks reflect actual constraints
- **Touch Optimized**: Smooth dragging on mobile devices

### Mobile Responsiveness
```css
/* Breakpoints */
Desktop: > 768px
Tablet: 768px
Mobile: 480px
```
- **Adaptive Navigation**: Hamburger menu on mobile
- **Touch Interactions**: Optimized carousel controls
- **Safe Area Support**: Handles notched devices
- **Full-screen Modals**: Better mobile experience

## 🎯 Performance Optimizations

### Loading States
- **Skeleton Loading**: Smooth loading transitions
- **Lazy Loading**: Icons loaded on demand
- **Debounced Search**: 500ms delay to prevent excessive filtering

### Memory Management
- **Modal Cleanup**: Proper scroll lock cleanup on unmount
- **Event Listeners**: Cleanup on component destruction
- **useCallback**: Optimized re-render prevention

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Primary**: Vercel (automatic deployments)
- **Repository**: GitHub integration
- **URL**: [https://referral-network-react-bmx9.vercel.app/](https://referral-network-react-bmx9.vercel.app/)

### Environment Configuration
- **Homepage Field**: Configured in package.json
- **Build Optimization**: Production-optimized bundle
- **Browser Support**: Modern browsers via browserslist

## 🔧 Development Guidelines

### Code Style
- **No Comments**: Clean, self-documenting code
- **Consistent Naming**: camelCase for variables, PascalCase for components
- **File Structure**: Component-scoped CSS files
- **Security**: Never expose or log secrets/keys

### Component Patterns
```jsx
// Icon Usage
<Icon name="person-add" size={24} />

// TimeSlider Configuration
<TimeSlider
  value={timeValue}
  unit={timeUnit}
  onValueChange={handleValueChange}
  onUnitChange={handleUnitChange}
  useMinutesHours={true}
  minValue={0.5}
/>

// Modal Integration
useEffect(() => {
  if (isOpen) {
    bodyScrollManager.lock();
    return () => bodyScrollManager.unlock();
  }
}, [isOpen]);
```

### Data Structures
```javascript
// Network Member Structure
{
  id: number,
  name: string,
  firm: string,
  location: string,
  specialties: string[],
  feePercentage: number,
  caseTypes: string[],
  locations: string[]
}

// Client Data Structure
{
  id: number,
  name: string,
  caseType: string,
  date: string,
  status: 'Signed' | 'Matched' | 'Not Matched' | 'Active'
}
```

## 🎨 UI/UX Design System

### Color Palette
- **Primary**: #002e69 (Corporate Blue)
- **Success**: #059669 (Green)
- **Danger**: #dc2626 (Red)
- **Gray Scale**: #111827, #374151, #6b7280, #9ca3af, #d1d5db, #e5e7eb, #f3f4f6, #f9fafb

### Typography
- **Primary Font**: 'Inter', sans-serif
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Component Standards
- **Minimum Touch Target**: 44px on mobile
- **Border Radius**: 8px standard, 16px for modals
- **Shadows**: Layered approach with rgba values
- **Transitions**: 0.2s ease for most interactions

## 🧪 Testing

### Test Structure
```bash
# Component Tests
src/components/__tests__/

# Integration Tests
src/__tests__/

# Coverage Reports
npm test -- --coverage --watchAll=false
```

### Testing Guidelines
- **Component Testing**: Focus on user interactions
- **Integration Testing**: Test component communication
- **Accessibility Testing**: WCAG 2.1 AA compliance

## 🔒 Security Considerations

### Best Practices
- **No Secrets in Code**: Environment variables for sensitive data
- **Input Validation**: Sanitized user inputs
- **XSS Prevention**: Proper data escaping
- **CSRF Protection**: Token-based protection where needed

## 📱 Browser Support

Configured via browserslist in package.json:
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Not Supported**: Internet Explorer

## 🤝 Contributing

### Development Workflow
1. **Clone** the repository
2. **Create** feature branch from `main`
3. **Develop** with proper testing
4. **Build** and verify no errors
5. **Commit** with descriptive messages
6. **Push** to GitHub (triggers Vercel deployment)

### Commit Message Format
```
feat: add new attorney filtering system
fix: resolve modal scroll lock issue
docs: update README with deployment instructions
style: improve mobile responsive design
```

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

### Common Issues
- **Port 3000 in use**: The application defaults to port 3000
- **Build failures**: Check Node.js version (16+ required)
- **Modal issues**: Ensure bodyScrollManager is properly imported

### Development Resources
- **React Documentation**: [https://react.dev](https://react.dev)
- **Create React App**: [https://create-react-app.dev](https://create-react-app.dev)
- **Vercel Deployment**: [https://vercel.com/docs](https://vercel.com/docs)

---

**Built with ❤️ using React 18 and modern web technologies**

*Last updated: September 2024*