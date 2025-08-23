'use client'
import React from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/buttonnew'
import { BookingCard } from './_components/booking-card'
import { allBookingsLinked as allBookings, reviews } from '@/lib/data/mock-data'
import { ReviewCard } from '@/app/dashboard/reviews/_components/review-card'
import { VerificationStatus } from '@/components/dashboard/verification-status'
import { BookingsTabs } from '@/app/dashboard/bookings/_components/BookingsTabs'
import { BookingsList } from '@/app/dashboard/bookings/_components/BookingsList'
import { useState, useRef } from 'react'
import BookingsHeader from '@/app/dashboard/bookings/_components/BookingsHeader'
import BookingsTabSection from '@/app/dashboard/bookings/_components/BookingsTabSection'
import BookingsContent from '@/app/dashboard/bookings/_components/BookingsContent'
import { useBookingsFilter } from '@/lib/hooks/useBookingsFilter'
import { useDropdown } from '@/lib/hooks/useDropdown'

const bookingTabs = ['All', 'Upcoming', 'Pending', 'Completed', 'Cancelled']

export default function BookingsPage() {
    const [activeTab, setActiveTab] = React.useState<string>(bookingTabs[0] ?? 'All')
    const [bookings, setBookings] = React.useState(allBookings)
    const [dateRange, setDateRange] = React.useState('all')

    // Use custom hooks for dropdown and filtering
    const { dropdownOpen, dropdownRef, setDropdownOpen } = useDropdown()
    const filteredBookings = useBookingsFilter(bookings, activeTab, dateRange)

    const handleAccept = (id: string) => {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b)))
    }

    const handleCancel = (id: string) => {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)))
    }

    const handleComplete = (id: string) => {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'completed' } : b)))
    }

    return (
        <div className="space-y-2 md:space-y-4">
            <BookingsHeader dateRange={dateRange} setDateRange={setDateRange} />
            <BookingsTabSection activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="bg-gray-50 rounded-xl ">
                <BookingsContent
                    activeTab={activeTab}
                    bookings={filteredBookings}
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                    onComplete={handleComplete}
                />
            </div>
        </div>
    )
}
