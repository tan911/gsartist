# Settings Components Architecture

This directory contains a modular, scalable settings system built with React and TypeScript. The architecture follows best practices for maintainability, reusability, and performance.

## 🏗️ Architecture Overview

The settings system is organized into several layers:

```
settings/
├── index.ts                    # Barrel exports
├── SettingsTabs.tsx           # Horizontal tab navigation
├── SectionHeader.tsx           # Reusable section headers
├── FormGroup.tsx              # Form field wrapper
├── ToggleSwitch.tsx           # Toggle component
├── ProfileSection.tsx         # Profile management
├── AccountSecuritySection.tsx # Password & security
├── BookingSettingsSection.tsx # Booking preferences
├── NotificationsSection.tsx   # Notification preferences
├── VerificationSection.tsx    # Account verification
├── DangerZoneSection.tsx      # Destructive actions
└── README.md                  # This file
```

## 🎯 Key Features

### ✅ Best Practices Implemented

- **Type Safety**: Full TypeScript coverage with comprehensive interfaces
- **Custom Hooks**: Centralized state management with `useSettings`
- **Component Composition**: Modular, reusable components
- **Performance**: Optimized with React.memo and useCallback
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Error Handling**: Comprehensive validation and error states
- **Security**: Input sanitization and validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Horizontal Navigation**: Clean tab-based interface at the top

### 🔧 Technical Stack

- **React 18+** with TypeScript
- **Custom Hooks** for state management
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Form validation** with custom utilities

## 📦 Component Breakdown

### Core Components

#### `SettingsTabs`

- **Purpose**: Horizontal tab navigation between settings sections
- **Props**: `sections`, `activeSection`, `onSectionChange`
- **Features**:
  - Responsive horizontal layout
  - Active state highlighting with bottom border
  - Overflow handling for mobile devices
  - Smooth transitions and hover effects

#### `SectionHeader`

- **Purpose**: Consistent section headers across all settings
- **Props**: `title`, `description`, `icon` (optional)
- **Features**: Icon support, consistent styling

#### `FormGroup`

- **Purpose**: Wrapper for form fields with labels and validation
- **Props**: `label`, `children`, `required`, `error`, `helpText`
- **Features**: Error display, help text, required field indicators

#### `ToggleSwitch`

- **Purpose**: Accessible toggle switches for boolean settings
- **Props**: `checked`, `onChange`, `label`, `description`, `disabled`
- **Features**: Keyboard navigation, ARIA labels, smooth animations

### Section Components

#### `ProfileSection`

- **Purpose**: User profile information management
- **Features**:
  - Form validation
  - Input sanitization
  - Real-time updates
  - Social media links

#### `AccountSecuritySection`

- **Purpose**: Password management and security settings
- **Features**:
  - Password strength validation
  - Show/hide password toggles
  - Secure password requirements

#### `BookingSettingsSection`

- **Purpose**: Configure booking behavior and preferences
- **Features**:
  - Confirmation modes (instant/manual)
  - Buffer time settings
  - Lead time configuration
  - Custom instructions

#### `NotificationsSection`

- **Purpose**: Manage notification preferences
- **Features**:
  - Toggle switches for different notification types
  - Grouped settings (booking, communication)
  - Real-time preference updates

#### `VerificationSection`

- **Purpose**: Account verification status and actions
- **Features**:
  - Email, phone, and identity verification
  - Status indicators
  - Verification request actions

#### `DangerZoneSection`

- **Purpose**: Destructive account actions
- **Features**:
  - Confirmation dialogs
  - Clear warning messages
  - Irreversible action protection

## 🎣 Custom Hooks

### `useSettings`

Centralized state management for all settings data:

```typescript
const {
  // State
  activeSection,
  isLoading,
  profileData,
  passwordData,
  notificationSettings,
  bookingSettings,
  verificationStatus,

  // Actions
  updateProfileData,
  updatePasswordData,
  updateNotificationSettings,
  updateBookingSettings,
  handleProfileUpdate,
  handlePasswordUpdate,
  handleVerificationResend,
} = useSettings();
```

