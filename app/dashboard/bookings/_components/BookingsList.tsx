import React from "react";
import { BookingCard } from "./booking-card";
import { BookingsListProps } from "@/types";

export const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  onAccept,
  onCancel,
  onComplete,
}) => (
  <div className="space-y-4">
    {bookings.map((booking) => (
      <BookingCard
        key={booking.id}
        booking={booking}
        onAccept={onAccept}
        onCancel={onCancel}
        onComplete={onComplete}
      />
    ))}
  </div>
);
