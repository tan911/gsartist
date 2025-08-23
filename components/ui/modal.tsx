'use client'
import React from 'react'
import { X } from 'lucide-react'
import { Heading3 } from '../typography/Heading3'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    maxWidth?: string
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-md',
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-md flex items-center justify-center z-50">
            <div
                className={`bg-white rounded-lg p-6 w-[80vw] max-w-3xl sm:w-full sm:max-w-full overflow-y-auto max-h-[90vh] shadow-xl ${maxWidth}`}
                style={{ width: '80vw', maxWidth: '900px' }}
            >
                <div className="flex items-center justify-between mb-4">
                    <Heading3 className={cn('text-left text-gray-900')}>{title}</Heading3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-4 w-4 md:h-8 md:w-8" />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[70vh]">{children}</div>
            </div>
        </div>
    )
}