## 🛠️ Utility Functions

### `settings-utils.ts`

Comprehensive utility functions for:

- **Validation**: Profile, password, and booking settings validation
- **Sanitization**: Input sanitization for security
- **Formatting**: Phone numbers, URLs, and other data formatting
- **Helpers**: Summary generation, export functionality

## 📊 Data Management

### Types (`types/index.ts`)

Comprehensive TypeScript interfaces for:

- `ProfileData`: User profile information
- `PasswordData`: Password change data
- `NotificationSettings`: Notification preferences
- `BookingSettings`: Booking configuration
- `VerificationData`: Verification status
- `SettingsSection`: Navigation structure

### Mock Data (`lib/data/mock-data.ts`)

Default data and configuration options:

- Default profile data
- Notification settings
- Booking options
- Verification status
- Settings sections configuration

## 🎨 Styling

### Design System

- **Colors**: Purple primary theme with semantic colors
- **Spacing**: Consistent 6-unit spacing system
- **Typography**: Hierarchical text sizing
- **Components**: Reusable UI patterns

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive classes
- **Layout**: Flexible grid system
- **Horizontal Tabs**: Clean top navigation with overflow handling

## 🔒 Security Features

### Input Validation

- Email format validation
- Phone number validation
- URL validation
- Password strength requirements

### Data Sanitization

- HTML tag removal
- XSS prevention
- Input trimming

### Error Handling

- Comprehensive error states
- User-friendly error messages
- Graceful degradation

## 🚀 Performance Optimizations

### React Optimizations

- `useCallback` for event handlers
- `useMemo` for expensive computations
- Component memoization where appropriate

### Bundle Optimization

- Barrel exports for clean imports
- Lazy loading for large sections
- Tree shaking support

## 🧪 Testing Strategy

### Unit Testing

- Component rendering tests
- Hook behavior tests
- Utility function tests

### Integration Testing

- Form submission flows
- State management tests
- User interaction tests

### Accessibility Testing

- Screen reader compatibility
- Keyboard navigation
- ARIA compliance

## 🔄 State Management

### Local State

- Form data
- UI state (loading, errors)
- Navigation state

### Global State (Future)

- User preferences
- Theme settings
- Language preferences

## 📈 Future Enhancements

### Planned Features

- **Real-time sync**: WebSocket integration for live updates
- **Offline support**: Service worker for offline functionality
- **Advanced validation**: Server-side validation integration
- **Analytics**: User behavior tracking
- **A/B testing**: Feature flag integration

### Performance Improvements

- **Virtual scrolling**: For large lists
- **Code splitting**: Dynamic imports for sections
- **Caching**: Intelligent data caching
- **Optimistic updates**: UI updates before server confirmation

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Standardized commit messages

### Component Guidelines

- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: All props are typed
- **Default Props**: Sensible defaults where appropriate
- **Error Boundaries**: Graceful error handling

### Testing Guidelines

- **Coverage**: Minimum 80% test coverage
- **Integration**: End-to-end user flows
- **Accessibility**: Automated a11y testing
- **Performance**: Bundle size monitoring

## 📚 Usage Examples

### Basic Usage

```tsx
import SettingsTab from "@/components/pages/settings-page";

function App() {
  return <SettingsTab />;
}
```

### Custom Styling

```tsx
<SettingsTab className="custom-settings-layout" />
```

### Integration with Router

```tsx
import { Route } from "react-router-dom";
import SettingsTab from "@/components/pages/settings-page";

<Route path="/settings" component={SettingsTab} />;
```

## 🤝 Contributing

### Development Setup

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm dev`
3. Run tests: `pnpm test`
4. Build for production: `pnpm build`

### Code Review Checklist

- [ ] TypeScript types are complete
- [ ] Component is accessible
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered

### Pull Request Process

1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit PR with detailed description
5. Address review feedback
6. Merge after approval

## 📄 License

This project follows the same license as the parent repository.

---

For questions or support, please refer to the main project documentation or create an issue in the repository.
