import React from "react";

interface CalendarGridProps {
  days: (Date | null)[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  getBookingsForDate: (date: Date) => any[];
  getBlockedInfoForDate: (date: Date) => any;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  selectedDate,
  onSelectDate,
  getBookingsForDate,
  getBlockedInfoForDate,
}) => (
  <div className="p-4">
    {/* Day Headers */}
    <div className="grid grid-cols-7 gap-1 mb-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="p-2 text-center text-sm font-medium text-gray-500">
          {day}
        </div>
      ))}
    </div>
    {/* Calendar Days */}
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => {
        if (!day) return <div key={index} className="p-2 h-20"></div>;
        const dayBookings = getBookingsForDate(day);
        const blockedInfo = getBlockedInfoForDate(day);
        const isToday = day.toDateString() === new Date().toDateString();
        const isSelected =
          selectedDate && day.toDateString() === selectedDate.toDateString();
        return (
          <div
            key={index}
            onClick={() => onSelectDate(day)}
            className={`p-2 h-20 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              isToday ? "bg-purple-50 border-purple-200" : ""
            } ${isSelected ? "ring-2 ring-purple-500" : ""}`}>
            <div
              className={`text-sm font-medium mb-1 ${isToday ? "text-purple-700" : "text-gray-900"}`}>
              {day.getDate()}
            </div>
            {/* Blocked Day Indicator */}
            {blockedInfo && (
              <div
                className="w-full h-1 bg-red-300 rounded mb-1"
                title={blockedInfo.reason}></div>
            )}
            {/* Booking Indicators */}
            <div className="space-y-1">
              {dayBookings.slice(0, 2).map((booking) => (
                <div
                  key={booking.id}
                  className={`text-xs px-1 py-0.5 rounded truncate ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                  title={`${booking.clientName} - ${booking.service}`}>
                  {booking.startTime} {booking.clientName}
                </div>
              ))}
              {dayBookings.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{dayBookings.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
