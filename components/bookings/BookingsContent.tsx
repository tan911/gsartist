import React from "react";
import { BookingsList } from "@/components/bookings/BookingsList";
import { Booking, BookingsContentProps } from "@/types";

function filterBookingsByTab(tab: string, bookings: Booking[]) {
  switch (tab) {
    case "Upcoming":
      return bookings.filter((b) => b.status === "confirmed");
    case "Pending":
      return bookings.filter((b) => b.status === "pending");
    case "Completed":
      return bookings.filter((b) => b.status === "completed");
    case "Cancelled":
      return bookings.filter((b) => b.status === "cancelled");
    case "All":
    default:
      return bookings;
  }
}

const BookingsContent: React.FC<BookingsContentProps> = ({
  activeTab,
  bookings,
  onAccept,
  onCancel,
  onComplete,
}) => {
  const bookingsToShow = filterBookingsByTab(activeTab, bookings);
  return (
    <BookingsList
      bookings={bookingsToShow}
      onAccept={onAccept}
      onCancel={onCancel}
      onComplete={onComplete}
    />
  );
};

export default BookingsContent;
