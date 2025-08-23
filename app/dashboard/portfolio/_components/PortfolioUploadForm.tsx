import React, { useState } from 'react'
import type { PortfolioUploadFormProps } from '@/types'
import { Input } from '@/components/ui/inputLabel'
import { CustomSelect } from '@/components/ui/custom-select'

export const PortfolioUploadForm: React.FC<PortfolioUploadFormProps> = ({
    title,
    setTitle,
    category,
    setCategory,
    onUpload,
    onClose,
    disabled,
    isEdit,
}) => {
    const [selectedValue, setSelectedValue] = useState('hair')
    const categoryOptions = [
        { value: 'hair', label: 'Hair' },
        { value: 'makeup', label: 'Makeup' },
        { value: 'combo', label: 'Combo' },
    ]

    return (
        <>
            <div>
                <Input
                    type="text"
                    label="Title"
                    value={title}
                    placeholder="ex. Wedding Makeup"
                    onChange={(e) => setTitle(e.target.value)}
                    helpText="Think of a catchy title"
                    min="1"
                />
            </div>
            <div>
                <CustomSelect
                    label="Category"
                    options={categoryOptions}
                    value={selectedValue}
                    onChange={setSelectedValue}
                    helpText="Select a booking status to filter"
                />
                {/* <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select> */}
            </div>
            <div className="flex space-x-3 pt-4">
                {/*
        NOTE: Modifying the image file name for permanent storage must be handled on the server
        before saving to the database. The client can only suggest a name for download purposes.
      */}
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    onClick={onUpload}
                    disabled={disabled}
                >
                    {isEdit ? 'Save Changes' : 'Upload'}
                </button>
            </div>
        </>
    )
}
