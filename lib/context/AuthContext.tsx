'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiService } from '@/services/ikd-api-service'

interface User {
    id: string
    name: string
    email: string
    isArtist: boolean
    image?: string | null
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
    clearError: () => void
    error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Check if user is already logged in on app start
    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true)
            const token = getAuthToken()

            if (token) {
                // Verify token and get user data
                const userData = await apiService.verifyToken()
                setUser(userData)
            }
        } catch (err: any) {
            console.error('Auth check failed:', err)
            // Clear invalid token
            clearAuthToken()
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await apiService.login(email, password)

            if (response.success) {
                setAuthToken(response.token)
                setUser(response.user)
                return true
            } else {
                setError(response.message || 'Login failed')
                return false
            }
        } catch (err: any) {
            setError(err.message || 'Login failed')
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        try {
            // Call logout API if needed
            await apiService.logout()
        } catch (error) {
            console.error('Logout API call failed:', error)
        } finally {
            // Clear local state regardless of API call success
            clearAuthToken()
            setUser(null)
            setError(null)
        }
    }

    const refreshUser = async (): Promise<void> => {
        try {
            const userData = await apiService.getCurrentUser()
            setUser(userData)
        } catch (err: any) {
            console.error('Failed to refresh user:', err)
            // If refresh fails, user might be logged out
            await logout()
        }
    }

    const clearError = () => {
        setError(null)
    }

    const getAuthToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
        }
        return null
    }

    const setAuthToken = (token: string): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token)
        }
    }

    const clearAuthToken = (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            sessionStorage.removeItem('auth_token')
        }
    }

    const contextValue: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        clearError,
        error,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
