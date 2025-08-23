import React from 'react'

interface ProfileContactFieldsProps {
    email: string
    phone: string
    onChange: (field: 'email' | 'phone', value: string) => void
}

const ProfileContactFields: React.FC<ProfileContactFieldsProps> = ({ email, phone, onChange }) => (
    <>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
                type="email"
                value={email}
                onChange={(e) => onChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
                type="tel"
                value={phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
        </div>
    </>
)

export default ProfileContactFields
