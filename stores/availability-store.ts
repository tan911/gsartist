import { DateTime } from 'luxon'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { availibilityService } from '@/services'
import { Availability, WeeklyWorkingHours } from '@/types/availability-type'
import { getNumberToDays } from '@/lib/utils/date-util'

export interface IAvailabilityState {
    data: Availability['singleAvailability']
    recurringData: WeeklyWorkingHours
}

export interface IAvailabilityActions {
    get: (id: string, params?: { startDate?: string; endDate?: string }) => Promise<any>
    getRecurring: (id: string) => Promise<any>
    updateRecurring: (id: number, data: any) => Promise<any>
    create: (availability: {
        date: Date
        startTime: string
        endTime: string
        status: 'available' | 'unavailable'
        notes: string
    }) => Promise<any>
}

export type AvailabilityStore = IAvailabilityState & IAvailabilityActions

export const useAvailabilityStore = create<AvailabilityStore>()(
    persist(
        (set, get) => ({
            // initial state
            data: [] as Availability['singleAvailability'],
            recurringData: [] as unknown as WeeklyWorkingHours,

            // actions
            get: async (id: string, params?: { startDate?: string; endDate?: string }) => {
                try {
                    const response = await availibilityService.get(id, params || {})

                    set({ data: response as Availability['singleAvailability'] })
                    return response
                } catch (error) {
                    console.error('Error fetching availability:', error)
                    throw error
                }
            },
            getRecurring: async (id: string) => {
                try {
                    const response = (await availibilityService.getRecurring(id)) as {
                        data: Availability['recurringAvailabilities']
                    }

                    const formattedResponse: {
                        [key: string]: {
                            id: number
                            isActive: boolean
                            startTime: string
                            endTime: string
                        }
                    } = {}

                    response.data.map((item) => {
                        const day = getNumberToDays(item.dayOfWeek)
                        const startDate = DateTime.fromISO(item.startTime)
                        const endDate = DateTime.fromISO(item.endTime)

                        formattedResponse[day] = {
                            id: item.id,
                            isActive: item.isActive,
                            startTime: startDate.toLocaleString(DateTime.TIME_24_SIMPLE),
                            endTime: endDate.toLocaleString(DateTime.TIME_24_SIMPLE),
                        }
                    })

                    set({
                        recurringData: formattedResponse as unknown as WeeklyWorkingHours,
                    })
                    return formattedResponse
                } catch (error) {
                    console.error('Error fetching recurring availability:', error)
                    throw error
                }
            },
            updateRecurring: async (id: number, data: any) => {
                try {
                    const response = await availibilityService.updateRecurring(id, data)

                    // Update the store with the new data
                    set((state) => ({
                        recurringData: {
                            ...state.recurringData,
                            [getNumberToDays(data.dayOfWeek)]: {
                                enabled: data.isActive,
                                startTime: data.startTime,
                                endTime: data.endTime,
                            },
                        },
                    }))

                    return response
                } catch (error) {
                    console.error('Error updating recurring availability:', error)
                    throw error
                }
            },
            create: async (availability) => {
                // Implement the logic to create a new availability entry via the API
                // For example:
                // const response = await fetch('/api/availabilities', {
                //     method: 'POST',
                //     body: JSON.stringify(availability),
                // });
                // const newEntry = await response.json();
                // set((state) => ({ data: [...state.data, newEntry] }));
                // return newEntry;

                // Placeholder implementation
                return null
            },
        }),
        {
            name: 'availability-storage', // unique name
            storage: createJSONStorage(() => localStorage), // use localStorage
        }
    )
)
