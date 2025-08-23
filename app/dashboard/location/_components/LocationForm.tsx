"use client";

import React, { useEffect } from "react";
import { LocationSettings, LocationFormData } from "@/types";
import { useLocationGeocoding } from "@/lib/hooks/useLocationGeocoding";
import { useLocationMap } from "@/lib/hooks/useLocationMap";
import { LocationMapProvider } from "@/lib/context/LocationMapContext";
import LocationFormHeader from "./LocationFormHeader";
import LocationNotification from "./LocationNotification";
import AddressFormFields from "./AddressFormFields";
import LocationMapContainer from "./LocationMapContainer";

interface LocationFormProps {
  locationData: LocationSettings["baseLocation"];
  isEditing: boolean;
  onLocationUpdate: (field: keyof LocationFormData, value: any) => void;
  travelRadius?: number; // in miles
}

const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  isEditing,
  onLocationUpdate,
  travelRadius,
}) => {
  // Initialize location map hook with data from props
  const initialCoordinates = locationData?.coordinates || null;
  const { coordinates, setCoordinates } = useLocationMap({
    initialCoordinates: initialCoordinates,
    initialTravelRadius: travelRadius,
  });

  // Get geocoding functionality
  const {
    isGeocoding,
    notification,
    handleMarkerDragEnd,
    handleGeocodeAddress,
  } = useLocationGeocoding({ onLocationUpdate });

  // Convert coordinates for the map component
  const localCoordinates = coordinates
    ? ([coordinates.lat, coordinates.lng] as [number, number])
    : null;

  // Update coordinates when locationData changes
  useEffect(() => {
    if (locationData?.coordinates) {
      setCoordinates(locationData.coordinates);
    } else if (isEditing) {
      // If we're in editing mode but have no coordinates, set a default (can be updated by user)
      setCoordinates({ lat: 15.1453, lng: 120.5937 }); // Default to Angeles City
    }
  }, [locationData?.coordinates, isEditing, setCoordinates]);

  const handleGeocodeAddressClick = () => {
    if (locationData?.city) {
      handleGeocodeAddress(locationData.city);
    }
  };

  return (
    <LocationMapProvider
      initialCoordinates={localCoordinates}
      initialTravelRadius={travelRadius}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 md:p-4">
        <LocationFormHeader />

        <LocationNotification notification={notification} />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 space-y-2 items-start">
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
            onMarkerDragEnd={handleMarkerDragEnd}
            travelRadius={travelRadius}
          />
        </div>
      </div>
    </LocationMapProvider>
  );
};

export default LocationForm;
