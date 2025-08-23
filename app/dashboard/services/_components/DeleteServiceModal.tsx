import React from 'react'
import { Modal } from '@/components/ui/modal'

interface DeleteServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Service?">
        <div className="space-y-4">
            <p className="text-red-600 font-semibold">
                Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
                <button
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={onClose}
                >
                    No, Go Back
                </button>
                <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={onConfirm}
                >
                    Yes, Delete Service
                </button>
            </div>
        </div>
    </Modal>
)
