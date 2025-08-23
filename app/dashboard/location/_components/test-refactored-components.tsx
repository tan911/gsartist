"use client";

import React from "react";
import {
  LocationMapProvider,
  useLocationMap,
} from "@/lib/context/LocationMapContext";
import { useLocationGeocoding } from "@/lib/hooks/useLocationGeocoding";
import { geocodeAddress, reverseGeocode } from "@/services/geocoding-service";
import { LocationFormData } from "@/types";

// Test component to verify all refactored components work together
const TestRefactoredComponents: React.FC = () => {
  // Test LocationMapContext
  const handleLocationUpdate = (field: keyof LocationFormData, value: any) => {
    console.log(`Updating ${field} with:`, value);
  };

  // Test useLocationGeocoding hook
  const {
    isGeocoding,
    notification,
    handleMarkerDragEnd,
    handleGeocodeAddress,
  } = useLocationGeocoding({
    onLocationUpdate: handleLocationUpdate,
  });

  // Test function to verify geocoding service
  const testGeocodingService = async () => {
    try {
      console.log("Testing geocodeAddress...");
      const geocodeResult = await geocodeAddress("New York");
      console.log("Geocode result:", geocodeResult);

      console.log("Testing reverseGeocode...");
      const reverseResult = await reverseGeocode(40.7128, -74.006);
      console.log("Reverse geocode result:", reverseResult);

      return { success: true, geocodeResult, reverseResult };
    } catch (error) {
      console.error("Error testing geocoding service:", error);
      return { success: false, error };
    }
  };

  return (
    <LocationMapProvider>
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Test Refactored Components</h2>

        <div className="mb-4">
          <h3 className="font-semibold">LocationMapContext Test</h3>
          <TestLocationMapContext />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Geocoding Service Test</h3>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={testGeocodingService}>
            Test Geocoding Service
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Current Status</h3>
          <p>Is Geocoding: {isGeocoding ? "Yes" : "No"}</p>
          {notification && (
            <div
              className={`p-2 rounded ${
                notification.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}>
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </LocationMapProvider>
  );
};

// Component to test LocationMapContext
const TestLocationMapContext: React.FC = () => {
  const {
    coordinates,
    setCoordinates,
    isFullMapOpen,
    setIsFullMapOpen,
    isGeocoding,
    travelRadius,
    setTravelRadius,
  } = useLocationMap();

  return (
    <div className="space-y-2">
      <p>
        Coordinates:{" "}
        {coordinates ? `${coordinates[0]}, ${coordinates[1]}` : "Not set"}
      </p>
      <p>Full Map Open: {isFullMapOpen ? "Yes" : "No"}</p>
      <p>Is Geocoding: {isGeocoding ? "Yes" : "No"}</p>
      <p>
        Travel Radius:{" "}
        {travelRadius !== undefined ? `${travelRadius}mi` : "Not set"}
      </p>

      <div className="space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() =>
            setCoordinates([40.7128, -74.006] as [number, number])
          }>
          Set NYC Coordinates
        </button>

        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsFullMapOpen(!isFullMapOpen)}>
          Toggle Full Map
        </button>

        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() =>
            setTravelRadius(travelRadius !== undefined ? travelRadius + 5 : 5)
          }>
          Increase Radius
        </button>
      </div>
    </div>
  );
};

export default TestRefactoredComponents;
