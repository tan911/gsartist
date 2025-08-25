import { useState } from 'react'

export interface AvailabilityUIState {
    loading: boolean
    isSaving: boolean
    saveSuccess: boolean
    isEditing: boolean
}

export interface AvailabilityUIActions {
    setLoading: (loading: boolean) => void
    setIsSaving: (saving: boolean) => void
    setSaveSuccess: (success: boolean) => void
    setIsEditing: (editing: boolean) => void
    toggleEdit: () => void
    startSaving: () => void
    finishSaving: () => void
    showSuccess: () => void
    hideSuccess: () => void
}

/**
 * Custom hook for managing UI state in availability page
 * Handles loading, saving, success states, and edit mode
 */
export function useAvailabilityUI() {
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const state: AvailabilityUIState = {
        loading,
        isSaving,
        saveSuccess,
        isEditing,
    }

    const actions: AvailabilityUIActions = {
        setLoading,
        setIsSaving,
        setSaveSuccess,
        setIsEditing,

        toggleEdit: () => setIsEditing((prev) => !prev),

        startSaving: () => {
            setIsSaving(true)
            setSaveSuccess(false)
        },

        finishSaving: () => {
            setIsSaving(false)
            setIsEditing(false)
        },

        showSuccess: () => setSaveSuccess(true),
        hideSuccess: () => setSaveSuccess(false),
    }

    return { state, actions }
}
