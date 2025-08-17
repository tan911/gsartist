import React from "react";
import { BookingCard } from "./booking-card";
import { BookingsListProps } from "@/types";

export const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onAccept,
  onCancel,
  onComplete,
}) => (
  <div className="grid gap-2 md:gap-4">
    {bookings.length === 0 ? (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No bookings found
        </h3>
        <p className="text-gray-500">
          There are no bookings matching your current filters.
        </p>
      </div>
    ) : (
      bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onAccept={onAccept}
          onCancel={onCancel}
          onComplete={onComplete}
        />
      ))
    )}
  </div>
);
