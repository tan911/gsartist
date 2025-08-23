'use client'

import React from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { useLocationMap } from '@/lib/context/LocationMapContext'
import { Heading3 } from '@/components/typography/Heading3'
import { cn } from '@/lib/utils'
import { Paragraph } from '@/components/typography/Paragraph'

const LocationFormHeader: React.FC = () => {
    const { isGeocoding } = useLocationMap()

    return (
        <div className="flex flex-col items-left justify-between">
            <Heading3 className={cn('text-left text-gray-900 mb-2')}>
                <span className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                    Location Information
                </span>
            </Heading3>
            <Paragraph className={cn('text-left text-xs md:text-sm mb-2 md:mb-4')}>
                Enter your city, address, and region details to set your exact map location.
            </Paragraph>
            {isGeocoding && <Loader2 className="animate-spin h-5 w-5 text-purple-600 ml-2" />}
        </div>
    )
}

export default LocationFormHeader
