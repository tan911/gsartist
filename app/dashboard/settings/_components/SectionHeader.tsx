import React from 'react'
import { SectionHeaderProps } from '@/types'

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, icon: Icon }) => (
    <div className="flex items-center mb-4">
        {Icon && <Icon className="h-5 w-5 text-purple-600 mr-2" />}
        <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
    </div>
)

export default SectionHeader
