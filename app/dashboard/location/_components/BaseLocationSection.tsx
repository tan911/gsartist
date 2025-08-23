import React from "react";
import { LocationSettings, LocationFormData } from "@/types";
import LocationForm from "./LocationForm";

interface BaseLocationSectionProps {
  locationData: LocationSettings["baseLocation"];
  isEditing: boolean;
  onLocationUpdate: (field: keyof LocationFormData, value: string) => void;
  onGetCurrentLocation: () => void;
  travelRadius?: number; // in miles
}

// Simplified component that directly passes props to LocationForm
const BaseLocationSection: React.FC<BaseLocationSectionProps> = (props) => {
  const { onGetCurrentLocation, ...locationFormProps } = props;

  return <LocationForm {...locationFormProps} />;
};

export default BaseLocationSection;
