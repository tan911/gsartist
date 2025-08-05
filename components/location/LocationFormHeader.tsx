"use client";

import React from "react";
import { MapPin, Loader2 } from "lucide-react";

interface LocationFormHeaderProps {
  isGeocoding: boolean;
}

const LocationFormHeader: React.FC<LocationFormHeaderProps> = ({
  isGeocoding,
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <MapPin className="h-5 w-5 text-purple-600 mr-2" />
        Base Location Map
      </h3>
      {isGeocoding && (
        <Loader2 className="animate-spin h-5 w-5 text-purple-600 ml-2" />
      )}
    </div>
  );
};

export default LocationFormHeader;
