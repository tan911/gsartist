"use client";

import { useState, useCallback } from "react";
import { LocationFormData } from "@/types";
import {
  geocodeAddress,
  reverseGeocode,
} from "@/app/dashboard/location/_components/geocoding-service";

// Import the Notification type from the location components
export type Notification = {
  type: "success" | "error";
  message: string;
} | null;

interface UseLocationGeocodingProps {
  onLocationUpdate: (field: keyof LocationFormData, value: any) => void;
}

export const useLocationGeocoding = ({
  onLocationUpdate,
}: UseLocationGeocodingProps) => {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [notification, setNotification] = useState<Notification>(null);

  const clearAddressFields = useCallback(() => {
    onLocationUpdate("address", "");
    onLocationUpdate("city", "");
    onLocationUpdate("region", "");
    onLocationUpdate("postalCode", "");
  }, [onLocationUpdate]);

  const handleMarkerDragEnd = useCallback(
    async ([lat, lng]: [number, number]) => {
      // Additional validation before calling reverseGeocode
      if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        isNaN(lat) ||
        isNaN(lng) ||
        lat < -90 ||
        lat > 90 ||
        lng < -180 ||
        lng > 180
      ) {
        setNotification({
          type: "error",
          message:
            "Invalid coordinates detected. Please try dragging the marker again.",
        });
        return;
      }

      setIsGeocoding(true);
      setNotification(null); // Clear any existing notifications

      try {
        // Clear address fields before fetching new data
        clearAddressFields();

        // Fetch address data from coordinates first
        const result = await reverseGeocode(lat, lng);

        // Update all address fields with the fetched data
        onLocationUpdate("address", result.address);
        onLocationUpdate("city", result.city);
        onLocationUpdate("region", result.region);
        onLocationUpdate("postalCode", result.postalCode);

        // Update coordinates in parent state after successful address fetch
        onLocationUpdate("coordinates", { lat, lng });

        // Show success notification
        setNotification({
          type: "success",
          message: `Address updated: ${result.address}, ${result.city}`,
        });
      } catch (err) {
        console.error("Error during reverse geocoding:", err);

        // Even if address fetch fails, update coordinates to maintain marker position
        onLocationUpdate("coordinates", { lat, lng });

        // Show error notification
        setNotification({
          type: "error",
          message:
            "Failed to get address details. Coordinates updated successfully.",
        });
      } finally {
        setIsGeocoding(false);
        // Auto-hide notification after 4 seconds
        setTimeout(() => setNotification(null), 4000);
      }
    },
    [onLocationUpdate, clearAddressFields]
  );

  const handleGeocodeAddress = useCallback(
    async (address: string) => {
      if (!address) return;
      setIsGeocoding(true);
      setNotification(null);

      try {
        const coords = await geocodeAddress(address);
        onLocationUpdate("coordinates", coords);
        setNotification({
          type: "success",
          message: "Map updated from address!",
        });
      } catch (err) {
        setNotification({
          type: "error",
          message: "Failed to find location for address.",
        });
      } finally {
        setIsGeocoding(false);
        setTimeout(() => setNotification(null), 3000);
      }
    },
    [onLocationUpdate]
  );

  return {
    isGeocoding,
    notification,
    handleMarkerDragEnd,
    handleGeocodeAddress,
  };
};
