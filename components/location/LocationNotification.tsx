"use client";

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Notification } from "@/lib/hooks/useLocationGeocoding";

interface LocationNotificationProps {
  notification: Notification;
}

const LocationNotification: React.FC<LocationNotificationProps> = ({
  notification,
}) => {
  if (!notification) return null;

  return (
    <div
      className={`flex items-center mb-3 px-3 py-2 rounded-md text-sm font-medium ${
        notification.type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}>
      {notification.type === "success" ? (
        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 mr-2 text-red-500" />
      )}
      {notification.message}
    </div>
  );
};

export default LocationNotification;
