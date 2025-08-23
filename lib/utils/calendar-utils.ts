// Calendar utility functions
import type { Booking } from '@/types'

export function getDaysInMonth(date: Date): (Date | null)[] {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    const days = [] as (Date | null)[]
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))
    return days
}

export function getBookingsForDate(date: Date | null, bookings: Booking[]): Booking[] {
    if (!date) return []
    const dateString = date.toISOString().split('T')[0]
    return bookings.filter((booking) => booking.date === dateString)
}

export function getBlockedInfoForDate(
    date: Date | null,
    blockedDates: { date: string; reason: string }[]
): { date: string; reason: string } | null {
    if (!date) return null
    const dateString = date.toISOString().split('T')[0]
    return blockedDates.find((blocked) => blocked.date === dateString) || null
}
