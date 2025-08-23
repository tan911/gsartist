import React from 'react'
import { Save } from 'lucide-react'

const SaveBookingSettingsButton: React.FC = () => (
    <button
        type="button"
        className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
    >
        <Save className="h-4 w-4 mr-2" />
        Save Booking Settings
    </button>
)

export default SaveBookingSettingsButton
