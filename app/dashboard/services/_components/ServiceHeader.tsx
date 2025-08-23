import React from 'react'
import { AddServiceButton } from '@/app/dashboard/services/_components/AddServiceButton'
import { Heading2 } from '@/components/typography/Heading2'
import { cn } from '@/lib/utils'

interface ServiceHeaderProps {
    onAdd: () => void
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({ onAdd }) => (
    <div className="flex items-center justify-between">
        <Heading2 className={cn('text-left text-gray-900')}>Service Management</Heading2>
        <AddServiceButton onAdd={onAdd} />
    </div>
)
