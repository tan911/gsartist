'use client'
import React, { useState } from 'react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { MenuItem } from '@/types'
import { notificationsList as mockNotificationsList } from '@/lib/data/mock-data'
import { UserDataProvider } from '@/lib/context/UserDataContext'
import { useAuth } from '@/lib/context/AuthContext'

interface DashboardLayoutProps {
    children: React.ReactNode
    menuItems: MenuItem[]
    activeTab: string
    onTabChange: (tabId: string) => void
    conversations?: { unread: number }[]
    refreshInterval?: number // Optional refresh interval
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    menuItems,
    activeTab,
    onTabChange,
    conversations = [],
    refreshInterval = 5 * 60 * 1000, // 5 minutes default
}) => {
    const { user, isAuthenticated } = useAuth()
    const [notificationsList, setNotificationsList] = useState(mockNotificationsList)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    const markNotificationAsRead = (id: number) => {
        setNotificationsList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    // Use mock user data if not authenticated
    const displayUser = user || {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@example.com',
        isArtist: true,
        image: null,
    }

    return (
        <UserDataProvider userId={displayUser.id} refreshInterval={refreshInterval}>
            <div className="min-h-screen bg-gray-50">
                <Header
                    notificationsList={notificationsList}
                    markNotificationAsRead={markNotificationAsRead}
                    user={displayUser}
                    onOpenSidebar={() => setMobileSidebarOpen(true)}
                    onCloseSidebar={() => setMobileSidebarOpen(false)}
                    mobileSidebarOpen={mobileSidebarOpen}
                />
                <div className="flex">
                    <Sidebar
                        menuItems={menuItems}
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                        conversations={conversations}
                        mobileOpen={mobileSidebarOpen}
                        onCloseMobile={() => setMobileSidebarOpen(false)}
                    />
                    <main className="flex-1 p-2 sm:p-4">{children}</main>
                </div>
            </div>
        </UserDataProvider>
    )
}
