import React from 'react'

export const CalendarLegend: React.FC = () => (
    <div className="flex items-center space-x-4 md:space-x-8 p-2 md:p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
            <div className="w-4 h-4 bg-blue-400 border-2 border-blue-500 rounded-md"></div>
            <span className="font-medium">Done</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-700">
            <div className="w-4 h-4 bg-green-400 border-2 border-green-500 rounded-md"></div>
            <span className="font-medium">Booked</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-700">
            <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-500 rounded-md"></div>
            <span className="font-medium">Pending</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-700">
            <div className="w-4 h-4 bg-red-400 border-2 border-red-500 rounded-md"></div>
            <span className="font-medium">Blocked</span>
        </div>
    </div>
)
