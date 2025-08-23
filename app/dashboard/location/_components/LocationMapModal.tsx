'use client'

import React from 'react'
import { X, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import LocationMap to avoid SSR issues
const LocationMap = dynamic(() => import('./LocationMap'), { ssr: false })

interface LocationMapModalProps {
    coordinates: { lat: number; lng: number } | undefined
    isOpen: boolean
    onClose: () => void
    onMarkerDragEnd?: (coords: [number, number]) => void
    isGeocoding?: boolean
    travelRadius?: number // in kilometers
    showRadius?: boolean // whether to show the radius circle
}

const LocationMapModal: React.FC<LocationMapModalProps> = ({
    coordinates,
    isOpen,
    onClose,
    onMarkerDragEnd,
    isGeocoding = false,
    travelRadius,
    showRadius = false,
}) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in">
            <div className="relative w-full h-full flex items-center justify-center">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-0 right-0 p-2 bg-white rounded-full shadow hover:bg-purple-100 transition-colors z-50"
                    title="Close Full View"
                >
                    <X className="h-6 w-6 text-purple-600" />
                </button>
                <div className="w-[90vw] h-[90vh] bg-white rounded-lg shadow-2xl flex items-center justify-center border border-gray-200 relative">
                    {coordinates && (
                        <LocationMap
                            coordinates={[coordinates.lat, coordinates.lng]}
                            onMarkerDragEnd={onMarkerDragEnd}
                            travelRadius={travelRadius}
                            showRadius={showRadius}
                        />
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

                    {/* OSM Attribution in modal */}
                    <div className="absolute bottom-2 right-4 text-[10px] text-gray-300 select-none pointer-events-auto z-10">
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
        </div>
    )
}

export default LocationMapModal
