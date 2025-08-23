'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Circle component to avoid SSR issues
const Circle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false })

export interface RadiusCircleProps {
    center: [number, number] // [lat, lng]
    radius: number // in miles
    isVisible: boolean
}

const RadiusCircle: React.FC<RadiusCircleProps> = ({ center, radius, isVisible }) => {
    if (!isVisible) {
        return null
    }

    // Convert miles to meters for Leaflet Circle
    const radiusInMeters = radius * 1609.34

    return (
        <Circle
            center={center}
            radius={radiusInMeters}
            pathOptions={{
                color: '#9333ea', // Purple color matching the theme
                fillColor: '#9333ea',
                fillOpacity: 0.1,
                weight: 2,
                opacity: 0.6,
            }}
        />
    )
}

export default RadiusCircle
