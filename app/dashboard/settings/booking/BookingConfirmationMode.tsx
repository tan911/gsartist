import React from 'react'
import { BookingSettings } from '@/types'

interface BookingConfirmationModeProps {
    confirmationMode: BookingSettings['confirmationMode']
    onChange: (mode: BookingSettings['confirmationMode']) => void
}

const BookingConfirmationMode: React.FC<BookingConfirmationModeProps> = ({
    confirmationMode,
    onChange,
}) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Booking Confirmation Mode</h4>
        <div className="space-y-3">
            <label className="flex items-center">
                <input
                    type="radio"
                    name="confirmationMode"
                    value="instant"
                    checked={confirmationMode === 'instant'}
                    onChange={() => onChange('instant')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                    <strong>Instant Confirmation</strong> - Bookings are automatically confirmed
                </span>
            </label>
            <label className="flex items-center">
                <input
                    type="radio"
                    name="confirmationMode"
                    value="manual"
                    checked={confirmationMode === 'manual'}
                    onChange={() => onChange('manual')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                    <strong>Manual Approval</strong> - You review and approve each booking
                </span>
            </label>
        </div>
    </div>
)

export default BookingConfirmationMode
