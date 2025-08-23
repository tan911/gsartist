'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { Save, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/buttonnew'
import { Input } from '@/components/ui/inputLabel'
import { Card } from '@/components/ui/card'
import {
    blackoutDates as mockBlackoutDates,
    workingHours as mockWorkingHours,
    availabilitySettings as mockAvailabilitySettings,
} from '@/lib/data/mock-data'
import type { WeeklyWorkingHours, BlackoutDate, AvailabilitySettings, DayOfWeek } from '@/types'
import { WorkingHoursSection } from './_components/WorkingHoursSection'
import { BookingSettingsSection } from './_components/BookingSettingsSection'
import { BlackoutDatesSection } from './_components/BlackoutDatesSection'
import { cn } from '@/lib/utils'
import { Heading2 } from '@/components/typography/Heading2'
import { useAvailabilityStore } from '@/stores/availability-store'

const days: DayOfWeek[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]

const dayLabels: Record<DayOfWeek, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
}

const INITIAL_WORKING_HOURS = {
    monday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    thursday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    friday: { id: 0, isActive: true, startTime: '09:00', endTime: '17:00' },
    saturday: { id: 0, isActive: false, startTime: '09:00', endTime: '17:00' },
    sunday: { id: 0, isActive: false, startTime: '09:00', endTime: '17:00' },
}

export default function AvailabilityPage() {
    const [workingHours, setWorkingHours] = useState(INITIAL_WORKING_HOURS)
    const { get, updateRecurring, getRecurring } = useAvailabilityStore()
    const [loading, setLoading] = useState(true)

    /// TODO:
    const [blackoutDates, setBlackoutDates] = useState(mockBlackoutDates)
    const [availabilitySettings, setAvailabilitySettings] = useState(mockAvailabilitySettings)
    const [newBlackoutDate, setNewBlackoutDate] = useState('')
    const [newBlackoutReason, setNewBlackoutReason] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const addBlackoutDate = () => {
        if (newBlackoutDate && newBlackoutReason) {
            setBlackoutDates((prev) => [
                ...prev,
                { id: Date.now(), date: newBlackoutDate, reason: newBlackoutReason },
            ])
            setNewBlackoutDate('')
            setNewBlackoutReason('')
        }
    }

    const removeBlackoutDate = (id: number) => {
        setBlackoutDates((prev) => prev.filter((date) => date.id !== id))
    }

    const handleSave = async () => {
        setIsSaving(true)
        setSaveSuccess(false)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setIsSaving(false)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 2000)
        // Here you would send workingHours, blackoutDates, and availabilitySettings to your backend
    }

    const handleButtonClick = async () => {
        if (!isEditing) {
            setIsEditing(true)
        } else {
            setIsSaving(true)
            setSaveSuccess(false)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200))
            setIsSaving(false)
            setSaveSuccess(true)
            setIsEditing(false)
            setTimeout(() => setSaveSuccess(false), 2000)
            // Here you would send workingHours, blackoutDates, and availabilitySettings to your backend
        }
    }

    // const handleSave = async () => {
    //     // Update backend
    //     try {
    //         const dayData = workingHours[day]
    //         await updateRecurring(dayData.id, { [field]: value })
    //         console.log('✅ Updated successfully')
    //     } catch (error) {
    //         console.error('❌ Update failed:', error)
    //         alert('Failed to update. Please try again.')
    //     }
    // }

    const handleWorkingHoursChange = async (
        day: DayOfWeek,
        field: 'startTime' | 'endTime' | 'isActive',
        value: string | boolean
    ) => {
        console.log('Updating:', day, field, value)

        // Update UI immediately
        setWorkingHours((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }))

        // Update backend
        try {
            const dayData = workingHours[day]
            await updateRecurring(dayData.id, { [field]: value })
            console.log('✅ Updated successfully')
        } catch (error) {
            console.error('❌ Update failed:', error)
            alert('Failed to update. Please try again.')
        }
    }

    useEffect(() => {
        let isMounted = true

        async function init() {
            try {
                setLoading(true)
                const data = await getRecurring('cmee60fnz0001uyh48pclqnl7')

                if (isMounted && data) {
                    const merged = { ...INITIAL_WORKING_HOURS }

                    // Handle array or object response
                    if (Array.isArray(data)) {
                        data.forEach((item) => {
                            if (merged[item.day]) {
                                merged[item.day] = item
                            }
                        })
                    } else {
                        Object.assign(merged, data)
                    }
                    setWorkingHours(merged)
                }
            } catch (error) {
                console.error('Failed to fetch working hours:', error)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        init()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between">
                <Heading2 className={cn('text-left text-gray-900')}>Availability Settings</Heading2>
                <Button onClick={handleButtonClick} disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                        </>
                    ) : isEditing ? (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </>
                    ) : (
                        <>Update Availability</>
                    )}
                </Button>
            </div>
            {saveSuccess && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2 text-center">
                    Changes saved successfully!
                </div>
            )}

            <WorkingHoursSection
                days={days}
                dayLabels={dayLabels}
                workingHours={workingHours}
                onChange={handleWorkingHoursChange}
                disabled={!isEditing}
                isLoading={loading}
            />

            <BookingSettingsSection
                settings={availabilitySettings}
                onChange={setAvailabilitySettings}
                disabled={!isEditing}
            />

            <BlackoutDatesSection
                blackoutDates={blackoutDates}
                newDate={newBlackoutDate}
                newReason={newBlackoutReason}
                onDateChange={setNewBlackoutDate}
                onReasonChange={setNewBlackoutReason}
                onAdd={addBlackoutDate}
                onRemove={removeBlackoutDate}
                disabled={!isEditing}
            />
        </div>
    )
}
