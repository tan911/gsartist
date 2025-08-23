import React from 'react'
import { X } from 'lucide-react'

const NotificationPanel = ({
    notificationsList,
    onClose,
    onMarkRead,
}: {
    notificationsList: any[]
    onClose: () => void
    onMarkRead: (id: number) => void
}) => (
    <div
        className="fixed sm:absolute right-0 left-0 sm:left-auto top-0 sm:top-12 
  w-full sm:w-80 max-w-full sm:max-w-xs 
  bg-white rounded-lg shadow-lg border border-gray-200 z-50
  mx-auto sm:mx-0"
    >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
            </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
            {notificationsList.length === 0 && (
                <div className="p-4 text-center text-gray-500">No notifications</div>
            )}
            {notificationsList.map((notification) => {
                const Icon = notification.icon
                return (
                    <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => onMarkRead(notification.id)}
                    >
                        <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full bg-${notification.color}-100`}>
                                <Icon className={`h-4 w-4 text-${notification.color}-600`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-900 text-sm">
                                        {notification.title}
                                    </h4>
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {notification.timestamp}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All Notifications
            </button>
        </div>
    </div>
)

export default NotificationPanel
