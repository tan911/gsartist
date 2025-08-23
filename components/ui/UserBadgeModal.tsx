import React from 'react'
import { Modal } from './modal'

interface UserBadgeModalProps {
    isOpen: boolean
    onClose: () => void
    user: {
        name: string
        image?: string | null
        email?: string
        isArtist?: boolean
    }
}

const DefaultAvatar: React.FC<{ name?: string }> = ({ name }) => {
    const initials = name
        ? name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
        : '?'
    return (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg ring-4 ring-purple-200">
            <span className="text-white font-bold text-4xl select-none">{initials}</span>
        </div>
    )
}

export const UserBadgeModal: React.FC<UserBadgeModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm flex flex-col items-center text-center">
                <div className="mb-4">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name + "'s avatar"}
                            className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-purple-200 border-2 border-white"
                        />
                    ) : (
                        <DefaultAvatar name={user.name} />
                    )}
                </div>
                <div className="font-bold text-2xl text-gray-900 mb-1">{user.name}</div>
                {user.isArtist && (
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Artist
                    </span>
                )}
                {user.email && <div className="text-gray-500 text-sm mb-2">{user.email}</div>}
                <hr className="w-full my-4 border-t border-gray-200" />
                <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    )
}
