'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
    ssr: false,
})

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
    ssr: false,
})

const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
    ssr: false,
})

// Dynamically import RadiusCircle component
const RadiusCircle = dynamic(() => import('./RadiusCircle'), { ssr: false })

export interface LocationMapProps {
    coordinates: [number, number] // [lat, lng]
    onMarkerDragEnd?: (coords: [number, number]) => void
    travelRadius?: number // in kilometers
    showRadius?: boolean // whether to show the radius circle
}

const LocationMap: React.FC<LocationMapProps> = ({
    coordinates,
    onMarkerDragEnd,
    travelRadius,
    showRadius = false,
}) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        // Import Leaflet CSS and fix marker icons only on client side
        const loadLeaflet = async () => {
            // Add Leaflet CSS dynamically
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
            document.head.appendChild(link)

            const L = await import('leaflet')

            // Set up default marker icon
            const DefaultIcon = L.default.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
            })
            L.default.Marker.prototype.options.icon = DefaultIcon
        }

        loadLeaflet()
    }, [])

    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                </div>
            </div>
        )
    }

    return (
        <MapContainer
            className="custom-leaflet-z"
            center={coordinates}
            zoom={13}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            scrollWheelZoom={false}
            attributionControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
                position={coordinates}
                draggable={!!onMarkerDragEnd}
                eventHandlers={
                    onMarkerDragEnd
                        ? {
                              dragend: (e: any) => {
                                  const marker = e.target
                                  const { lat, lng } = marker.getLatLng()

                                  // Ensure coordinates are numbers and within valid ranges
                                  const validLat = typeof lat === 'number' ? lat : parseFloat(lat)
                                  const validLng = typeof lng === 'number' ? lng : parseFloat(lng)

                                  // Check if coordinates are valid
                                  if (isNaN(validLat) || isNaN(validLng)) {
                                      return
                                  }

                                  // Clamp coordinates to valid ranges
                                  const clampedLat = Math.max(-90, Math.min(90, validLat))
                                  const clampedLng = Math.max(-180, Math.min(180, validLng))

                                  onMarkerDragEnd([clampedLat, clampedLng])
                              },
                          }
                        : {}
                }
            >
                <Popup>Your base location</Popup>
            </Marker>

            {/* Travel Radius Circle */}
            {travelRadius && (
                <RadiusCircle center={coordinates} radius={travelRadius} isVisible={showRadius} />
            )}
        </MapContainer>
    )
}

export default LocationMap
