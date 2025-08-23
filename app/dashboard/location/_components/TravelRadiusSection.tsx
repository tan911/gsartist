import React from 'react'
import { Radius, Info } from 'lucide-react'
import { RadiusOption } from '@/types'

interface TravelRadiusSectionProps {
    travelRadius: number
    isEditing: boolean
    onRadiusChange: (radius: number) => void
    radiusOptions: RadiusOption[]
}

const TravelRadiusSection: React.FC<TravelRadiusSectionProps> = ({
    travelRadius,
    isEditing,
    onRadiusChange,
    radiusOptions,
}) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Radius className="h-5 w-5 text-purple-600 mr-2" />
            Travel Radius
        </h3>

        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Maximum travel distance from your base location
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {radiusOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => isEditing && onRadiusChange(option.value)}
                            disabled={!isEditing}
                            className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                                travelRadius === option.value
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            } disabled:cursor-not-allowed`}
                            title={option.description}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium">Current Travel Radius: {travelRadius} km</p>
                        <p className="mt-1">
                            Clients within this radius can book instantly. Bookings outside this
                            area require manual approval.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default TravelRadiusSection
