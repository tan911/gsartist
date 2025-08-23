'use client'

import React from 'react'
import { MapPin, Maximize, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLocationMap } from '@/lib/context/LocationMapContext'

// Dynamically import map components to avoid SSR issues
const LocationMap = dynamic(() => import('./LocationMap'), { ssr: false })
const LocationMapModal = dynamic(() => import('./LocationMapModal'), {
    ssr: false,
})

interface LocationMapContainerProps {
    localCoordinates: [number, number] | null
    isEditing: boolean
    onMarkerDragEnd: (coordinates: [number, number]) => void
    travelRadius?: number // in miles
}

const LocationMapContainer: React.FC<LocationMapContainerProps> = ({
    localCoordinates,
    isEditing,
    onMarkerDragEnd,
    travelRadius,
}) => {
    // Use the shared context for map state
    const { isGeocoding, isFullMapOpen, setIsFullMapOpen } = useLocationMap()

    const handleFullMapToggle = (isOpen: boolean) => {
        setIsFullMapOpen(isOpen)
    }

    return (
        <div>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-[300px] relative mb-1">
                {/* Enlarge button overlayed on the map */}
                {localCoordinates && (
                    <button
                        type="button"
                        onClick={() => handleFullMapToggle(true)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-purple-100 transition-colors z-20"
                        title="Full View"
                    >
                        <Maximize className="h-5 w-5 text-purple-600" />
                    </button>
                )}

                {/* Loading overlay when geocoding */}
                {isGeocoding && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Loader2 className="animate-spin h-5 w-5 text-purple-600" />
                            <span className="text-sm text-gray-600">Updating address...</span>
                        </div>
                    </div>
                )}

                {!isFullMapOpen &&
                    (localCoordinates ? (
                        <LocationMap
                            coordinates={localCoordinates}
                            onMarkerDragEnd={isEditing ? onMarkerDragEnd : undefined}
                            travelRadius={travelRadius}
                            showRadius={!isEditing} // Only show radius when not editing
                        />
                    ) : (
                        <div className="text-center">
                            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 font-medium">Interactive Map</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Map visualization will show your base location and travel radius
                            </p>
                        </div>
                    ))}

                {isFullMapOpen && localCoordinates && (
                    <LocationMapModal
                        coordinates={{
                            lat: localCoordinates[0],
                            lng: localCoordinates[1],
                        }}
                        isOpen={isFullMapOpen}
                        onClose={() => handleFullMapToggle(false)}
                        onMarkerDragEnd={isEditing ? onMarkerDragEnd : undefined}
                        isGeocoding={isGeocoding}
                        travelRadius={travelRadius}
                        showRadius={!isEditing} // Only show radius when not editing
                    />
                )}
            </div>

            {/* OSM Attribution always visible, right-aligned below map */}
            <div className="flex justify-end">
                <div className="text-[10px] text-gray-300 select-none pointer-events-auto z-10">
                    Map data &copy;{' '}
                    <a
                        href="https://www.openstreetmap.org/copyright"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        OpenStreetMap
                    </a>{' '}
                    contributors
                </div>
            </div>
        </div>
    )
}

export default LocationMapContainer
