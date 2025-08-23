// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
} as const

// Cache Configuration
export const CACHE_CONFIG = {
    USER_DATA_DURATION: 5 * 60 * 1000, // 5 minutes
    REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    MAX_CACHE_SIZE: 100, // Maximum number of cached items
} as const

// Feature Flags
export const FEATURE_FLAGS = {
    ENABLE_CACHE: process.env.NEXT_PUBLIC_ENABLE_CACHE !== 'false',
    ENABLE_AUTO_REFRESH: process.env.NEXT_PUBLIC_ENABLE_AUTO_REFRESH !== 'false',
    ENABLE_OFFLINE_MODE: process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === 'true',
} as const

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    UNAUTHORIZED: 'You are not authorized to access this resource.',
    FORBIDDEN: 'Access forbidden.',
    NOT_FOUND: 'Resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNKNOWN_ERROR: 'An unknown error occurred.',
} as const

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    USER: {
        PROFILE: (userId: string) => `/users/${userId}/profile`,
        BOOKINGS: (userId: string) => `/users/${userId}/bookings`,
        SERVICES: (userId: string) => `/users/${userId}/services`,
        REVIEWS: (userId: string) => `/users/${userId}/reviews`,
        CLIENTS: (userId: string) => `/users/${userId}/clients`,
        CONVERSATIONS: (userId: string) => `/users/${userId}/conversations`,
        PORTFOLIO: (userId: string) => `/users/${userId}/portfolio`,
        NOTIFICATIONS: (userId: string) => `/users/${userId}/notifications`,
        BOOKING_SETTINGS: (userId: string) => `/users/${userId}/booking-settings`,
        LOCATION_SETTINGS: (userId: string) => `/users/${userId}/location-settings`,
        VERIFICATION: (userId: string) => `/users/${userId}/verification`,
        STATS: (userId: string) => `/users/${userId}/stats`,
        ALL_DATA: (userId: string) => `/users/${userId}/data`, // Single endpoint for all data
    },
} as const

// Validation Rules
export const VALIDATION_RULES = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s\-\(\)]+$/,
    PASSWORD_MIN_LENGTH: 8,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
} as const

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_PAGE: 1,
} as const

// Date Formats
export const DATE_FORMATS = {
    DISPLAY: 'MMM dd, yyyy',
    API: 'yyyy-MM-dd',
    DATETIME: 'MMM dd, yyyy HH:mm',
    TIME: 'HH:mm',
} as const
