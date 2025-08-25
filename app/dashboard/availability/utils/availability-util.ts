import { INITIAL_WORKING_HOURS } from '../constants/availability-contant'

/**
 * Merges API data with initial working hours structure
 */
type DayOfWeek = keyof typeof INITIAL_WORKING_HOURS

export function mergeWorkingHoursData(apiData: any): typeof INITIAL_WORKING_HOURS {
    const merged = { ...INITIAL_WORKING_HOURS }

    if (Array.isArray(apiData)) {
        // Handle array format from API response
        apiData.forEach((item) => {
            const day = item.day as DayOfWeek
            if (day && merged[day]) {
                merged[day] = {
                    id: item.id || merged[day].id,
                    isActive: item.isActive !== undefined ? item.isActive : merged[day].isActive,
                    startTime: item.startTime || merged[day].startTime,
                    endTime: item.endTime || merged[day].endTime,
                }
            }
        })
    } else if (apiData && typeof apiData === 'object') {
        // Handle object format (key-value pairs)
        Object.entries(apiData).forEach(([day, dayData]: [string, any]) => {
            if (day in merged && dayData) {
                merged[day as DayOfWeek] = {
                    id: dayData.id || merged[day as DayOfWeek].id,
                    isActive: dayData.isActive !== undefined ? dayData.isActive : merged[day as DayOfWeek].isActive,
                    startTime: dayData.startTime || merged[day as DayOfWeek].startTime,
                    endTime: dayData.endTime || merged[day as DayOfWeek].endTime,
                }
            }
        })
    }

    return merged
}

/**
 * Shows success message with auto-hide
 */
export async function showSuccessMessage(
    setSaveSuccess: (value: boolean) => void,
    timeout: number = 2000
): Promise<void> {
    setSaveSuccess(true)
    return new Promise((resolve) => {
        setTimeout(() => {
            setSaveSuccess(false)
            resolve()
        }, timeout)
    })
}

/**
 * Validates blackout date inputs
 */
export function validateBlackoutDate(date: string, reason: string): boolean {
    return Boolean(date && reason && date.trim() && reason.trim())
}

/**
 * Generates unique ID for blackout dates
 */
export function generateBlackoutDateId(): number {
    return Date.now()
}
