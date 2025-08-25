export interface WorkingHours {
    id: number
    isActive: boolean
    startTime: string
    endTime: string
}

export interface WeeklyWorkingHours {
    monday: WorkingHours
    tuesday: WorkingHours
    wednesday: WorkingHours
    thursday: WorkingHours
    friday: WorkingHours
    saturday: WorkingHours
    sunday: WorkingHours
}

export interface BlackoutDate {
    id: number
    date: string
    reason: string
}

export interface AvailabilitySettings {
    leadTime: string
    maxAdvanceBooking: string
    bufferTime: string
}

export type Availability = {
    singleAvailability: {
        id: string
        artistId: string
        date: string
        startTime: string
        endTime: string
        status: 'available' | 'unavailable'
        notes?: string
    }[]
    recurringAvailabilities: {
        id: number
        artistId: string
        dayOfWeek: number
        startTime: string
        endTime: string
        timezone: string
        isActive: boolean
        createdAt: string
        updatedAt: string
    }[]
}

export interface BlackoutDate {
    id: number
    date: string
    reason: string
}
