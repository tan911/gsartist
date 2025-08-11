"use client";
import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/buttonnew";
import { BookingCard } from "./_components/booking-card";
import {
  allBookingsLinked as allBookings,
  reviews,
} from "@/lib/data/mock-data";
import { ReviewCard } from "@/app/dashboard/reviews/_components/review-card";
import { VerificationStatus } from "@/components/dashboard/verification-status";
import { BookingsTabs } from "@/app/dashboard/bookings/_components/BookingsTabs";
import { BookingsList } from "@/app/dashboard/bookings/_components/BookingsList";
import { useState, useRef } from "react";
import BookingsHeader from "@/app/dashboard/bookings/_components/BookingsHeader";
import BookingsTabSection from "@/app/dashboard/bookings/_components/BookingsTabSection";
import BookingsContent from "@/app/dashboard/bookings/_components/BookingsContent";

const bookingTabs = ["All", "Upcoming", "Pending", "Completed", "Cancelled"];

function filterBookingsByTab(tab: string, bookings: typeof allBookings) {
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

export default function BookingsPage() {
  const [activeTab, setActiveTab] = React.useState<string>(
    bookingTabs[0] ?? "All"
  );
  const [bookings, setBookings] = React.useState(allBookings);
  const [dateRange, setDateRange] = React.useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "Past Week" },
    { value: "month", label: "Past Month" },
  ];

  const handleAccept = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
    );
  };

  const handleCancel = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  const handleComplete = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "completed" } : b))
    );
  };

  // Date range filter logic
  const filterByDateRange = (bookings: typeof allBookings, range: string) => {
    const now = new Date();
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      switch (range) {
        case "today":
          return bookingDate.toDateString() === now.toDateString();
        case "yesterday": {
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          return bookingDate.toDateString() === yesterday.toDateString();
        }
        case "week": {
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return bookingDate >= weekAgo && bookingDate <= now;
        }
        case "month": {
          const monthAgo = new Date(now);
          monthAgo.setMonth(now.getMonth() - 1);
          return bookingDate >= monthAgo && bookingDate <= now;
        }
        case "all":
        default:
          return true;
      }
    });
  };

  const filteredBookings = filterByDateRange(bookings, dateRange);

  return (
    <div className="space-y-6">
      <BookingsHeader dateRange={dateRange} setDateRange={setDateRange} />
      <BookingsTabSection activeTab={activeTab} onTabChange={setActiveTab} />
      <BookingsContent
        activeTab={activeTab}
        bookings={filteredBookings}
        onAccept={handleAccept}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />
    </div>
  );
}
