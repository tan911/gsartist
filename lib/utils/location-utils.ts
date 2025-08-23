import { Coordinates, LocationData, RadiusOption } from '@/types'

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in miles
 */
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    const R = 3958.8 // Earth's radius in miles
    const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
    const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((coord1.lat * Math.PI) / 180) *
            Math.cos((coord2.lat * Math.PI) / 180) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

/**
 * Check if a location is within the specified radius
 * @param baseLocation Base location coordinates
 * @param targetLocation Target location coordinates
 * @param radius Radius in miles
 * @returns True if within radius
 */
export const isWithinRadius = (
    baseLocation: Coordinates,
    targetLocation: Coordinates,
    radius: number
): boolean => {
    const distance = calculateDistance(baseLocation, targetLocation)
    return distance <= radius
}

/**
 * Format coordinates for display
 * @param coordinates Coordinates to format
 * @param precision Number of decimal places (default: 6)
 * @returns Formatted coordinate string
 */
export const formatCoordinates = (coordinates: Coordinates, precision: number = 6): string => {
    return `Lat: ${coordinates.lat.toFixed(precision)}, Lng: ${coordinates.lng.toFixed(precision)}`
}

/**
 * Validate location data
 * @param locationData Location data to validate
 * @returns Validation result with errors array
 */
export const validateLocationData = (
    locationData: Partial<LocationData>
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!locationData.city?.trim()) {
        errors.push('City is required')
    }

    if (!locationData.address?.trim()) {
        errors.push('Street address is required')
    }

    if (!locationData.region?.trim()) {
        errors.push('Region is required')
    }

    if (!locationData.postalCode?.trim()) {
        errors.push('Postal code is required')
    }

    if (locationData.coordinates) {
        if (locationData.coordinates.lat < -90 || locationData.coordinates.lat > 90) {
            errors.push('Invalid latitude value')
        }
        if (locationData.coordinates.lng < -180 || locationData.coordinates.lng > 180) {
            errors.push('Invalid longitude value')
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

/**
 * Get radius option by value
 * @param radiusOptions Array of radius options
 * @param value Radius value to find
 * @returns Radius option or undefined
 */
export const getRadiusOptionByValue = (
    radiusOptions: RadiusOption[],
    value: number
): RadiusOption | undefined => {
    return radiusOptions.find((option) => option.value === value)
}

/**
 * Generate a unique ID for service areas
 * @returns Unique ID string
 */
export const generateServiceAreaId = (): string => {
    return `area_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Sanitize location input
 * @param input Input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeLocationInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '') // Basic sanitization
}

/**
 * Check if geolocation is supported
 * @returns True if geolocation is supported
 */
export const isGeolocationSupported = (): boolean => {
    return 'geolocation' in navigator
}

/**
 * Get current location with error handling
 * @returns Promise that resolves with coordinates or rejects with error
 */
export const getCurrentLocationAsync = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
        if (!isGeolocationSupported()) {
            reject(new Error('Geolocation is not supported by this browser'))
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            (error) => {
                reject(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        )
    })
}
