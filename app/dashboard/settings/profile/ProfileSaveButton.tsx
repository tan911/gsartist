import React from 'react'
import { Save, RefreshCw } from 'lucide-react'

interface ProfileSaveButtonProps {
    isLoading: boolean
}

const ProfileSaveButton: React.FC<ProfileSaveButtonProps> = ({ isLoading }) => (
    <button
        type="submit"
        disabled={isLoading}
        className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
        {isLoading ? (
            <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
            </>
        ) : (
            <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
            </>
        )}
    </button>
)

export default ProfileSaveButton
