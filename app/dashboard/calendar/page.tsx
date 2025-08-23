'use client'
import React, { useState, useMemo } from 'react'
import { allBookingsLinked as allBookings, calendarBlockedDates } from '@/lib/data/mock-data'
import { CalendarHeader } from '@/app/dashboard/calendar/_components/CalendarHeader'
import { CalendarFiltersPanel } from '@/app/dashboard/calendar/_components/CalendarFiltersPanel'
import { CalendarGrid } from '@/app/dashboard/calendar/_components/CalendarGrid'
import { CalendarSidebar } from '@/app/dashboard/calendar/_components/CalendarSidebar'
import { CalendarLegend } from '@/app/dashboard/calendar/_components/CalendarLegend'
import {
    getDaysInMonth,
    getBookingsForDate,
    getBlockedInfoForDate,
} from '@/lib/utils/calendar-utils'
import type { CalendarFilters } from '@/types'
import { useCalendarFilters } from '@/lib/hooks/useCalendarFilters'

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showFilters, setShowFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<CalendarFilters>({
        status: 'all',
        service: 'all',
        timeRange: 'all',
    })

    // Use custom hook for filtering bookings
    const filteredBookings = useCalendarFilters(allBookings, selectedFilters)

    const days = getDaysInMonth(currentDate)

    return (
        <div className="space-y-2 md:space-y-4">
            <CalendarHeader
                currentDate={currentDate}
                onPrevMonth={() =>
                    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
                }
                onNextMonth={() =>
                    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
                }
                onToday={() => {
                    setCurrentDate(new Date())
                    setSelectedDate(new Date())
                }}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters((prev) => !prev)}
            />
            <CalendarLegend />
            {showFilters && (
                <CalendarFiltersPanel
                    selectedFilters={selectedFilters}
                    onChange={setSelectedFilters}
                />
            )}
            <div className="space-y-2 md:space-y-4">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <CalendarGrid
                            days={days}
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            getBookingsForDate={(date) =>
                                getBookingsForDate(date, filteredBookings)
                            }
                            getBlockedInfoForDate={(date) =>
                                getBlockedInfoForDate(date, calendarBlockedDates)
                            }
                        />
                    </div>
                </div>
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <CalendarSidebar
                        selectedDate={selectedDate}
                        getBookingsForDate={(date) => getBookingsForDate(date, filteredBookings)}
                        getBlockedInfoForDate={(date) =>
                            getBlockedInfoForDate(date, calendarBlockedDates)
                        }
                        bookings={filteredBookings}
                        currentDate={currentDate}
                    />
                </div>
            </div>
        </div>
    )
}
