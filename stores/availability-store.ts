import { DateTime } from 'luxon'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { availibilityService } from '@/services'
import { Availability, WeeklyWorkingHours } from '@/types/availability-type'
import { getNumberToDays, getDaysToNumber } from '@/lib/utils/date-util'
import { INITIAL_WORKING_HOURS } from '@/app/dashboard/availability/constants/availability-contant'

export interface IAvailabilityState {
    data: Availability['singleAvailability']
    recurringData: WeeklyWorkingHours
}

export interface IAvailabilityActions {
    get: (id: string, params?: { startDate?: string; endDate?: string }) => Promise<any>
    getRecurring: (id: string) => Promise<any>
    updateRecurring: (id: number, data: any) => Promise<any>
    bulkUpdateRecurring: (id: string, data: typeof INITIAL_WORKING_HOURS) => Promise<any>
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
                        
                        console.log(`API returned for ${day}: startTime=${item.startTime}, endTime=${item.endTime}`)
                        
                        // Use times as they are, only convert if they're in ISO format
                        let startTime = item.startTime
                        let endTime = item.endTime
                        
                        if (item.startTime.includes('T')) {
                            startTime = DateTime.fromISO(item.startTime, { zone: 'local' }).toFormat('HH:mm')
                        }
                        if (item.endTime.includes('T')) {
                            endTime = DateTime.fromISO(item.endTime, { zone: 'local' }).toFormat('HH:mm')
                        }

                        console.log(`Final ${day}: startTime=${startTime}, endTime=${endTime}`)

                        formattedResponse[day] = {
                            id: item.id,
                            isActive: item.isActive,
                            startTime: startTime,
                            endTime: endTime,
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
                                isActive: data.isActive,
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
            bulkUpdateRecurring: async (id: string, data: typeof INITIAL_WORKING_HOURS) => {
                try {
                    // Convert the working hours data to the format expected by the API
                    const reqUpdate = Object.entries(data).map(([day, dayData]) => {
                        console.log(`Sending ${day}: startTime=${dayData.startTime}, endTime=${dayData.endTime}`)
                        
                        return {
                            dayOfWeek: getDaysToNumber(day),
                            isActive: dayData.isActive,
                            startTime: dayData.startTime,
                            endTime: dayData.endTime,
                        }
                    })
                    
                    const response = await availibilityService.bulkUpdateRecurring(id, reqUpdate)

                    // Update the store with all the new data
                    set((state) => ({
                        recurringData: {
                            ...state.recurringData,
                            ...data, // Use the original data structure to update the store
                        },
                    }))
                    
                    console.log(response, '============BULK UPDATE RESPONSE')
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
