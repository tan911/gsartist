# Location Components

## Overview

The location functionality has been split into separate, focused components following best practices for readability, maintainability, and scalability. Each component has a single responsibility and can be easily tested and modified independently.

## Component Structure

```
components/location/
├── index.ts                    # Barrel export for all components
├── LocationHeader.tsx          # Header with edit/save controls
├── SuccessMessage.tsx          # Success notification component
├── BaseLocationSection.tsx     # Address and coordinates input
├── TravelRadiusSection.tsx     # Radius selection with visual feedback
├── BookingSettingsSection.tsx  # Manual acceptance toggle
├── ServiceAreasSection.tsx     # Preferred service areas management
└── README.md                   # This documentation
```

## Components

### 1. LocationHeader

**Purpose**: Header section with title, description, and action buttons (Edit/Save/Cancel)

**Props**:

- `isEditing: boolean` - Current editing state
- `isSaving: boolean` - Loading state during save
- `onEdit: () => void` - Edit button handler
- `onCancel: () => void` - Cancel button handler
- `onSave: () => void` - Save button handler

**Features**:

- Responsive design with proper spacing
- Loading state with spinner
- Disabled states for better UX
- Consistent styling with purple theme

### 2. SuccessMessage

**Purpose**: Displays success notifications to users

**Props**:

- `show: boolean` - Controls visibility
- `message?: string` - Custom message (optional, has default)

**Features**:

- Conditional rendering
- Green color scheme for success
- Icon integration
- Customizable message

### 3. BaseLocationSection

**Purpose**: Manages base location input fields and map placeholder

**Props**:

- `locationData: LocationSettings['baseLocation']` - Current location data
- `isEditing: boolean` - Editing state
- `onLocationUpdate: (field, value) => void` - Field update handler
- `onGetCurrentLocation: () => void` - Geolocation handler

**Features**:

- Form validation and sanitization
- Geolocation integration
- Responsive grid layout
- Map placeholder for future integration
- Input field management

### 4. TravelRadiusSection

**Purpose**: Manages travel radius selection with visual feedback

**Props**:

- `travelRadius: number` - Current radius value
- `isEditing: boolean` - Editing state
- `onRadiusChange: (radius) => void` - Radius change handler
- `radiusOptions: RadiusOption[]` - Available radius options

**Features**:

- Grid layout for radius options
- Visual feedback for selected option
- Tooltips with descriptions
- Information panel with current state
- Disabled state handling

### 5. BookingSettingsSection

**Purpose**: Manages booking settings and manual acceptance toggle

**Props**:

- `manualAcceptanceOutsideRadius: boolean` - Current setting
- `isEditing: boolean` - Editing state
- `onToggleManualAcceptance: () => void` - Toggle handler
- `travelRadius: number` - Current radius for context

**Features**:

- Custom toggle component
- Conditional warning message
- Accessibility support with ARIA labels
- Clear visual feedback

### 6. ServiceAreasSection

**Purpose**: Manages preferred service areas with add/remove functionality

**Props**:

- `preferredServiceAreas: string[]` - Current service areas
- `isEditing: boolean` - Editing state
- `onAddServiceArea: (area) => void` - Add handler
- `onRemoveServiceArea: (area) => void` - Remove handler

**Features**:

- Input validation and sanitization
- Keyboard support (Enter key)
- Duplicate prevention
- Tag-based UI with remove buttons
- Empty state handling

## Usage

### Basic Import

```tsx
import {
  LocationHeader,
  SuccessMessage,
  BaseLocationSection,
  TravelRadiusSection,
  BookingSettingsSection,
  ServiceAreasSection,
} from "@/components/location";
```

### Individual Component Usage

```tsx
// Header with actions
<LocationHeader
  isEditing={isEditing}
  isSaving={isSaving}
  onEdit={handleEdit}
  onCancel={handleCancel}
  onSave={handleSave}
/>

// Success notification
<SuccessMessage show={showSuccess} message="Custom message" />

// Base location form
<BaseLocationSection
  locationData={locationData}
  isEditing={isEditing}
  onLocationUpdate={handleLocationUpdate}
  onGetCurrentLocation={getCurrentLocation}
/>
```

## Best Practices Implemented

### 1. Single Responsibility Principle

- Each component has one clear purpose
- Props are focused and specific
- No component handles multiple concerns

### 2. Type Safety

- All props are properly typed with TypeScript
- Interface definitions for all component props
- Proper type imports and exports

### 3. Performance Optimization

- `useCallback` for event handlers
- Memoized functions where appropriate
- Efficient re-rendering patterns

### 4. Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

### 5. Error Handling

- Input validation
- Sanitization for security
- Graceful error states
- User feedback

### 6. Reusability

- Components are self-contained
- Props allow customization
- No hardcoded dependencies
- Consistent API patterns

## Styling

All components use:

- **Tailwind CSS** for styling
- **Purple theme** (`purple-600`, `purple-700`) for primary actions
- **Consistent spacing** with `space-y-6` and `p-6`
- **Responsive design** with mobile-first approach
- **Smooth transitions** with `transition-colors`

## Testing Strategy

Each component can be tested independently:

```tsx
// Example test structure
describe("LocationHeader", () => {
  it("renders edit button when not editing", () => {
    // Test implementation
  });

  it("renders save/cancel buttons when editing", () => {
    // Test implementation
  });

  it("shows loading state when saving", () => {
    // Test implementation
  });
});
```

## Future Enhancements

1. **Map Integration**: Replace placeholder with real map component
2. **Form Validation**: Add comprehensive validation with error messages
3. **Auto-save**: Implement auto-save functionality
4. **Undo/Redo**: Add undo/redo functionality for changes
5. **Bulk Operations**: Support for bulk editing of service areas
6. **Search Integration**: Add search functionality for service areas
7. **Analytics**: Track user interactions for insights

## Contributing

When adding new features or modifying existing components:

1. **Follow the existing patterns** for props and styling
2. **Add proper TypeScript types** for all new props
3. **Include accessibility features** (ARIA labels, keyboard support)
4. **Write unit tests** for new functionality
5. **Update documentation** for any API changes
6. **Use consistent naming** conventions
7. **Add error handling** where appropriate

## Dependencies

- **React**: Core framework
- **Lucide React**: Icons
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **Custom hooks**: `useLocationSettings`
- **Utility functions**: `location-utils`
