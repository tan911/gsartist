import React from 'react'
import { Button } from '@/components/ui/buttonnew'

interface BookingsActionsProps {
    onAccept?: () => void
    onCancel?: () => void
    showAccept?: boolean
    showCancel?: boolean
}

const BookingsActions: React.FC<BookingsActionsProps> = ({
    onAccept,
    onCancel,
    showAccept = true,
    showCancel = true,
}) => {
    return (
        <div className="flex space-x-3">
            {showAccept && (
                <Button
                    variant="default"
                    size="sm"
                    onClick={onAccept}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    Accept
                </Button>
            )}
            {showCancel && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                >
                    Cancel
                </Button>
            )}
        </div>
    )
}

export default BookingsActions
