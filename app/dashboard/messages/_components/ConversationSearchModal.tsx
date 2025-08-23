import React from 'react'
import { Search } from 'lucide-react'
import { Conversation } from '@/types'

interface ConversationSearchModalProps {
    open: boolean
    onClose: () => void
    searchQuery: string
    onSearchChange: (value: string) => void
    conversations: Conversation[]
    onSelectConversation: (conversation: Conversation) => void
}

const ConversationSearchModal: React.FC<ConversationSearchModalProps> = ({
    open,
    onClose,
    searchQuery,
    onSearchChange,
    conversations,
    onSelectConversation,
}) => {
    if (!open) return null
    const filtered = conversations.filter((conv) =>
        conv.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-400/30 to-pink-400/30 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-xs mx-auto flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center mb-4">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search conversation"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        autoFocus
                    />
                    <button
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                        aria-label="Close search"
                        type="button"
                    >
                        ×
                    </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                    {filtered.map((conv) => (
                        <div
                            key={conv.id}
                            className="flex items-center px-2 py-2 cursor-pointer hover:bg-purple-50 rounded"
                            onClick={() => {
                                onSelectConversation(conv)
                                onClose()
                            }}
                        >
                            <span className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full text-purple-600 font-semibold mr-3">
                                {conv.client.name.charAt(0)}
                            </span>
                            <span className="text-gray-900">{conv.client.name}</span>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-gray-400 text-center py-4">No results found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConversationSearchModal
