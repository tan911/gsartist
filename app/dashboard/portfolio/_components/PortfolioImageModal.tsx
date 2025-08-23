import React from 'react'
import { Modal } from '@/components/ui/modal'
import { PortfolioImageModalProps } from '@/types'

export const PortfolioImageModal: React.FC<PortfolioImageModalProps> = ({
    isOpen,
    onClose,
    selectedItem,
}) => {
    if (!isOpen || !selectedItem) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedItem.title || 'Image Preview'}
            maxWidth="max-w-3xl"
        >
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-2 sm:p-4">
                {selectedItem.images &&
                    selectedItem.images.map((img: string, idx: number) => (
                        <div key={idx} className="flex flex-col items-center">
                            <img
                                src={img}
                                alt={selectedItem.title}
                                className="w-full h-auto object-contain rounded border border-gray-200 bg-gray-50"
                            />
                        </div>
                    ))}
            </div>
        </Modal>
    )
}
