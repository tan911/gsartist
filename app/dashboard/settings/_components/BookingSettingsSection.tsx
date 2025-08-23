import React from 'react'
import { Calendar } from 'lucide-react'
import { BookingSettings } from '@/types'
import SectionHeader from './SectionHeader'
import BookingConfirmationMode from '../booking/BookingConfirmationMode'
import BufferTimeSelect from '../booking/BufferTimeSelect'
import LeadTimeSelect from '../booking/LeadTimeSelect'
import MaxAdvanceBookingSelect from '../booking/MaxAdvanceBookingSelect'
import CustomInstructionsField from '../booking/CustomInstructionsField'
import CancellationPolicyField from '../booking/CancellationPolicyField'
import SaveBookingSettingsButton from '../booking/SaveBookingSettingsButton'

interface BookingSettingsSectionProps {
    bookingSettings: BookingSettings
    onBookingSettingsUpdate: (updates: Partial<BookingSettings>) => void
}

const BookingSettingsSection: React.FC<BookingSettingsSectionProps> = ({
    bookingSettings,
    onBookingSettingsUpdate,
}) => (
    <div className="space-y-2 md:space-y-4">
        <SectionHeader
            title="Booking Settings"
            description="Configure how clients can book your services"
            icon={Calendar}
        />
        <div className="space-y-2 md:space-y-4">
            <BookingConfirmationMode
                confirmationMode={bookingSettings.confirmationMode}
                onChange={(value) => onBookingSettingsUpdate({ confirmationMode: value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BufferTimeSelect
                    value={bookingSettings.bufferTime}
                    onChange={(value) => onBookingSettingsUpdate({ bufferTime: value })}
                />
                <LeadTimeSelect
                    value={bookingSettings.leadTime}
                    onChange={(value) => onBookingSettingsUpdate({ leadTime: value })}
                />
            </div>
            <MaxAdvanceBookingSelect
                value={bookingSettings.maxAdvanceBooking}
                onChange={(value) => onBookingSettingsUpdate({ maxAdvanceBooking: value })}
            />
            <CustomInstructionsField
                value={bookingSettings.customInstructions}
                onChange={(value) => onBookingSettingsUpdate({ customInstructions: value })}
            />
            <CancellationPolicyField
                value={bookingSettings.cancellationPolicy}
                onChange={(value) => onBookingSettingsUpdate({ cancellationPolicy: value })}
            />
            <div className="flex justify-end">
                <SaveBookingSettingsButton />
            </div>
        </div>
    </div>
)

export default BookingSettingsSection
