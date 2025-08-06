# Data Fetching Best Practices for Next.js TypeScript App

This document outlines the best practices for fetching all user data in one go for your Next.js TypeScript application with a standalone API.

## 🏗️ Architecture Overview

### 1. Centralized API Service Layer

- **File**: `services/api-service.ts`
- **Purpose**: Single point of contact for all API calls
- **Features**:
  - Automatic authentication handling
  - Request/response interceptors
  - Built-in caching
  - Error handling
  - Retry logic

### 2. React Hooks for State Management

- **File**: `lib/hooks/useUserData.ts`
- **Purpose**: React-specific data fetching and state management
- **Features**:
  - Loading states
  - Error handling
  - Auto-refresh capabilities
  - Request cancellation

### 3. Context Provider for Global State

- **File**: `lib/context/UserDataContext.tsx`
- **Purpose**: Global state management across components
- **Features**:
  - Shared data across components
  - Automatic data synchronization
  - Specialized hooks for specific data types

## 🚀 Implementation Strategies

### Strategy 1: Parallel API Calls (Recommended)

```typescript
// Fetch all data in parallel for better performance
const [
  profileResponse,
  bookingsResponse,
  servicesResponse,
  // ... more endpoints
] = await Promise.allSettled([
  api.get("/users/${userId}/profile"),
  api.get("/users/${userId}/bookings"),
  api.get("/users/${userId}/services"),
  // ... more calls
]);
```

**Pros:**

- Fastest loading time
- Independent error handling
- Partial data loading possible

**Cons:**

- Multiple HTTP requests
- More complex error handling

### Strategy 2: Single Endpoint (Alternative)

```typescript
// Single API call for all user data
const response = await api.get(`/users/${userId}/data`);
const userData = response.data;
```

**Pros:**

- Single HTTP request
- Simpler error handling
- Atomic data loading

**Cons:**

- Slower if some data isn't needed
- All-or-nothing loading
- Larger response payload

## 📊 Data Structure

### UserData Interface

```typescript
export interface UserData {
  profile: ProfileData;
  bookings: Booking[];
  services: Service[];
  reviews: Review[];
  clients: Client[];
  conversations: Conversation[];
  portfolio: PortfolioItem[];
  notifications: NotificationSettings;
  bookingSettings: BookingSettings;
  locationSettings: LocationSettings;
  verification: VerificationData;
  stats: {
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    activeClients: number;
  };
}
```

## 🔧 Usage Examples

### Basic Usage in Component

```typescript
import { useUserDataContext } from "@/lib/context/UserDataContext";
import { DataWrapper } from "@/components/ui/data-loading";

const MyComponent = () => {
  const { bookings, isLoading, isError, error, refreshData } =
    useUserDataContext();

  return (
    <DataWrapper
      isLoading={isLoading}
      isError={isError}
      error={error}
      onRetry={refreshData}>
      <div>
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </DataWrapper>
  );
};
```

### Specialized Hooks

```typescript
// Use specific data hooks for better performance
const { bookings, isLoading } = useUserBookings(userId);
const { profile, isLoading } = useUserProfile(userId);
const { stats, isLoading } = useUserStats(userId);
```

### Manual Data Fetching

```typescript
import { apiService } from "@/services/api-service";

const fetchUserData = async (userId: string) => {
  try {
    const userData = await apiService.fetchAllUserData(userId);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## ⚡ Performance Optimizations

### 1. Caching Strategy

```typescript
// 5-minute cache duration
private readonly CACHE_DURATION = 5 * 60 * 1000;

// Cache key generation
private getCacheKey(endpoint: string, params?: any): string {
  return `${endpoint}${params ? JSON.stringify(params) : ''}`;
}
```

### 2. Request Cancellation

```typescript
// Cancel ongoing requests when component unmounts
const abortControllerRef = useRef<AbortController | null>(null);

