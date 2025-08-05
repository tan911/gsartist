"use client";

import React, { useState, useEffect } from "react";
import { LocationSettings, LocationFormData } from "@/types";
import { useLocationGeocoding } from "@/lib/hooks/useLocationGeocoding";
import LocationFormHeader from "./LocationFormHeader";
import LocationNotification from "./LocationNotification";
import AddressFormFields from "./AddressFormFields";
import LocationMapContainer from "./LocationMapContainer";

interface LocationFormProps {
  locationData: LocationSettings["baseLocation"];
  isEditing: boolean;
  onLocationUpdate: (field: keyof LocationFormData, value: any) => void;
  travelRadius?: number; // in kilometers
}

const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  isEditing,
  onLocationUpdate,
  travelRadius,
}) => {
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [localCoordinates, setLocalCoordinates] = useState<
    [number, number] | null
  >(
    locationData?.coordinates
      ? [locationData.coordinates.lat, locationData.coordinates.lng]
      : null
  );

  const {
    isGeocoding,
    notification,
    handleMarkerDragEnd,
    handleGeocodeAddress,
  } = useLocationGeocoding({ onLocationUpdate });

  // Update local coordinates when locationData changes
  useEffect(() => {
    if (locationData?.coordinates) {
      setLocalCoordinates([
        locationData.coordinates.lat,
        locationData.coordinates.lng,
      ]);
    } else if (isEditing) {
      // If we're in editing mode but have no coordinates, set a default (can be updated by user)
      setLocalCoordinates([15.1453, 120.5937]); // Default to Angeles City
    }
  }, [locationData?.coordinates, isEditing]);

  const handleGeocodeAddressClick = () => {
    if (locationData?.address) {
      handleGeocodeAddress(locationData.address);
    }
  };

  const handleFullMapToggle = (isOpen: boolean) => {
    setIsFullMapOpen(isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <LocationFormHeader isGeocoding={isGeocoding} />

      <LocationNotification notification={notification} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <AddressFormFields
          locationData={locationData}
          isEditing={isEditing}
          isGeocoding={isGeocoding}
          onLocationUpdate={onLocationUpdate}
          onGeocodeAddress={handleGeocodeAddressClick}
        />

        <LocationMapContainer
          localCoordinates={localCoordinates}
          isEditing={isEditing}
          isGeocoding={isGeocoding}
          isFullMapOpen={isFullMapOpen}
          onMarkerDragEnd={handleMarkerDragEnd}
          onFullMapToggle={handleFullMapToggle}
          travelRadius={travelRadius}
        />
      </div>
    </div>
  );
};

export default LocationForm;
