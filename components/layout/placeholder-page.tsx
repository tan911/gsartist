import React from 'react'

interface PlaceholderPageProps {
    title: string
    description: string
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}
