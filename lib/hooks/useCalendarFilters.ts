import { useMemo } from 'react'
import { Booking, CalendarFilters } from '@/types'

export function useCalendarFilters(bookings: Booking[], filters: CalendarFilters) {
    return useMemo(() => {
        return bookings.filter((booking) => {
            if (filters.status !== 'all' && booking.status !== filters.status) return false
            if (
                filters.service !== 'all' &&
                !booking.service.name.toLowerCase().includes(filters.service.toLowerCase())
            )
                return false
            return true
        })
    }, [bookings, filters])
}
