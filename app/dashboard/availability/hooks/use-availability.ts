import { useState, useRef } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useAvailabilityStore } from '@/stores/availability-store'
import {
    blackoutDates as mockBlackoutDates,
    availabilitySettings as mockAvailabilitySettings,
} from '@/lib/data/mock-data'
import type { DayOfWeek } from '@/types'
import { INITIAL_WORKING_HOURS, SAVE_SIMULATION_DELAY } from '../constants/availability-contant'
import {
    mergeWorkingHoursData,
    validateBlackoutDate,
    generateBlackoutDateId,
} from '../utils/availability-util'

export interface AvailabilityDataState {
    workingHours: typeof INITIAL_WORKING_HOURS
    blackoutDates: any[]
    availabilitySettings: any
    newBlackoutDate: string
    newBlackoutReason: string
}

export interface AvailabilityDataActions {
    updateWorkingHours: (
        day: DayOfWeek,
        field: 'startTime' | 'endTime' | 'isActive',
        value: string | boolean
    ) => void
    addBlackoutDate: () => void
    removeBlackoutDate: (id: number) => void
    setNewBlackoutDate: (date: string) => void
    setNewBlackoutReason: (reason: string) => void
    setAvailabilitySettings: (settings: any) => void
    loadInitialData: (setLoading: (loading: boolean) => void) => Promise<void>
    saveAllData: () => Promise<void>
}

/**
 * Custom hook for managing availability data and business logic
 * Handles working hours, blackout dates, settings, and API interactions
 */
export function useAvailabilityData() {
    // Data state
    const [workingHours, setWorkingHours] = useState(INITIAL_WORKING_HOURS)
    const [blackoutDates, setBlackoutDates] = useState(mockBlackoutDates)
    const [availabilitySettings, setAvailabilitySettings] = useState(mockAvailabilitySettings)
    const [newBlackoutDate, setNewBlackoutDate] = useState('')
    const [newBlackoutReason, setNewBlackoutReason] = useState('')

    // API and refs
    const { getRecurring, updateRecurring, bulkUpdateRecurring } = useAvailabilityStore()
    const initCalled = useRef(false)
    const user = useAuthStore((state) => state.user)

    const state: AvailabilityDataState = {
        workingHours,
        blackoutDates,
        availabilitySettings,
        newBlackoutDate,
        newBlackoutReason,
    }

    const actions: AvailabilityDataActions = {
        updateWorkingHours: (day, field, value) => {
            setWorkingHours((prev) => ({
                ...prev,
                [day]: { ...prev[day], [field]: value },
            }))
        },

        addBlackoutDate: () => {
            if (validateBlackoutDate(newBlackoutDate, newBlackoutReason)) {
                setBlackoutDates((prev) => [
                    ...prev,
                    {
                        id: generateBlackoutDateId(),
                        date: newBlackoutDate,
                        reason: newBlackoutReason,
                    },
                ])
                setNewBlackoutDate('')
                setNewBlackoutReason('')
            }
        },

        removeBlackoutDate: (id) => {
            setBlackoutDates((prev) => prev.filter((date) => date.id !== id))
        },

        setNewBlackoutDate,
        setNewBlackoutReason,
        setAvailabilitySettings,

        loadInitialData: async (setLoading) => {
            if (initCalled.current) return
            initCalled.current = true

            try {
                setLoading(true)
                // Use authenticated artist's id to fetch their availability
                console.log(user, '============USER')
                const artistId = user?.artistId
                if (!artistId) {
                    console.warn('No authenticated artist found; skipping availability fetch')
                    return
                }

                const data = await getRecurring(artistId)
                console.log(data, '============DATA')

                if (data) {
                    const mergedData = mergeWorkingHoursData(data)
                    setWorkingHours(mergedData)
                }
            } catch (error) {
                console.error('❌ Failed to fetch working hours:', error)
            } finally {
                setLoading(false)
            }
        },

        saveAllData: async () => {
            try {
                const artistId = user?.artistId
                if (!artistId) {
                    throw new Error('No authenticated artist found')
                }

                console.log(workingHours, '============WORKING HOURS')
                
                // Save to backend
                await bulkUpdateRecurring(artistId, workingHours)
                
                // Refresh data from store to ensure consistency
                const updatedData = await getRecurring(artistId)
                if (updatedData) {
                    const mergedData = mergeWorkingHoursData(updatedData)
                    setWorkingHours(mergedData)
                }

                console.log('✅ All data saved successfully')
            } catch (error) {
                console.error('❌ Save failed:', error)
                throw error
            }
        },
    }

    return { state, actions }
}
