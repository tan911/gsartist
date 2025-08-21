# Zustand Persistence Guide

This guide explains how to retain data when the page is refreshed using Zustand's persistence middleware.

## Overview

Zustand provides a `persist` middleware that automatically saves your store state to storage (localStorage, sessionStorage, etc.) and restores it when the page is refreshed.

## Basic Implementation

### 1. Install Dependencies

```bash
pnpm add zustand
```

### 2. Basic Persistence Setup

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "my-store", // unique name for localStorage key
    }
  )
);
```

## Advanced Persistence Options

### 1. Selective Persistence

Only persist specific fields from your store:

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false, // This won't be persisted
      temporaryData: "", // This won't be persisted
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        session: state.session,
      }),
    }
  )
);
```

### 2. Custom Storage

Use different storage mechanisms:

```typescript
// Use sessionStorage (data persists only for the session)
storage: createJSONStorage(() => sessionStorage);

// Use localStorage (data persists across browser sessions)
storage: createJSONStorage(() => localStorage);

// Custom storage implementation
storage: createJSONStorage(() => ({
  getItem: (name) => {
    // Custom get implementation
    return Promise.resolve(localStorage.getItem(name));
  },
  setItem: (name, value) => {
    // Custom set implementation
    return Promise.resolve(localStorage.setItem(name, value));
  },
  removeItem: (name) => {
    // Custom remove implementation
    return Promise.resolve(localStorage.removeItem(name));
  },
}));
```

### 3. Custom Serialization

Handle complex data types like Dates:

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      complexData: { timestamp: new Date() },
    }),
    {
      name: "complex-storage",
      serialize: (state) =>
        JSON.stringify(state, (key, value) => {
          if (value instanceof Date) {
            return { __type: "Date", value: value.toISOString() };
          }
          return value;
        }),
      deserialize: (str) =>
        JSON.parse(str, (key, value) => {
          if (value && typeof value === "object" && value.__type === "Date") {
            return new Date(value.value);
          }
          return value;
        }),
    }
  )
);
```

### 4. Version Migration

Handle store schema changes:

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      version: 2,
      data: "",
    }),
    {
      name: "versioned-storage",
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate from version 0 to 1
          return {
            ...persistedState,
            version: 1,
            data: persistedState.oldData || "",
          };
        }
        if (version === 1) {
          // Migrate from version 1 to 2
          return {
            ...persistedState,
            version: 2,
            data: persistedState.data || "",
          };
        }
        return persistedState;
      },
    }
  )
);
```

## Real-World Examples

### Authentication Store (Updated)

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Session } from "better-auth";
import { authClient } from "@/lib/auth";

export interface IAuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export interface IAuthActions {
  signin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signout: () => void;
  checkAuth: () => void;
}

export type AuthStore = IAuthState & IAuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: false,

      signin: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const result = await authClient.signIn.email({ email, password });
          if (result.data) {
            set({
              user: result.data.user,
              session: result.data.session,
              isLoading: false,
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error?.message };
          }
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: "An unexpected error occurred" };
        }
      },

      signout: async () => {
        set({ isLoading: true });
        try {
          await authClient.signOut();
          set({ user: null, session: null, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        try {
          const session = await authClient.getSession();
          if (session.data) {
            set({
              user: session.data.user,
              session: session.data.session,
            });
          } else {
            set({ user: null, session: null });
          }
        } catch (err) {
          set({ user: null, session: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist user and session data
        user: state.user,
        session: state.session,
        // isLoading is excluded as it shouldn't persist
      }),
    }
  )
);
```

### User Preferences Store

```typescript
interface UserPreferences {
  theme: "light" | "dark";
  language: string;
  notifications: boolean;
  sidebarCollapsed: boolean;
}

interface UserPreferencesActions {
  setTheme: (theme: "light" | "dark") => void;
  setLanguage: (language: string) => void;
  setNotifications: (enabled: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUserPreferences = create<
  UserPreferences & UserPreferencesActions
>()(
  persist(
    (set) => ({
      theme: "light",
      language: "en",
      notifications: true,
      sidebarCollapsed: false,

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setNotifications: (enabled) => set({ notifications: enabled }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: "user-preferences",
    }
  )
);
```

## Best Practices

### 1. Don't Persist Everything

```typescript
// ❌ Bad: Persisting everything including temporary state
export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false, // This shouldn't persist
      error: null, // This shouldn't persist
      temporaryData: "", // This shouldn't persist
    }),
    {
      name: "store",
    }
  )
);

// ✅ Good: Only persist essential data
export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      temporaryData: "",
    }),
    {
      name: "store",
      partialize: (state) => ({
        user: state.user, // Only persist user data
      }),
    }
  )
);
```

### 2. Handle Loading States

```typescript
// Use a separate flag to track hydration
export const useStore = create<Store>()(
  persist(
    (set) => ({
      data: null,
      isHydrated: false,
    }),
    {
      name: "store",
      onRehydrateStorage: () => (state) => {
        // Called when store is rehydrated
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
```

### 3. Error Handling

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      data: null,
    }),
    {
      name: "store",
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate store:", error);
          // Handle error appropriately
        }
      },
    }
  )
);
```

## Common Issues and Solutions

### 1. Hydration Mismatch

If you're using Next.js and experiencing hydration issues:

```typescript
// Use a client-side only store
export const useStore = create<Store>()(
  persist(
    (set) => ({
      data: null,
    }),
    {
      name: "store",
      skipHydration: true, // Skip automatic hydration
    }
  )
);

// Manually hydrate in useEffect
useEffect(() => {
  useStore.persist.rehydrate();
}, []);
```

### 2. Large Data Sets

For large data sets, consider compression or selective persistence:

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      largeDataSet: [],
    }),
    {
      name: "store",
      partialize: (state) => ({
        // Only persist essential fields from large data
        largeDataSet: state.largeDataSet.map((item) => ({
          id: item.id,
          name: item.name,
          // Skip other fields to reduce storage size
        })),
      }),
    }
  )
);
```

### 3. Security Considerations

Don't persist sensitive data:

```typescript
export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null, // Don't persist sensitive tokens
      refreshToken: null, // Don't persist sensitive tokens
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        // Exclude tokens from persistence
      }),
    }
  )
);
```

## Testing Persistence

```typescript
// Test that data persists
const store = useStore.getState();
store.setData("test data");

// Simulate page refresh
localStorage.setItem("store", JSON.stringify({ data: "test data" }));

// Verify data is restored
const restoredStore = useStore.getState();
console.log(restoredStore.data); // Should be "test data"
```

## Summary

Zustand's persist middleware provides a powerful and flexible way to retain data across page refreshes. Key points:

1. **Use `persist` middleware** for automatic storage
2. **Selective persistence** with `partialize` to only save essential data
3. **Custom storage** for different persistence needs
4. **Version migration** for handling schema changes
5. **Error handling** for robust applications
6. **Security considerations** for sensitive data

The updated auth store in your project now includes persistence, so user authentication state will be retained when the page is refreshed.
