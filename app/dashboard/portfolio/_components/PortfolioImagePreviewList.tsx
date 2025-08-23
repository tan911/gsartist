import React from 'react'
import { X } from 'lucide-react'
import type { PortfolioImagePreviewListProps } from '@/types'

export const PortfolioImagePreviewList: React.FC<PortfolioImagePreviewListProps> = ({
    images,
    onRemove,
    uploadedImage,
}) => (
    <div className="flex flex-col items-center space-y-2">
        <span className="text-xs text-gray-500">Preview:</span>
        {images.map((img, idx) => (
            <div key={idx} className="relative w-40 h-40 mb-2">
                <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-contain rounded border border-gray-200 bg-gray-50"
                />
                <button
                    type="button"
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                    onClick={() => onRemove(idx)}
                >
                    <X className="h-4 w-4 text-red-600" />
                </button>
            </div>
        ))}
        {uploadedImage && uploadedImage.image_url && (
            <div className="relative w-40 h-40 mb-2">
                <img
                    src={uploadedImage.image_url}
                    alt="Preview New"
                    className="w-full h-full object-contain rounded border border-gray-200 bg-gray-50"
                />
            </div>
        )}
    </div>
)
