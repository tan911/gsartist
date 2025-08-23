import React from 'react'

interface ProfileLocationFieldProps {
    value: string
    onChange: (value: string) => void
}

const ProfileLocationField: React.FC<ProfileLocationFieldProps> = ({ value, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
    </div>
)

export default ProfileLocationField
