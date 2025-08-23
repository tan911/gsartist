import React from 'react'

interface ChatHeaderProps {
    client: { name: string }
    online: boolean
    children?: React.ReactNode
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ client, online }) => (
    <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">
                            {client.name.charAt(0)}
                        </span>
                    </div>
                    {online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-500">{online ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            {/* No actions for now */}
        </div>
    </div>
)

export default ChatHeader
