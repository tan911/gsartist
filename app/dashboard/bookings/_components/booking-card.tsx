import React, { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { BookingCardProps } from '@/types'
import { Badge } from '@/components/ui/badge'
import BookingsActions from './BookingsActions'
import { CancelBookingModal } from './CancelBookingModal'
import { Button } from '@/components/ui/buttonnew'
import { Heading4 } from '@/components/typography/Heading4'
import { cn } from '@/lib/utils'
import { Meta } from '@/components/typography/Meta'

// Extract status badge to its own component
const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200'
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }
    return (
        <Badge
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                status
            )}`}
        >
            {status}
        </Badge>
    )
}

export const BookingCard: React.FC<BookingCardProps> = ({
    booking,
    onAccept,
    onCancel,
    onComplete,
}) => {
    const [showCancelModal, setShowCancelModal] = useState(false)

    const handleCancelClick = () => setShowCancelModal(true)
    const handleCancelConfirm = () => {
        setShowCancelModal(false)
        if (onCancel) onCancel(booking.id)
    }
    const handleCancelClose = () => setShowCancelModal(false)

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-sm">
                            {booking.client.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>
                    <div>
                        <Heading4 className={cn('text-left text-gray-900')}>
                            {booking.client.name}
                        </Heading4>
                        <Meta className={cn('text-left text-gray-900')}>
                            {booking.service.name}
                        </Meta>
                    </div>
                </div>
                {/* Price and Status */}
                <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg md:text-2xl mb-1">
                        ${booking.totalAmount}
                    </p>
                    <StatusBadge status={booking.status} />
                </div>
            </div>
            {/* Date and Time Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <Meta className={cn('text-left text-gray-900 font-medium')}>
                            {booking.date}
                        </Meta>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <Meta className={cn('text-left text-gray-900 font-medium')}>
                            {booking.startTime}
                        </Meta>
                    </div>
                </div>
                <Meta className={cn('text-left text-gray-900 font-medium')}>
                    {booking.duration}
                </Meta>
            </div>
            {/* Actions Section */}
            {booking.status === 'pending' && (
                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <BookingsActions
                        onAccept={() => onAccept && onAccept(booking.id)}
                        onCancel={handleCancelClick}
                        showAccept={true}
                        showCancel={true}
                    />
                </div>
            )}
            {booking.status === 'confirmed' && (
                <div className="flex justify-end space-x-2 pt-2 md:pt-4 border-t border-gray-100">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => onComplete && onComplete(booking.id)}
                    >
                        Mark as Done
                    </Button>
                </div>
            )}
            <CancelBookingModal
                isOpen={showCancelModal}
                onClose={handleCancelClose}
                onConfirm={handleCancelConfirm}
            />
        </div>
    )
}
