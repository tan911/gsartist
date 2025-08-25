'use client'

import React, { useEffect } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/buttonnew'
import { WorkingHoursSection } from './_components/WorkingHoursSection'
import { BookingSettingsSection } from './_components/BookingSettingsSection'
import { BlackoutDatesSection } from './_components/BlackoutDatesSection'
import { cn } from '@/lib/utils'
import { Heading2 } from '@/components/typography/Heading2'

// Local imports
import { useAvailabilityData } from './hooks/use-availability'
import { useAvailabilityUI } from './hooks/use-availability-ui'
import { DAYS, DAY_LABELS, SAVE_SUCCESS_TIMEOUT } from './constants/availability-contant'
import { showSuccessMessage } from './utils/availability-util'

export default function AvailabilityPage() {
    // Custom hooks for separated concerns
    const { state: dataState, actions: dataActions } = useAvailabilityData()
    const { state: uiState, actions: uiActions } = useAvailabilityUI()

    // Main save handler - orchestrates UI and data operations
    const handleSave = async () => {
        uiActions.startSaving()

        try {
            await dataActions.saveAllData()
            await showSuccessMessage(uiActions.setSaveSuccess, SAVE_SUCCESS_TIMEOUT)
            uiActions.finishSaving()
        } catch (error) {
            console.error('❌ Save failed:', error)
            alert('Failed to save changes. Please try again.')
            uiActions.setIsSaving(false)
        }
    }

    // Toggle between edit and save modes
    const handleButtonClick = async () => {
        if (!uiState.isEditing) {
            uiActions.setIsEditing(true)
        } else {
            await handleSave()
        }
    }

    // Load initial data on component mount
    useEffect(() => {
        dataActions.loadInitialData(uiActions.setLoading)
    }, [])

    return (
        <div className="space-y-2 md:space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Heading2 className={cn('text-left text-gray-900')}>Availability Settings</Heading2>
                <Button onClick={handleButtonClick} disabled={uiState.isSaving}>
                    {uiState.isSaving ? (
                        <>
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                        </>
                    ) : uiState.isEditing ? (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </>
                    ) : (
                        'Update Availability'
                    )}
                </Button>
            </div>

            {/* Success Message */}
            {uiState.saveSuccess && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2 text-center">
                    Changes saved successfully!
                </div>
            )}

            {/* Content Sections */}
            <WorkingHoursSection
                days={DAYS}
                dayLabels={DAY_LABELS}
                workingHours={dataState.workingHours}
                onChange={dataActions.updateWorkingHours}
                disabled={!uiState.isEditing}
                isLoading={uiState.loading}
            />

            <BookingSettingsSection
                settings={dataState.availabilitySettings}
                onChange={dataActions.setAvailabilitySettings}
                disabled={!uiState.isEditing}
            />

            <BlackoutDatesSection
                blackoutDates={dataState.blackoutDates}
                newDate={dataState.newBlackoutDate}
                newReason={dataState.newBlackoutReason}
                onDateChange={dataActions.setNewBlackoutDate}
                onReasonChange={dataActions.setNewBlackoutReason}
                onAdd={dataActions.addBlackoutDate}
                onRemove={dataActions.removeBlackoutDate}
                disabled={!uiState.isEditing}
            />
        </div>
    )
}
