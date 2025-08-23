import React from 'react'
import { Clock, Edit, Trash2 } from 'lucide-react'
import { Service } from '@/types'
import { Button } from '@/components/ui/buttonnew'
import { Heading4 } from '@/components/typography/Heading4'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
    service: Service
    onEdit?: (service: Service) => void
    onDelete?: (serviceId: number) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4 shadow-sm transition-shadow hover:shadow-lg">
            <div className="flex items-center justify-between mb-2">
                <Heading4 className={cn('text-left text-gray-900')}>{service.name}</Heading4>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(service)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete?.(Number(service.id))}
                        className="p-1 text-gray-400 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{service.category}</span>
                <span className="font-medium text-gray-900">{service.price}</span>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {service.duration}
            </div>
        </div>
    )
}
