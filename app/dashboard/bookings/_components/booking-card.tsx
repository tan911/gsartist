import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { BookingCardProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import BookingsActions from "./BookingsActions";
import { CancelBookingModal } from "./CancelBookingModal";
import { Button } from "@/components/ui/buttonnew";

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onAccept,
  onCancel,
  onComplete,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      case "completed":
        return "info";
      default:
        return "info";
    }
  };

  const handleCancelClick = () => setShowCancelModal(true);
  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    if (onCancel) onCancel(booking.id);
  };
  const handleCancelClose = () => setShowCancelModal(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold">
              {booking.client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {booking.client.name}
            </h4>
            <p className="text-sm text-gray-500">{booking.service.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">{booking.totalAmount}</p>
          <Badge variant={getStatusVariant(booking.status)}>
            {booking.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {booking.date}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {booking.startTime}
          </span>
        </div>
        <span className="text-gray-500">{booking.duration}</span>
      </div>
      {booking.status === "pending" && (
        <div className="flex justify-end mt-4">
          <BookingsActions
            onAccept={() => onAccept && onAccept(booking.id)}
            onCancel={handleCancelClick}
            showAccept={true}
            showCancel={true}
          />
        </div>
      )}
      {booking.status === "confirmed" && (
        <div className="flex justify-end mt-4 gap-2">
          <BookingsActions
            onCancel={handleCancelClick}
            showAccept={false}
            showCancel={true}
          />
          {booking.status === "confirmed" && (
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onComplete && onComplete(booking.id)}>
              Mark as Done
            </Button>
          )}
        </div>
      )}
      <CancelBookingModal
        isOpen={showCancelModal}
        onClose={handleCancelClose}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
};
