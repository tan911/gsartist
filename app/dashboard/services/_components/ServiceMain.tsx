import React from 'react'
import { ServiceCategories } from '@/app/dashboard/services/_components/ServiceCategories'
import { ServicesGrid } from '@/app/dashboard/services/_components/ServicesGrid'
import { Service } from '@/types'

interface ServiceMainProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    services: Service[]
    onEdit: (service: Service) => void
    onDelete: (serviceId: number) => void
}

export const ServiceMain: React.FC<ServiceMainProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    services,
    onEdit,
    onDelete,
}) => (
    <>
        <ServiceCategories
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
        />
        <ServicesGrid services={services} onEdit={onEdit} onDelete={onDelete} />
    </>
)
