# AttorneyShare - Referral Network React Application

A sophisticated React 18 application for legal professionals to build, manage, and optimize their attorney referral networks. Features AI-powered smart referrals, comprehensive network management, and a modern, responsive interface designed specifically for the legal industry.

🌐 **Live Application**: [https://referral-network-react-bmx9.vercel.app/](https://referral-network-react-bmx9.vercel.app/)

## ✨ Key Features

### 🎯 Smart Referral Management
- **Waterfall Referrals™**: Sequential referral distribution with configurable time limits
- **Time-based Cascading**: Automatically moves to next attorney if not accepted within timeframe
- **Marketplace Fallback**: Sends referrals to marketplace when network options are exhausted
- **Professional Avatar System**: AI-generated diverse professional avatars for all attorneys

### 🔧 Network Management
- **Dynamic Network Building**: Add attorneys with custom fee percentages and case type preferences
- **Advanced Filtering**: Multi-select filters by practice areas, locations, law firms, and communities
- **Real-time Statistics**: Track referral performance, conversion rates, and attorney activity
- **Client Management**: Detailed client tables with case tracking and status monitoring

### 📱 Modern User Experience
- **Responsive Design**: Mobile-first approach with touch-optimized interactions
- **Touch-enabled Carousels**: Smooth horizontal scrolling with overlay controls
- **Advanced Modal System**: Comprehensive modal architecture with scroll management
- **Professional UI**: Clean, modern interface with 130+ custom icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn
- Git

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/renzoservera-distillery/-referral-network-react.git
cd referral-network-react

# Install dependencies
npm install

# Start development server
npm start
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Available Scripts
```bash
# Development
npm start              # Start development server
npm run build         # Production build
npm test              # Run test suite
npm test -- --coverage --watchAll=false  # Coverage report

# Testing specific files
npm test -- NetworkMembersList.test.js
```

## 🏗️ Architecture Overview

### Core Application Flow
```
App.js
├── Header (fixed navigation)
├── Sidebar (collapsible, mobile-responsive)  
└── Main Content
    └── MyNetwork (primary dashboard)
        ├── NetworkMembersList (expandable cards with client tables)
        ├── AttorneyCarousel sections (browseable attorney discovery)
        └── Modal System (add/edit/configure)
```

### Key Technical Patterns

#### Modal System Architecture
All modals use the `bodyScrollManager` singleton to prevent scroll conflicts:
```jsx
useEffect(() => {
  if (isOpen) {
    bodyScrollManager.lock();
    return () => bodyScrollManager.unlock();
  }
}, [isOpen]);
```

#### Time Management System
Sophisticated dual-unit time slider system:
- **Time per Attorney**: 30 minutes to 96 hours (minutes/hours units)
- **Marketplace Fallback**: 2 hours to 7 days (hours/days units)
- **Smart Synchronization**: Marketplace automatically adjusts to maintain ≥ Time per Attorney

#### Professional Avatar System
AI-generated diverse professional avatars using DiceBear API:
```jsx
import { getProfessionalAvatar } from '../utils/avatarGenerator';
<img src={getProfessionalAvatar(attorney, 80)} alt={attorney.name} />
```

## 🎨 Component Library

### Core Components
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `TimeSlider` | Dual-control time input | Multi-unit support, visual constraints, touch-optimized |
| `AttorneyCarousel` | Horizontal attorney browser | Touch/drag enabled, lazy loading, overlay controls |
| `NetworkMembersList` | Network member management | Expandable cards, client tables, statistics |
| `FiltersModal` | Advanced filtering | Multi-select, visual chips, search integration |
| `Icon` | Dynamic SVG system | 130+ icons, async loading, color inheritance |

### Data Structures
```javascript
// Network Member
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

// Client Record
{
  id: number,
  name: string,
  caseType: string,
  date: string,
  status: 'Signed' | 'Matched' | 'Not Matched' | 'Active'
}
```

## 📱 Mobile Responsiveness

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: ≤ 768px  
- **Mobile**: ≤ 480px

### Mobile-Specific Features
- Hamburger menu navigation
- Full-screen modals
- Touch-optimized carousels with momentum scrolling
- Safe area support for notched devices
- Minimum 44px touch targets

## ⚡ Performance & Optimization

### Loading Strategies
- **Skeleton Loading**: Smooth transitions during data loading
- **Lazy Loading**: Icons and images loaded on demand
- **Debounced Search**: 500ms delay prevents excessive filtering
- **Virtual Scrolling**: Efficient rendering of large attorney lists

### Memory Management
- Proper cleanup of event listeners and timers
- Modal scroll lock cleanup on unmount
- `useCallback` optimization for expensive operations
- Efficient re-rendering with `useMemo`

## 🎯 Development Guidelines

### Code Style Standards
- **No Comments Policy**: Self-documenting, clean code
- **Consistent Naming**: camelCase variables, PascalCase components
- **Component-Scoped CSS**: Each component has its own CSS file
- **Security First**: Never expose secrets, keys, or sensitive data

### Common Patterns
```jsx
// Professional Avatar Usage
<img src={getProfessionalAvatar(attorney, size)} alt={attorney.name} />

// Time Slider Configuration  
<TimeSlider
  value={timeValue}
  unit={timeUnit}
  onValueChange={handleTimeValueChange}
  onUnitChange={handleTimeUnitChange}
  useMinutesHours={true}
  minValue={0.5}
  maxHours={96}
/>

// Filter Integration
const filteredAttorneys = attorneys.filter(attorney => {
  const isInNetwork = networkMembers.some(member => 
    member.name === attorney.name && member.firm === attorney.firm
  );
  return !isInNetwork; // Exclude existing network members
});
```

## 🚢 Deployment

### Automatic Deployment
- **Platform**: Vercel
- **Integration**: GitHub (automatic deployments from `main` branch)
- **Build Command**: `npm run build`
- **Output Directory**: `build/`

### Manual Deployment
```bash
npm run build    # Create production build
# Deploy build/ directory to your hosting platform
```

## 🧪 Testing Strategy

### Test Coverage Areas
- **Component Interactions**: User click flows, form submissions
- **Modal Behavior**: Open/close states, scroll management  
- **Filtering Logic**: Search combinations, multi-select behavior
- **Time Slider Logic**: Unit conversions, constraint validation
- **Responsive Behavior**: Mobile/desktop layout switching

### Running Tests
```bash
npm test                                    # Watch mode
npm test -- --coverage --watchAll=false   # Coverage report
npm test -- ComponentName.test.js         # Specific component
```

## 🔒 Security & Best Practices

### Security Measures
- **Input Sanitization**: All user inputs properly escaped
- **XSS Prevention**: No `dangerouslySetInnerHTML` usage
- **Secret Management**: Environment variables for sensitive data
- **HTTPS Enforcement**: Production deployment uses HTTPS only

### Accessibility Compliance
- **WCAG 2.1 AA**: Comprehensive accessibility support
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Logical focus flow in modals

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-blue: #002e69;
--primary-teal: #059669;
--danger-red: #dc2626;

/* Gray Scale */
--gray-900: #111827;
--gray-700: #374151; 
--gray-500: #6b7280;
--gray-300: #d1d5db;
--gray-100: #f3f4f6;
--gray-50: #f9fafb;
```

### Typography & Spacing
- **Font Family**: 'Inter', sans-serif
- **Font Weights**: 400, 500, 600, 700
- **Border Radius**: 8px standard, 16px modals, 20px cards
- **Transitions**: 0.2s ease for interactions

## 📊 Browser Support

Configured via browserslist for modern browser support:
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions  
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile**: iOS Safari, Android Chrome
- **Not Supported**: Internet Explorer

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with proper testing
3. Run `npm run build` to verify production build
4. Commit with descriptive messages
5. Push to GitHub (triggers automatic Vercel deployment)

### Commit Message Convention
```
feat: add attorney avatar system with professional AI-generated images
fix: resolve modal scroll lock conflicts on mobile devices  
style: optimize mobile responsive layout for attorney carousels
docs: update README with new component architecture details
```

---

## 📞 Support & Resources

### Common Development Issues
- **Port 3000 conflicts**: Application defaults to port 3000
- **Build failures**: Ensure Node.js 18+ is installed
- **Modal scroll issues**: Verify `bodyScrollManager` proper cleanup

### Useful Documentation
- [React 18 Documentation](https://react.dev)
- [Create React App Guide](https://create-react-app.dev)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

**🏗️ Built with React 18, Create React App, and modern web technologies**

*Professional legal referral network management system - Last updated: December 2024*