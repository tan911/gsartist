import type { LocationFormData } from '@/types'

export interface GeocodeResult {
    lat: number
    lng: number
}

export interface ReverseGeocodeResult {
    address: string
    city: string
    region: string
    postalCode: string
    country: string
}

// Geocode city to coordinates using Nominatim
export async function geocodeAddress(city: string): Promise<GeocodeResult> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to geocode city')
    const data = await res.json()
    if (!data[0]) throw new Error('No results found for this city')
    return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
    }
}

// Reverse geocode coordinates to address using Nominatim
export async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
    // Validate coordinates
    if (
        typeof lat !== 'number' ||
        typeof lng !== 'number' ||
        isNaN(lat) ||
        isNaN(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
    ) {
        // Try to fix common issues
        let fixedLat = lat
        let fixedLng = lng
        let fixed = false

        // Convert strings to numbers if needed
        if (typeof lat === 'string') {
            fixedLat = parseFloat(lat)
            fixed = true
        }
        if (typeof lng === 'string') {
            fixedLng = parseFloat(lng)
            fixed = true
        }

        // Check if fixed coordinates are valid
        if (
            fixed &&
            !isNaN(fixedLat) &&
            !isNaN(fixedLng) &&
            fixedLat >= -90 &&
            fixedLat <= 90 &&
            fixedLng >= -180 &&
            fixedLng <= 180
        ) {
            lat = fixedLat
            lng = fixedLng
        } else {
            throw new Error(`Invalid coordinates provided: lat=${lat}, lng=${lng}`)
        }
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid response from Nominatim')
        }

        const address = data.address || {}

        // Build a comprehensive street address from available components
        // Based on the console log structure, prioritize the most relevant fields
        const streetComponents = [
            address.house_number,
            address.road,
            address.quarter, // This appears in your console log
            address.village,
            address.residential,
            address.suburb,
            address.neighbourhood,
            address.amenity, // e.g., school, hospital, etc.
            address.name, // e.g., building name
        ].filter(Boolean)

        // If we have specific road information, use it as the primary address
        let streetAddress = ''
        if (address.road) {
            streetAddress = [address.house_number, address.road].filter(Boolean).join(' ')
        } else if (streetComponents.length > 0) {
            streetAddress = streetComponents.join(', ')
        } else {
            // Fallback to display_name if no specific address components
            streetAddress = data.display_name?.split(',')[0] || ''
        }

        // Get city with fallback hierarchy - based on your console log, 'city' field is available
        const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            ''

        // Get region/state with fallback hierarchy - your console log shows 'region' field
        const region = address.state || address.region || address.province || ''

        // Get postal code - your console log shows 'postcode' field
        const postalCode = address.postcode || ''

        // Get country
        const country = address.country || ''

        return {
            address: streetAddress,
            city,
            region,
            postalCode,
            country,
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error)
        throw new Error(
            `Failed to reverse geocode: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
    }
}
