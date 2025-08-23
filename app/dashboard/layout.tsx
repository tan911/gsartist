'use client'
import React from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PlaceholderPage } from '@/components/layout/placeholder-page'
import { menuItems, mockConversations } from '@/lib/data/mock-data'
import { useAuth } from '@/lib/context/AuthContext'
import { usePathname } from 'next/navigation'

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [conversations] = React.useState(mockConversations)
    const pathname = usePathname()

    // Determine active tab based on current pathname
    const getActiveTab = () => {
        if (pathname === '/dashboard') return 'dashboard'
        if (pathname === '/dashboard/bookings') return 'bookings'
        if (pathname === '/dashboard/calendar') return 'calendar'
        if (pathname === '/dashboard/services') return 'services'
        if (pathname === '/dashboard/availability') return 'availability'
        if (pathname === '/dashboard/portfolio') return 'portfolio'
        if (pathname === '/dashboard/messages') return 'messages'
        if (pathname === '/dashboard/reviews') return 'reviews'
        if (pathname === '/dashboard/location') return 'location'
        if (pathname === '/dashboard/settings') return 'settings'
        return 'dashboard'
    }

    const handleTabChange = (tabId: string) => {
        // This will be handled by the sidebar navigation
    }

    // Render placeholder for messages and reviews tabs
    const renderContent = () => {
        if (pathname === '/dashboard/messages') {
            return (
                <PlaceholderPage
                    title="Messages Coming Soon"
                    description="The messaging system is currently under development. You'll be able to communicate with your clients and manage conversations here."
                />
            )
        }

        if (pathname === '/dashboard/reviews') {
            return (
                <PlaceholderPage
                    title="Reviews Management Coming Soon"
                    description="The reviews management system is currently under development. You'll be able to view, respond to, and manage client reviews here."
                />
            )
        }

        return children
    }

    return (
        <ProtectedRoute>
            <DashboardLayout
                menuItems={menuItems}
                activeTab={getActiveTab()}
                onTabChange={handleTabChange}
                conversations={conversations}
            >
                {renderContent()}
            </DashboardLayout>
        </ProtectedRoute>
    )
}
