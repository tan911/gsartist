import { useMemo } from 'react'
import { Booking } from '@/types'

function filterBookingsByTab(tab: string, bookings: Booking[]) {
    switch (tab) {
        case 'Upcoming':
            return bookings.filter((b) => b.status === 'confirmed')
        case 'Pending':
            return bookings.filter((b) => b.status === 'pending')
        case 'Completed':
            return bookings.filter((b) => b.status === 'completed')
        case 'Cancelled':
            return bookings.filter((b) => b.status === 'cancelled')
        case 'All':
        default:
            return bookings
    }
}

function filterByDateRange(bookings: Booking[], range: string) {
    const now = new Date()
    return bookings.filter((booking) => {
        const bookingDate = new Date(booking.date)
        switch (range) {
            case 'today':
                return bookingDate.toDateString() === now.toDateString()
            case 'yesterday': {
                const yesterday = new Date(now)
                yesterday.setDate(now.getDate() - 1)
                return bookingDate.toDateString() === yesterday.toDateString()
            }
            case 'week': {
                const weekAgo = new Date(now)
                weekAgo.setDate(now.getDate() - 7)
                return bookingDate >= weekAgo && bookingDate <= now
            }
            case 'month': {
                const monthAgo = new Date(now)
                monthAgo.setMonth(now.getMonth() - 1)
                return bookingDate >= monthAgo && bookingDate <= now
            }
            case 'all':
            default:
                return true
        }
    })
}

export function useBookingsFilter(bookings: Booking[], activeTab: string, dateRange: string) {
    return useMemo(() => {
        const tabFiltered = filterBookingsByTab(activeTab, bookings)
        return filterByDateRange(tabFiltered, dateRange)
    }, [bookings, activeTab, dateRange])
}
