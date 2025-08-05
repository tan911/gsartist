import React from "react";
import { Calendar, XCircle } from "lucide-react";
import { BookingCard } from "@/components/calendar/BookingCard";

interface CalendarSidebarProps {
  selectedDate: Date | null;
  getBookingsForDate: (date: Date) => any[];
  getBlockedInfoForDate: (date: Date) => any;
  bookings: any[];
  currentDate: Date;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  getBookingsForDate,
  getBlockedInfoForDate,
  bookings,
  currentDate,
}) => {
  // Quick stats for this month
  const month = currentDate.getMonth();
  const total = bookings.filter(
    (b) => new Date(b.date).getMonth() === month
  ).length;
  const confirmed = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.date).getMonth() === month
  ).length;
  const pending = bookings.filter(
    (b) => b.status === "pending" && new Date(b.date).getMonth() === month
  ).length;
  const revenue = bookings
    .filter(
      (b) => b.status === "confirmed" && new Date(b.date).getMonth() === month
    )
    .reduce((sum, b) => sum + b.price, 0);
  // Upcoming bookings (next 7 days)
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const upcoming = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate >= today &&
        bookingDate <= nextWeek &&
        booking.status !== "cancelled"
      );
    })
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {(() => {
            const dayBookings = getBookingsForDate(selectedDate);
            const blockedInfo = getBlockedInfoForDate(selectedDate);
            if (blockedInfo) {
              return (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Blocked Day
                    </p>
                    <p className="text-xs text-red-600">{blockedInfo.reason}</p>
                  </div>
                </div>
              );
            }
            if (dayBookings.length === 0) {
              return (
                <div className="text-center py-4">
                  <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    No bookings for this day
                  </p>
                  <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Add Availability
                  </button>
                </div>
              );
            }
            return (
              <div className="space-y-3">
                {dayBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    isCompact={true}
                  />
                ))}
              </div>
            );
          })()}
        </div>
      )}
      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">This Month</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Bookings</span>
            <span className="font-semibold text-gray-900">{total}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Confirmed</span>
            <span className="font-semibold text-green-600">{confirmed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pending</span>
            <span className="font-semibold text-yellow-600">{pending}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
