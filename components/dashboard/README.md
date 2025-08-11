# Dashboard Components

This directory contains reusable dashboard components that provide consistent UI patterns across the application.

## Components

### `DashboardContent`

A wrapper component that handles common dashboard layout patterns including:

- Loading states
- Error handling
- Authentication banners
- Refresh indicators

**Usage:**

```tsx
<DashboardContent
  isLoading={isLoading}
  isError={isError}
  error={error}
  onRetry={refreshData}
  showAuthBanner={true}
  authBannerTitle="Welcome"
  authBannerMessage="This is a demo view.">
  {/* Your dashboard content */}
</DashboardContent>
```

### `DashboardSection`

A reusable section component for dashboard content with:

- Consistent styling
- Optional "View All" button
- Flexible content area

**Usage:**

```tsx
<DashboardSection
  title="Upcoming Bookings"
  onViewAll={() => router.push("/dashboard/bookings")}>
  {/* Section content */}
</DashboardSection>
```

## Structure Recommendations

### App Router Structure (Recommended)

- Use `app/dashboard/page.tsx` for the main dashboard page
- Keep page components focused on data fetching and layout
- Use reusable components from `components/dashboard/` for UI patterns

### Component Organization

- `components/dashboard/` - Reusable dashboard components
- `app/dashboard/_components/` - Page-specific components
- `components/ui/` - Generic UI components

### Data Flow

1. Page components handle data fetching via hooks
2. Pass data down to reusable components
3. Use context for global state management
4. Keep components focused on presentation

## Migration from Old Structure

The old structure had:

- `components/pages/dashboard-page.tsx` - Dashboard content component
- `app/dashboard/page.tsx` - Thin wrapper

The new structure:

- `app/dashboard/page.tsx` - Contains dashboard logic directly
- `components/dashboard/` - Reusable dashboard components
- Removed redundant wrapper component

This provides better separation of concerns and follows Next.js App Router best practices.

## Placeholder Pages

The dashboard layout now includes placeholder pages for features that are under development:

### Messages Tab

- Shows a placeholder when navigating to `/dashboard/messages`
- Informs users that the messaging system is coming soon
- Maintains navigation structure while development continues

### Reviews Tab

- Shows a placeholder when navigating to `/dashboard/reviews`
- Informs users that the reviews management system is coming soon
- Allows for easy replacement when the feature is ready

### Implementation

The placeholder logic is implemented in `app/dashboard/layout.tsx` using the `renderContent()` function that checks the current pathname and conditionally renders either the placeholder or the actual page content.
