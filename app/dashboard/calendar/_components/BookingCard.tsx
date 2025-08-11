import React from "react";
import { Eye, Edit, MoreVertical, Clock, MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Booking } from "@/types";

interface BookingCardProps {
  booking: Booking;
  isCompact?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isCompact = false,
}) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col min-h-[110px]">
    {/* Status badge at the top */}
    <div className="flex items-center mb-1">
      <StatusBadge status={booking.status} />
    </div>
    {/* Client name */}
    <div className="font-bold text-lg text-gray-900 leading-tight mb-1 truncate">
      {booking.client?.name}
    </div>
    {/* Service and price row */}
    <div className="flex items-center justify-between mb-1">
      <span className="text-gray-500 text-base truncate">
        {booking.service?.name}
      </span>
      <span className="font-bold text-lg text-gray-900 ml-2 whitespace-nowrap">
        ₱{(booking.totalAmount ?? booking.servicePrice ?? 0).toLocaleString()}
      </span>
    </div>
    {/* Time and distance row */}
    <div className="flex items-center space-x-6 text-gray-500 text-xs mt-1">
      <span className="flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {booking.startTime} - {booking.endTime}
      </span>
      <span className="flex items-center">
        <MapPin className="h-3 w-3 mr-1" />
        {booking.isTravel ? booking.travelDistance : "Studio"}
      </span>
    </div>
  </div>
);
