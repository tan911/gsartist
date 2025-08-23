import React from 'react'
import { Button } from '@/components/ui/buttonnew'
import { cn } from '@/lib/utils'
import { Heading3 } from '../typography/Heading3'

interface DashboardSectionProps {
    title: string
    children: React.ReactNode
    onViewAll?: () => void
    viewAllText?: string
    className?: string
    headerClassName?: string
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
    title,
    children,
    onViewAll,
    viewAllText = 'View All',
    className,
    headerClassName,
}) => {
    return (
        <div
            className={cn(
                'bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8 mb-4',
                className
            )}
        >
            <div className={cn('flex items-center justify-between mb-4', headerClassName)}>
                {' '}
                <Heading3 className={cn('mb-1 md:mb-2 text-left text-gray-900')}>{title}</Heading3>
                {onViewAll && (
                    <Button
                        variant="ghost"
                        onClick={onViewAll}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                        {viewAllText}
                    </Button>
                )}
            </div>
            {children}
        </div>
    )
}
