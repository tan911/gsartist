'use client'
import { useState } from 'react'
import { Conversation } from '@/types'

export function useMessagesTabState(
    conversations: Conversation[] = [],
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredConversations = (conversations || []).filter((conv) =>
        conv.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Accepts optional images (array of File or string URLs) and optional pdf file
    const handleSendMessage = (
        conversationId: number,
        text: string,
        images?: File[] | string[],
        pdfFile?: File
    ) => {
        let imageUrls: string[] = []
        if (images && images.length > 0) {
            imageUrls = images.map((img) =>
                typeof img === 'string' ? img : URL.createObjectURL(img)
            )
        }
        let files: { name: string; url: string }[] | undefined = undefined
        if (pdfFile) {
            files = [{ name: pdfFile.name, url: URL.createObjectURL(pdfFile) }]
        }
        const newMessage = {
            id: Date.now(),
            sender: 'artist' as const,
            text,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            read: false,
            images: imageUrls.length > 0 ? imageUrls : undefined,
            files,
        }

        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                    lastMessage: text,
                    timestamp: 'now',
                    unread: conv.unread + 1, // Assuming artist's own messages contribute to unread for simplicity
                }
            }
            return conv
        })
        setConversations(updatedConversations)
        setSelectedConversation(
            updatedConversations.find((conv) => conv.id === conversationId) || null
        )
    }

    const handleSelectConversation = (conversation: Conversation) => {
        setConversations((prevConversations) =>
            prevConversations.map((conv) =>
                conv.id === conversation.id ? { ...conv, unread: 0 } : conv
            )
        )
        setSelectedConversation({ ...conversation, unread: 0 })
    }

    return {
        selectedConversation,
        setSelectedConversation,
        searchQuery,
        setSearchQuery,
        filteredConversations,
        handleSendMessage,
        handleSelectConversation,
    }
}
