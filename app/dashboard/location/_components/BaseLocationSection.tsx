import React from "react";
import { LocationSettings, LocationFormData } from "@/types";
import LocationForm from "./LocationForm";

interface BaseLocationSectionProps {
  locationData: LocationSettings["baseLocation"];
  isEditing: boolean;
  onLocationUpdate: (field: keyof LocationFormData, value: string) => void;
  onGetCurrentLocation: () => void;
  travelRadius?: number; // in kilometers
}

const BaseLocationSection: React.FC<BaseLocationSectionProps> = ({
  locationData,
  isEditing,
  onLocationUpdate,
  onGetCurrentLocation,
  travelRadius,
}) => {
  return (
    <LocationForm
      locationData={locationData}
      isEditing={isEditing}
      onLocationUpdate={onLocationUpdate}
      travelRadius={travelRadius}
    />
  );
};

export default BaseLocationSection;
