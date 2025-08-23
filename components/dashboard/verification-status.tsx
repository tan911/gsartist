import React from 'react'
import { Mail, Phone, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { VerificationItem } from '@/types'
import { verificationItems } from '@/lib/data/mock-data'
import { Heading3 } from '../typography/Heading3'
import { cn } from '@/lib/utils'

export const VerificationStatus: React.FC = () => {
    const getStatusIcon = (status: VerificationItem['status']) => {
        switch (status) {
            case 'verified':
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case 'pending':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />
            case 'failed':
                return <AlertCircle className="h-5 w-5 text-red-500" />
        }
    }

    const getIconColor = (status: VerificationItem['status']) => {
        switch (status) {
            case 'verified':
                return 'text-green-500'
            case 'pending':
                return 'text-yellow-500'
            case 'failed':
                return 'text-red-500'
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
            <Heading3 className={cn('mb-1 md:mb-2 text-left text-gray-900')}>
                Verification Status
            </Heading3>
            <div className="space-y-4">
                {verificationItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Icon className={`h-5 w-5 ${getIconColor(item.status)}`} />
                                <span className="text-gray-700">{item.label}</span>
                            </div>
                            {getStatusIcon(item.status)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
