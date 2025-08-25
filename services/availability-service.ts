import { ApiService } from './api-service'

export class AvailabilityService {
    constructor(
        private ctx: {
            api: ApiService
        }
    ) {}

    async get(id: string, params: { startDate?: string; endDate?: string } = {}) {
        try {
            return await this.ctx.api.get(`/availabilities/${id}`)
        } catch (error) {
            console.error('Error fetching availability:', error)
            throw error
        }
    }
    async getRecurring(id: string) {
        try {
            return await this.ctx.api.get(`/availabilities/recurring/${id}`)
        } catch (error) {
            console.error('Error fetching availability:', error)
            throw error
        }
    }
    async updateRecurring(
        id: number,
        data: {
            // dayOfWeek?: number
            isActive?: boolean
            startTime?: string
            endTime?: string
        }
    ) {
        try {
            console.log('Updating recurring availability:', id, data)
            return await this.ctx.api.put(`/availabilities/recurring/${id}`, data)
        } catch (error) {
            console.error('Error fetching availability:', error)
            throw error
        }
    }

    async bulkUpdateRecurring(id: string, data: {
        dayOfWeek: number
        isActive: boolean
        startTime: string
        endTime: string
    }[]) {
        try {
            console.log('Updating recurring availability:', id, data, '============BULK UPDATE REQUEST SERVICE')
            return await this.ctx.api.put(`/availabilities/recurring/bulk/${id}`, data)
        } catch (error) {
            console.error('Error updating recurring availability:', error)
            throw error
        }
    }
}
