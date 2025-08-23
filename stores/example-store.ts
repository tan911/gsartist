import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Example 1: Basic persistence with localStorage
interface BasicStore {
    count: number
    increment: () => void
    decrement: () => void
}

export const useBasicStore = create<BasicStore>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
            decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        {
            name: 'basic-storage',
        }
    )
)

// Example 2: Selective persistence (only persist specific fields)
interface UserPreferencesStore {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
    temporaryData: string // This won't be persisted
    setTheme: (theme: 'light' | 'dark') => void
    setLanguage: (language: string) => void
    setNotifications: (enabled: boolean) => void
    setTemporaryData: (data: string) => void
}

export const useUserPreferencesStore = create<UserPreferencesStore>()(
    persist(
        (set) => ({
            theme: 'light',
            language: 'en',
            notifications: true,
            temporaryData: '',
            setTheme: (theme) => set({ theme }),
            setLanguage: (language) => set({ language }),
            setNotifications: (enabled) => set({ notifications: enabled }),
            setTemporaryData: (data) => set({ temporaryData: data }),
        }),
        {
            name: 'user-preferences',
            partialize: (state) => ({
                // Only persist these fields
                theme: state.theme,
                language: state.language,
                notifications: state.notifications,
                // temporaryData is excluded, so it won't persist
            }),
        }
    )
)

// Example 3: Custom storage (sessionStorage instead of localStorage)
interface SessionStore {
    sessionData: string
    setSessionData: (data: string) => void
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            sessionData: '',
            setSessionData: (data) => set({ sessionData: data }),
        }),
        {
            name: 'session-storage',
            storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
        }
    )
)

// Example 4: Custom serialization/deserialization
interface ComplexStore {
    complexData: { id: number; name: string; timestamp: Date }
    setComplexData: (data: { id: number; name: string; timestamp: Date }) => void
}

export const useComplexStore = create<ComplexStore>()(
    persist(
        (set) => ({
            complexData: { id: 0, name: '', timestamp: new Date() },
            setComplexData: (data) => set({ complexData: data }),
        }),
        {
            name: 'complex-storage',
            serialize: (state) =>
                JSON.stringify(state, (key, value) => {
                    // Custom serialization for Date objects
                    if (value instanceof Date) {
                        return { __type: 'Date', value: value.toISOString() }
                    }
                    return value
                }),
            deserialize: (str) =>
                JSON.parse(str, (key, value) => {
                    // Custom deserialization for Date objects
                    if (value && typeof value === 'object' && value.__type === 'Date') {
                        return new Date(value.value)
                    }
                    return value
                }),
        }
    )
)

// Example 5: Migration support for versioned stores
interface VersionedStore {
    version: number
    data: string
    setData: (data: string) => void
}

export const useVersionedStore = create<VersionedStore>()(
    persist(
        (set) => ({
            version: 2, // Current version
            data: '',
            setData: (data) => set({ data }),
        }),
        {
            name: 'versioned-storage',
            version: 2, // Store version
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    // Migrate from version 0 to 1
                    return {
                        ...persistedState,
                        version: 1,
                        data: persistedState.oldData || '',
                    }
                }
                if (version === 1) {
                    // Migrate from version 1 to 2
                    return {
                        ...persistedState,
                        version: 2,
                        data: persistedState.data || '',
                    }
                }
                return persistedState as VersionedStore
            },
        }
    )
)
