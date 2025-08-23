import React from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/inputLabel'
import { AvailabilitySettings } from '@/types'
import { Heading3 } from '@/components/typography/Heading3'
import { cn } from '@/lib/utils'

interface BookingSettingsSectionProps {
    settings: AvailabilitySettings
    onChange: React.Dispatch<React.SetStateAction<AvailabilitySettings>>
    disabled?: boolean
}

export const BookingSettingsSection: React.FC<BookingSettingsSectionProps> = ({
    settings,
    onChange,
    disabled = false,
}) => (
    <Card className="p-4 md:p-8">
        <Heading3 className={cn('text-left text-gray-900')}>Booking Settings</Heading3>

        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
            <Input
                type="number"
                label="Minimum Lead Time (hours)"
                value={settings.leadTime}
                onChange={(e) => onChange((prev) => ({ ...prev, leadTime: e.target.value }))}
                helpText="How far in advance clients must book"
                min="1"
                disabled={disabled}
            />
            <Input
                type="number"
                label="Max Advance Booking (days)"
                value={settings.maxAdvanceBooking}
                onChange={(e) =>
                    onChange((prev) => ({ ...prev, maxAdvanceBooking: e.target.value }))
                }
                helpText="How far ahead bookings are allowed"
                min="1"
                disabled={disabled}
            />
            {/* <Input
        type="number"
        label="Buffer Time (minutes)"
        value={settings.bufferTime}
        onChange={(e) =>
          onChange((prev) => ({ ...prev, bufferTime: e.target.value }))
        }
        helpText="Break time between appointments"
        min="0"
        step="15"
        disabled={disabled}
      /> */}
        </div>
    </Card>
)
