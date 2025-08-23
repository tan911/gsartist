// src/components/messages/MessagesTab.tsx

import React from 'react'
import ConversationList from './ConversationList'
import ChatArea from './ChatArea'
import { Conversation } from '@/types'
import { useMessagesTabState } from '@/lib/hooks/useMessagesTabState'

interface MessagesTabProps {
    conversations: Conversation[]
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
}

const MessagesTab: React.FC<MessagesTabProps> = ({ conversations, setConversations }) => {
    const {
        selectedConversation,
        searchQuery,
        setSearchQuery,
        filteredConversations,
        handleSendMessage,
        handleSelectConversation,
    } = useMessagesTabState(conversations, setConversations)

    return (
        <div className="flex h-[calc(100vh-120px)] w-full bg-white rounded-lg shadow-sm border border-gray-200">
            <ConversationList
                conversations={filteredConversations}
                selectedConversation={selectedConversation}
                onSelectConversation={handleSelectConversation}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <ChatArea
                selectedConversation={selectedConversation}
                onSendMessage={handleSendMessage}
            />
        </div>
    )
}

export default MessagesTab
