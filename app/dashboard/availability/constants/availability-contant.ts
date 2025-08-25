import type { DayOfWeek } from '@/types'

export const DAYS: DayOfWeek[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]

export const DAY_LABELS: Record<DayOfWeek, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
}

export const INITIAL_WORKING_HOURS = {
    monday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    thursday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    friday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    saturday: { id: 0, isActive: false, startTime: '09:00', endTime: '17:00' },
    sunday: { id: 0, isActive: false, startTime: '09:00', endTime: '17:00' },
}

export const SAVE_SUCCESS_TIMEOUT = 2000
export const SAVE_SIMULATION_DELAY = 1200