useEffect(() => {
  return () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
}, []);
```

### 3. Auto-Refresh

```typescript
// Refresh data every 5 minutes
const refreshInterval = 5 * 60 * 1000;

useEffect(() => {
  const interval = setInterval(() => {
    refreshData();
  }, refreshInterval);

  return () => clearInterval(interval);
}, [refreshData, refreshInterval]);
```

## 🛡️ Error Handling

### 1. Graceful Degradation

```typescript
// Handle partial failures
private extractData<T>(promiseResult: PromiseSettledResult<AxiosResponse<ApiResponse<T>>>, defaultValue: T): T {
  if (promiseResult.status === 'fulfilled' && promiseResult.value.data.success) {
    return promiseResult.value.data.data;
  }

  if (promiseResult.status === 'rejected') {
    console.warn('API call failed:', promiseResult.reason);
  }

  return defaultValue;
}
```

### 2. User-Friendly Error Messages

```typescript
const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  // ... more error messages
};
```

## 🔄 State Management

### 1. Loading States

- `isLoading`: Initial data loading
- `isRefreshing`: Background data refresh
- `isError`: Error state
- `error`: Error message

### 2. Data Access

```typescript
// Access specific data types
const { bookings, services, profile } = useUserDataContext();

// Or use specialized hooks
const { bookings } = useUserBookings(userId);
const { services } = useUserServices(userId);
```

## 🧪 Testing Considerations

### 1. Mock API Service

```typescript
// Create mock for testing
export const mockApiService = {
  fetchAllUserData: jest.fn(),
  fetchUserProfile: jest.fn(),
  // ... other methods
};
```

### 2. Test Data

```typescript
// Use consistent test data
export const mockUserData: UserData = {
  profile: mockProfile,
  bookings: mockBookings,
  services: mockServices,
  // ... other data
};
```

## 📱 Mobile & Offline Considerations

### 1. Offline Support

```typescript
// Check network status
const isOnline = navigator.onLine;

// Store data locally for offline access
localStorage.setItem("userData", JSON.stringify(userData));
```

### 2. Progressive Loading

```typescript
// Load critical data first
const criticalData = await Promise.all([fetchProfile(), fetchBookings()]);

// Load non-critical data in background
const backgroundData = Promise.allSettled([fetchReviews(), fetchPortfolio()]);
```

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_ENABLE_CACHE=true
NEXT_PUBLIC_ENABLE_AUTO_REFRESH=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=false
```

### API Configuration

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};
```

## 🚨 Common Pitfalls to Avoid

1. **Not handling partial failures** - Always provide fallbacks
2. **Forgetting request cancellation** - Can cause memory leaks
3. **Over-fetching data** - Only fetch what you need
4. **Not implementing caching** - Can cause unnecessary API calls
5. **Poor error UX** - Always show user-friendly error messages
6. **Not considering offline scenarios** - Plan for network issues

## 📈 Monitoring & Analytics

### 1. Performance Monitoring

```typescript
// Track API call performance
const startTime = performance.now();
const userData = await apiService.fetchAllUserData(userId);
const duration = performance.now() - startTime;

// Log performance metrics
console.log(`User data fetch took ${duration}ms`);
```

### 2. Error Tracking

```typescript
// Track errors for debugging
private handleApiError(error: any): void {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    url: error.response?.config?.url,
    timestamp: new Date().toISOString(),
  });
}
```

## 🎯 Best Practices Summary

1. **Use parallel API calls** for better performance
2. **Implement proper caching** to reduce API calls
3. **Handle errors gracefully** with user-friendly messages
4. **Cancel requests** when components unmount
5. **Use TypeScript** for type safety
6. **Implement loading states** for better UX
7. **Consider offline scenarios** in your design
8. **Monitor performance** and errors
9. **Use specialized hooks** for specific data types
10. **Keep configuration centralized** and environment-aware

This architecture provides a robust, scalable, and maintainable solution for fetching all user data in one go while ensuring excellent user experience and performance.
