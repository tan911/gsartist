// src/components/messages/ConversationList.tsx

import React, { useState } from 'react'
import { MoreVertical, Search } from 'lucide-react'
import { Conversation } from '@/types'
import ConversationItem from './ConversationItem'
import ConversationSearchBar from './ConversationSearchBar'
import ConversationSearchModal from './ConversationSearchModal'

interface ConversationListProps {
    conversations: Conversation[]
    selectedConversation: Conversation | null
    onSelectConversation: (conversation: Conversation) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    selectedConversation,
    onSelectConversation,
    searchQuery,
    onSearchChange,
}) => {
    const [showSearchModal, setShowSearchModal] = useState(false)

    return (
        <div className="w-[60px] md:w-1/3 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-2 md:p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    {/* Hide heading and menu on mobile, show on md+ */}
                    <h3 className="text-lg font-semibold text-gray-900 hidden md:block">
                        Messages
                    </h3>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full hidden md:block">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
                {/* Search: icon button on mobile, full input on desktop */}
                <div className="block md:hidden flex justify-center">
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300"
                        aria-label="Search"
                        onClick={() => setShowSearchModal(true)}
                        type="button"
                    >
                        <Search className="h-6 w-6 text-gray-400" />
                    </button>
                </div>
                <div className="hidden md:block">
                    <ConversationSearchBar value={searchQuery} onChange={onSearchChange} />
                </div>
            </div>
            {/* Mobile Search Modal */}
            <ConversationSearchModal
                open={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                conversations={conversations}
                onSelectConversation={onSelectConversation}
            />
            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        selected={selectedConversation?.id === conversation.id}
                        onClick={() => onSelectConversation(conversation)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ConversationList
