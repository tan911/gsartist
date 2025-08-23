import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
    Booking,
    Service,
    Review,
    Client,
    Conversation,
    PortfolioItem,
    ProfileData,
    NotificationSettings,
    BookingSettings,
    LocationSettings,
    VerificationData,
} from '@/types'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
const API_TIMEOUT = 30000 // 30 seconds

// Response wrapper for consistent error handling
interface ApiResponse<T> {
    data: T
    success: boolean
    message?: string
    error?: string
}

// User data interface that includes all user-related data
export interface UserData {
    profile: ProfileData
    bookings: Booking[]
    services: Service[]
    reviews: Review[]
    clients: Client[]
    conversations: Conversation[]
    portfolio: PortfolioItem[]
    notifications: NotificationSettings
    bookingSettings: BookingSettings
    locationSettings: LocationSettings
    verification: VerificationData
    stats: {
        totalBookings: number
        totalRevenue: number
        averageRating: number
        activeClients: number
    }
}

class ApiService {
    private api: AxiosInstance
    private cache: Map<string, { data: any; timestamp: number }> = new Map()
    private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            timeout: API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Request interceptor for authentication
        this.api.interceptors.request.use(
            (config) => {
                const token = this.getAuthToken()
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        // Response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                this.handleApiError(error)
                return Promise.reject(error)
            }
        )
    }

    private getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        }
        return null
    }

    private handleApiError(error: any): void {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                url: error.response.config?.url,
            })
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.message)
        } else {
            // Something else happened
            console.error('Request Error:', error.message)
        }
    }

    private getCacheKey(endpoint: string, params?: any): string {
        return `${endpoint}${params ? JSON.stringify(params) : ''}`
    }

    private getCachedData<T>(key: string): T | null {
        const cached = this.cache.get(key)
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data
        }
        return null
    }

    private setCachedData<T>(key: string, data: T): void {
        this.cache.set(key, { data, timestamp: Date.now() })
    }

    private clearCache(): void {
        this.cache.clear()
    }

    // Main method to fetch all user data in one go
    async fetchAllUserData(userId: string, forceRefresh = false): Promise<UserData> {
        const cacheKey = `user_data_${userId}`

        if (!forceRefresh) {
            const cached = this.getCachedData<UserData>(cacheKey)
            if (cached) {
                return cached
            }
        }

        try {
            // Fetch all data in parallel for better performance
            const [
                profileResponse,
                bookingsResponse,
                servicesResponse,
                reviewsResponse,
                clientsResponse,
                conversationsResponse,
                portfolioResponse,
                notificationsResponse,
                bookingSettingsResponse,
                locationSettingsResponse,
                verificationResponse,
                statsResponse,
            ] = await Promise.allSettled([
                this.api.get<ApiResponse<ProfileData>>(`/users/${userId}/profile`),
                this.api.get<ApiResponse<Booking[]>>(`/users/${userId}/bookings`),
                this.api.get<ApiResponse<Service[]>>(`/users/${userId}/services`),
                this.api.get<ApiResponse<Review[]>>(`/users/${userId}/reviews`),
                this.api.get<ApiResponse<Client[]>>(`/users/${userId}/clients`),
                this.api.get<ApiResponse<Conversation[]>>(`/users/${userId}/conversations`),
                this.api.get<ApiResponse<PortfolioItem[]>>(`/users/${userId}/portfolio`),
                this.api.get<ApiResponse<NotificationSettings>>(`/users/${userId}/notifications`),
                this.api.get<ApiResponse<BookingSettings>>(`/users/${userId}/booking-settings`),
                this.api.get<ApiResponse<LocationSettings>>(`/users/${userId}/location-settings`),
                this.api.get<ApiResponse<VerificationData>>(`/users/${userId}/verification`),
                this.api.get<ApiResponse<any>>(`/users/${userId}/stats`),
            ])

            // Process responses and handle partial failures
            const userData: UserData = {
                profile: this.extractData(profileResponse, {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    bio: '',
                    location: '',
                    website: '',
                    instagram: '',
                    facebook: '',
                }),
                bookings: this.extractData(bookingsResponse, []),
                services: this.extractData(servicesResponse, []),
                reviews: this.extractData(reviewsResponse, []),
                clients: this.extractData(clientsResponse, []),
                conversations: this.extractData(conversationsResponse, []),
                portfolio: this.extractData(portfolioResponse, []),
                notifications: this.extractData(notificationsResponse, {
                    newBookings: true,
                    bookingChanges: true,
                    cancellations: true,
                    reviews: true,
                    emailNotifications: true,
                    smsNotifications: false,
                    marketingEmails: false,
                }),
                bookingSettings: this.extractData(bookingSettingsResponse, {
                    confirmationMode: 'manual',
                    bufferTime: 15,
                    leadTime: 2,
                    maxAdvanceBooking: 30,
                    customInstructions: '',
                    requireDeposit: false,
                    depositAmount: 20,
                    cancellationPolicy: '',
                }),
                locationSettings: this.extractData(locationSettingsResponse, {
                    baseLocation: null,
                    travelRadius: 25,
                    manualAcceptanceOutsideRadius: true,
                    preferredServiceAreas: [],
                }),
                verification: this.extractData(verificationResponse, {
                    email: { verified: false, pending: false },
                    phone: { verified: false, pending: false },
                    identity: { verified: false, pending: false },
                }),
                stats: this.extractData(statsResponse, {
                    totalBookings: 0,
                    totalRevenue: 0,
                    averageRating: 0,
                    activeClients: 0,
                }),
            }

            // Cache the successful response
            this.setCachedData(cacheKey, userData)

            return userData
        } catch (error) {
            console.error('Error fetching all user data:', error)
            throw new Error('Failed to fetch user data')
        }
    }

    // Alternative: Single endpoint approach (if your API supports it)
    async fetchUserDataSingleEndpoint(userId: string, forceRefresh = false): Promise<UserData> {
        const cacheKey = `user_data_single_${userId}`

        if (!forceRefresh) {
            const cached = this.getCachedData<UserData>(cacheKey)
            if (cached) {
                return cached
            }
        }

        try {
            const response = await this.api.get<ApiResponse<UserData>>(`/users/${userId}/data`)
            const userData = response.data.data

            this.setCachedData(cacheKey, userData)
            return userData
        } catch (error) {
            console.error('Error fetching user data from single endpoint:', error)
            throw new Error('Failed to fetch user data')
        }
    }

    private extractData<T>(
        promiseResult: PromiseSettledResult<AxiosResponse<ApiResponse<T>>>,
        defaultValue: T
    ): T {
        if (promiseResult.status === 'fulfilled' && promiseResult.value.data.success) {
            return promiseResult.value.data.data
        }

        if (promiseResult.status === 'rejected') {
            console.warn('API call failed:', promiseResult.reason)
        }

        return defaultValue
    }

    // Individual data fetching methods (for selective updates)
    async fetchUserProfile(userId: string): Promise<ProfileData> {
        const response = await this.api.get<ApiResponse<ProfileData>>(`/users/${userId}/profile`)
        return response.data.data
    }

    async fetchUserBookings(userId: string): Promise<Booking[]> {
        const response = await this.api.get<ApiResponse<Booking[]>>(`/users/${userId}/bookings`)
        return response.data.data
    }

    async fetchUserServices(userId: string): Promise<Service[]> {
        const response = await this.api.get<ApiResponse<Service[]>>(`/users/${userId}/services`)
        return response.data.data
    }

    // Authentication methods
    async login(
        email: string,
        password: string
    ): Promise<{
        success: boolean
        token?: string
        user?: any
        message?: string
    }> {
        try {
            const response = await this.api.post<ApiResponse<{ token: string; user: any }>>(
                '/auth/login',
                {
                    email,
                    password,
                }
            )

            if (response.data.success) {
                return {
                    success: true,
                    token: response.data.data.token,
                    user: response.data.data.user,
                }
            } else {
                return {
                    success: false,
                    message: response.data.message || 'Login failed',
                }
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            }
        }
    }

    async logout(): Promise<void> {
        try {
            await this.api.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    async verifyToken(): Promise<any> {
        const response = await this.api.get<ApiResponse<any>>('/auth/verify')
        return response.data.data
    }

    async getCurrentUser(): Promise<any> {
        const response = await this.api.get<ApiResponse<any>>('/auth/me')
        return response.data.data
    }

    // Update methods
    async updateUserProfile(
        userId: string,
        profileData: Partial<ProfileData>
    ): Promise<ProfileData> {
        const response = await this.api.put<ApiResponse<ProfileData>>(
            `/users/${userId}/profile`,
            profileData
        )
        this.clearCache() // Clear cache after update
        return response.data.data
    }

    async updateBookingSettings(
        userId: string,
        settings: Partial<BookingSettings>
    ): Promise<BookingSettings> {
        const response = await this.api.put<ApiResponse<BookingSettings>>(
            `/users/${userId}/booking-settings`,
            settings
        )
        this.clearCache()
        return response.data.data
    }

    // Utility methods
    async refreshUserData(userId: string): Promise<UserData> {
        return this.fetchAllUserData(userId, true)
    }

    getApiInstance(): AxiosInstance {
        return this.api
    }
}

// Export singleton instance
export const apiService = new ApiService()
export default apiService
