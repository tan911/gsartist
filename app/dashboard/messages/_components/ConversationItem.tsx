import React from 'react'
import { Conversation } from '@/types'
import UnreadBadge from './UnreadBadge'
import UserAvatar from './UserAvatar'

interface ConversationItemProps {
    conversation: Conversation
    selected: boolean
    onClick: () => void
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, selected, onClick }) => {
    // Find the last unread message
    const lastUnreadMessage = conversation.messages
        .slice()
        .reverse()
        .find((msg) => !msg.read)

    const showUnreadBadge =
        conversation.unread > 0 && lastUnreadMessage && lastUnreadMessage.sender === 'client'

    return (
        <div
            className={`flex items-center p-2 md:px-4 md:py-3 cursor-pointer border-b border-gray-100 transition-colors ${
                selected ? 'bg-purple-50' : 'hover:bg-gray-50'
            }`}
            onClick={onClick}
        >
            <div className="relative mr-0 md:mr-3">
                <UserAvatar
                    name={conversation.client.name}
                    online={conversation.online}
                    size={40}
                />
            </div>
            {/* Details only on md+ screens */}
            <div className="flex-1 min-w-0 hidden md:block">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 truncate">
                        {conversation.client.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{conversation.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage}
                    </span>
                    {showUnreadBadge && (
                        <UnreadBadge count={conversation.unread} className="ml-2" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConversationItem
