'use client'
import { useState, useCallback } from 'react'
import { LocationSettings } from '@/types'
import { defaultLocationSettings } from '@/lib/data/mock-data'

export const useLocationSettings = () => {
    const [locationSettings, setLocationSettings] =
        useState<LocationSettings>(defaultLocationSettings)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const updateLocationSettings = useCallback(
        (updates: Partial<LocationSettings> | ((prev: LocationSettings) => LocationSettings)) => {
            setLocationSettings((prev) => {
                const newState =
                    typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
                return newState
            })
        },
        []
    )

    const handleSave = useCallback(async () => {
        setIsSaving(true)
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setIsEditing(false)
            setShowSuccessMessage(true)
            setTimeout(() => setShowSuccessMessage(false), 3000)
        } catch (error) {
            console.error('Error saving location settings:', error)
        } finally {
            setIsSaving(false)
        }
    }, [])

    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                updateLocationSettings({
                    baseLocation: locationSettings.baseLocation
                        ? {
                              ...locationSettings.baseLocation,
                              coordinates: { lat: latitude, lng: longitude },
                          }
                        : null,
                })
                // In a real app, you'd reverse geocode to get the address
            },
            (error) => {
                console.error('Error getting location:', error)
            }
        )
    }, [locationSettings.baseLocation, updateLocationSettings])

    const resetToDefaults = useCallback(() => {
        setLocationSettings(defaultLocationSettings)
        setIsEditing(false)
    }, [])

    const startEditing = useCallback(() => {
        setIsEditing(true)
    }, [])

    const cancelEditing = useCallback(() => {
        setIsEditing(false)
        // Don't reset to defaults - just stop editing
        // This prevents the marker from snapping back to original position
    }, [])

    return {
        locationSettings,
        isEditing,
        isSaving,
        showSuccessMessage,
        updateLocationSettings,
        handleSave,
        getCurrentLocation,
        startEditing,
        cancelEditing,
        resetToDefaults,
    }
}
