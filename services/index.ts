import { AvailabilityService } from './availability-service'
import { ApiService } from './api-service'

const apiService = new ApiService({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    withCredentials: true,
})

const availibilityService = new AvailabilityService({ api: apiService })

export { apiService, availibilityService }
