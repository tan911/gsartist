import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { PortfolioImageUpload } from './PortfolioImageUpload'
import { PortfolioImagePreviewList } from './PortfolioImagePreviewList'
import { PortfolioUploadForm } from './PortfolioUploadForm'
import { Modal } from '@/components/ui/modal'
import type { PortfolioUploadModalProps } from '@/types'

export const PortfolioUploadModal: React.FC<PortfolioUploadModalProps> = ({
    open,
    onClose,
    onUpload,
    initialValues,
    artistName,
    artistId,
}) => {
    const [title, setTitle] = useState(initialValues?.title || '')
    const [category, setCategory] = useState(initialValues?.category || 'Hair')
    const [uploadedImage, setUploadedImage] = useState<any>(null)
    const [images, setImages] = useState<string[]>(initialValues?.images || [])

    React.useEffect(() => {
        setTitle(initialValues?.title || '')
        setCategory(initialValues?.category || 'Hair')
        setImages(initialValues?.images || [])
        setUploadedImage(null)
    }, [initialValues, open])

    if (!open) return null

    const handleUpload = () => {
        const allImages = [...images]
        if (uploadedImage && uploadedImage.image_url) {
            allImages.push(uploadedImage.image_url)
        }
        if (title && category && allImages.length > 0) {
            onUpload({
                type: 'image',
                images: allImages,
                title,
                category,
            })
            setTitle('')
            setCategory('Hair')
            setUploadedImage(null)
            setImages([])
        }
    }

    const handleRemoveImage = (idx: number) => {
        setImages((prev) => prev.filter((_, i) => i !== idx))
    }

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={initialValues ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
            maxWidth="max-w-3xl"
        >
            <div className="space-y-4">
                <PortfolioUploadForm
                    title={title}
                    setTitle={setTitle}
                    category={category}
                    setCategory={setCategory}
                    onUpload={handleUpload}
                    onClose={onClose}
                    disabled={!title || !category || (images.length === 0 && !uploadedImage)}
                    isEdit={!!initialValues}
                />
                <PortfolioImageUpload
                    artistId={artistId || 'artist-1'}
                    artistName={artistName}
                    service={category}
                    onUpload={setUploadedImage}
                />
                {(uploadedImage || images.length > 0) && (
                    <PortfolioImagePreviewList
                        images={images}
                        onRemove={handleRemoveImage}
                        uploadedImage={uploadedImage}
                    />
                )}
            </div>
        </Modal>
    )
}
