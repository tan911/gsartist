import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// Simple types
interface ApiConfig {
    baseURL?: string
    timeout?: number
    token?: string
    withCredentials?: boolean
}

interface ApiError {
    message: string
    status: number
    data?: any
}

class ApiService {
    private api: AxiosInstance

    constructor(config: ApiConfig = {}) {
        // Create axios instance
        this.api = axios.create({
            baseURL: config.baseURL || process.env.NEXT_PUBLIC_API_URL,
            timeout: config.timeout || 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: config.withCredentials || true,
        })

        // Setup interceptors (middleware)
        this.setupInterceptors()
    }

    /**
     * INTERCEPTORS - Think of these as "middleware" that run automatically
     */
    private setupInterceptors(): void {
        // REQUEST INTERCEPTOR - Runs BEFORE every API call
        this.api.interceptors.request.use(
            (config) => {
                console.log(`📤 Making ${config.method?.toUpperCase()} request to: ${config.url}`)

                // You can modify the request here:
                // - Add headers
                // - Add authentication tokens
                // - Log requests
                // - Transform data
                // 👀 Debugging: log the outgoing request
                console.log('[Axios Request]', {
                    url: config.url,
                    method: config.method,
                    headers: config.headers,
                })

                return config
            },
            (error) => {
                console.error('❌ Request failed:', error.message)
                return Promise.reject(error)
            }
        )

        // RESPONSE INTERCEPTOR - Runs AFTER every API response
        this.api.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(`📥 Response received from: ${response.config.url}`)

                // You can modify successful responses here:
                // - Log successful responses
                // - Transform response data
                // - Cache responses

                return response
            },
            (error: AxiosError) => {
                console.error(`❌ API Error: ${error.response?.status} - ${error.message}`)

                // Handle errors automatically:
                // - Retry failed requests
                // - Refresh expired tokens
                // - Show error messages
                // - Redirect on auth errors

                if (error.response?.status === 401) {
                    console.log('🔒 Unauthorized - redirecting to login...')
                    // Redirect to login page or refresh token
                }

                return Promise.reject(this.formatError(error))
            }
        )
    }

    /**
     * HTTP METHODS
     */

    // GET request
    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.api.get(url, { params })
        return response.data
    }

    // POST request
    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.api.post(url, data)
        return response.data
    }

    // PUT request
    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.api.put(url, data)
        return response.data
    }

    // DELETE request
    async delete<T>(url: string): Promise<T> {
        const response = await this.api.delete(url)
        return response.data
    }

    /**
     * AUTHENTICATION METHODS
     */

    /**
     * UTILITY METHODS
     */

    // Format errors consistently
    private formatError(error: AxiosError): ApiError {
        return {
            message:
                typeof error.response?.data === 'object' &&
                error.response?.data &&
                'message' in error.response.data
                    ? (error.response.data as { message: string }).message
                    : error.message || 'Something went wrong',
            status: error.response?.status || 0,
            data: error.response?.data,
        }
    }

    // Update base URL
    setBaseURL(url: string): void {
        this.api.defaults.baseURL = url
    }

    // Set timeout
    setTimeout(timeout: number): void {
        this.api.defaults.timeout = timeout
    }
}

// Create and export a default instance
const apiService = new ApiService({
    baseURL: process.env.API_URL || 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
})

export default apiService
export { ApiService }
