"use client";
import React, { useState, useMemo } from "react";
import {
  allBookingsLinked as allBookings,
  calendarBlockedDates,
} from "@/lib/data/mock-data";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarFiltersPanel } from "@/components/calendar/CalendarFiltersPanel";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarSidebar } from "@/components/calendar/CalendarSidebar";
import { CalendarLegend } from "@/components/calendar/CalendarLegend";
import {
  getDaysInMonth,
  getBookingsForDate,
  getBlockedInfoForDate,
} from "@/lib/utils/calendar-utils";
import type { CalendarFilters } from "@/types";

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<CalendarFilters>({
    status: "all",
    service: "all",
    timeRange: "all",
  });

  const filteredBookings = useMemo(() => {
    return allBookings.filter((booking) => {
      if (
        selectedFilters.status !== "all" &&
        booking.status !== selectedFilters.status
      )
        return false;
      if (
        selectedFilters.service !== "all" &&
        !booking.service.name
          .toLowerCase()
          .includes(selectedFilters.service.toLowerCase())
      )
        return false;
      return true;
    });
  }, [selectedFilters]);

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={() =>
          setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
          )
        }
        onNextMonth={() =>
          setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
          )
        }
        onToday={() => {
          setCurrentDate(new Date());
          setSelectedDate(new Date());
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
      <div className="grid lg:grid-cols-3 gap-6">
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
        <CalendarSidebar
          selectedDate={selectedDate}
          getBookingsForDate={(date) =>
            getBookingsForDate(date, filteredBookings)
          }
          getBlockedInfoForDate={(date) =>
            getBlockedInfoForDate(date, calendarBlockedDates)
          }
          bookings={filteredBookings}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};
