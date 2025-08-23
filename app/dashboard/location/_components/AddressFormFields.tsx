'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { LocationSettings, LocationFormData } from '@/types'
import { popularServiceAreas } from '@/lib/data/mock-data'
import { CustomSelect } from '@/components/ui/custom-select'
import { Input } from '@/components/ui/inputLabel'

interface AddressFormFieldsProps {
    locationData: LocationSettings['baseLocation']
    isEditing: boolean
    isGeocoding: boolean
    onLocationUpdate: (field: keyof LocationFormData, value: any) => void
    onGeocodeAddress: () => void
}

const AddressFormFields: React.FC<AddressFormFieldsProps> = ({
    locationData,
    isEditing,
    isGeocoding,
    onLocationUpdate,
    onGeocodeAddress,
}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Convert popularServiceAreas to options format for initial suggestions
    useEffect(() => {
        const options = popularServiceAreas.map((area) => ({
            value: area.name,
            label: area.name,
        }))
        setCityOptions(options)
    }, [])

    // Fetch city suggestions from Nominatim when search query changes
    useEffect(() => {
        const fetchCitySuggestions = async () => {
            if (searchQuery.length < 2) return

            setIsLoading(true)
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery
                )}&addressdetails=1&limit=5`
                const response = await fetch(url)

                if (!response.ok) throw new Error('Failed to fetch city suggestions')

                const data = await response.json()

                // Extract city names from results
                const cities = data.map((item: any) => {
                    const address = item.address || {}
                    const city =
                        address.city ||
                        address.town ||
                        address.village ||
                        item.display_name.split(',')[0]
                    return {
                        value: city,
                        label: city,
                    }
                })

                // Combine with popular service areas and remove duplicates
                const allOptions = [...cities]
                const uniqueOptions = allOptions.filter(
                    (option, index, self) =>
                        index === self.findIndex((o) => o.value === option.value)
                )

                setCityOptions(uniqueOptions)
            } catch (error) {
                console.error('Error fetching city suggestions:', error)
            } finally {
                setIsLoading(false)
            }
        }

        // Debounce the API call
        const timer = setTimeout(() => {
            if (searchQuery.length >= 2) {
                fetchCitySuggestions()
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchQuery])

    // Handle city input change
    const handleCityInputChange = (value: string) => {
        setSearchQuery(value)
        onLocationUpdate('city', value)
        setShowDropdown(value.length > 0)
    }

    // Handle city selection from dropdown
    const handleCitySelect = (value: string) => {
        onLocationUpdate('city', value)
        setSearchQuery(value)
        setShowDropdown(false)

        // Automatically trigger geocoding when a city is selected from dropdown
        if (value) {
            // First, update the city field
            onLocationUpdate('city', value)

            // Then fetch additional address details from Nominatim
            setIsLoading(true)
            fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    value
                )}&addressdetails=1&limit=1`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        const result = data[0]
                        const address = result.address || {}

                        // Extract address components
                        const streetAddress = address.road
                            ? [address.house_number, address.road].filter(Boolean).join(' ')
                            : ''

                        const region = address.state || address.region || address.province || ''
                        const postalCode = address.postcode || ''
                        const country = address.country || ''

                        // Update all form fields
                        onLocationUpdate('address', streetAddress)
                        onLocationUpdate('region', region)
                        onLocationUpdate('postalCode', postalCode)
                        onLocationUpdate('country', country)
                    }
                })
                .catch((error) => console.error('Error fetching address details:', error))
                .finally(() => {
                    setIsLoading(false)
                    // Trigger geocoding to update the map after a small delay
                    setTimeout(() => onGeocodeAddress(), 100)
                })
        }
    }
    return (
        <div className="space-y-2 md:space-y-4">
            {/* City Search - Main search field */}
            <div>
                {/* <label className="block text-sm md:text-base font-medium text-gray-700 mb-0 md:mb-2">
          City
        </label> */}
                <div className="relative">
                    <div className="flex items-end justify-end space-x-1">
                        <div className="w-full relative">
                            <Input
                                type="text"
                                label="City"
                                value={locationData?.city || ''}
                                placeholder="Search by city"
                                onChange={(e) => handleCityInputChange(e.target.value)}
                                helpText=""
                                min="1"
                                // error={errors.name}
                                id="city-name"
                                name="city-name"
                                disabled={!isEditing}
                            />
                            {/* <input
                type="text"
                value={locationData?.city || ""}
                onChange={(e) => handleCityInputChange(e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
                placeholder="Search by city"
              /> */}
                            {showDropdown && searchQuery && isEditing && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {isLoading ? (
                                        <div className="px-4 py-2 text-gray-500 italic">
                                            Loading suggestions...
                                        </div>
                                    ) : cityOptions.length > 0 ? (
                                        cityOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className="px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 transition-colors"
                                                onClick={() => handleCitySelect(option.value)}
                                            >
                                                {option.label}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500 italic">
                                            No cities found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={onGeocodeAddress}
                                className="py-2 md:py-3 px-2 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                                title="Find on Map"
                                disabled={isGeocoding || !locationData?.city}
                            >
                                <Search className="h-5 w-5 text-purple-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Street Address - Sub field */}
            <div>
                <Input
                    type="text"
                    label="Street Address"
                    value={locationData?.address || ''}
                    placeholder="Enter your Studio/Home Address"
                    onChange={(e) => onLocationUpdate('address', e.target.value)}
                    helpText=""
                    min="1"
                    // error={errors.name}
                    id="street-name"
                    name="street-name"
                    disabled={!isEditing}
                />
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          value={locationData?.address || ""}
          onChange={(e) => onLocationUpdate("address", e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
          placeholder="Enter your studio/home address"
        /> */}
            </div>

            {/* Region - Sub field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <Input
                        type="text"
                        label="Region"
                        value={locationData?.region || ''}
                        placeholder="Enter your State/Province"
                        onChange={(e) => onLocationUpdate('region', e.target.value)}
                        helpText=""
                        min="1"
                        // error={errors.name}
                        id="region-name"
                        name="region-name"
                        disabled={!isEditing}
                    />
                    {/* <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <input
            type="text"
            value={locationData?.region || ""}
            onChange={(e) => onLocationUpdate("region", e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
            placeholder="State/Province"
          /> */}
                </div>
                <div>
                    <Input
                        type="text"
                        label="Postal Code"
                        value={locationData?.postalCode || ''}
                        placeholder="Enter your ZIP/Postal Code"
                        onChange={(e) => onLocationUpdate('postalCode', e.target.value)}
                        helpText=""
                        min="1"
                        // error={errors.name}
                        id="postal-name"
                        name="postal-name"
                        disabled={!isEditing}
                    />
                    {/* <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            value={locationData?.postalCode || ""}
            onChange={(e) => onLocationUpdate("postalCode", e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
            placeholder="ZIP/Postal Code"
          /> */}
                </div>
            </div>

            {/* Country field */}
            <div>
                <Input
                    type="text"
                    label="Country"
                    value={locationData?.country || ''}
                    placeholder="Enter your Country"
                    onChange={(e) => onLocationUpdate('country', e.target.value)}
                    helpText=""
                    min="1"
                    // error={errors.name}
                    id="country-name"
                    name="country-name"
                    disabled={!isEditing}
                />
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          type="text"
          value={locationData?.country || ""}
          onChange={(e) => onLocationUpdate("country", e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
          placeholder="Country"
        /> */}
            </div>
        </div>
    )
}

export default AddressFormFields
