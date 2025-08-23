import React from 'react'

interface CancellationPolicyFieldProps {
    value: string
    onChange: (value: string) => void
}

const CancellationPolicyField: React.FC<CancellationPolicyFieldProps> = ({ value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
        <textarea
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
    </div>
)

export default CancellationPolicyField
