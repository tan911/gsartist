import React from 'react'
import { BookingsTabs } from '@/app/dashboard/bookings/_components/BookingsTabs'
import type { BookingsTabSectionProps } from '@/types'

const bookingTabs = ['All', 'Upcoming', 'Pending', 'Completed', 'Cancelled']

const BookingsTabSection: React.FC<BookingsTabSectionProps> = ({ activeTab, onTabChange }) => (
    <BookingsTabs tabs={bookingTabs} activeTab={activeTab} onTabChange={onTabChange} />
)

export default BookingsTabSection
