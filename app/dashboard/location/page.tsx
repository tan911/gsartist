"use client";
import React, { useCallback } from "react";
import { LocationTabProps, LocationData, LocationSettings } from "@/types";
import { radiusOptions as defaultRadiusOptions } from "@/lib/data/mock-data";
import { useLocationSettings } from "@/lib/hooks/useLocationSettings";
import {
  LocationHeader,
  SuccessMessage,
  BaseLocationSection,
  TravelRadiusSection,
  BookingSettingsSection,
  ServiceAreasSection,
} from "@/app/dashboard/location/_components";

// Main component
const LocationTab: React.FC<LocationTabProps> = ({ className = "" }) => {
  const {
    locationSettings,
    isEditing,
    isSaving,
    showSuccessMessage,
    updateLocationSettings,
    handleSave,
    getCurrentLocation,
    startEditing,
    cancelEditing,
  } = useLocationSettings();

  // Type-safe update handler
  const handleLocationUpdate = useCallback(
    <K extends keyof LocationData>(field: K, value: LocationData[K]) => {
      // Use functional state update to avoid stale closure issues
      updateLocationSettings((prevSettings: LocationSettings) => {
        if (!prevSettings.baseLocation) {
          const newBaseLocation = {
            address: "",
            city: "",
            region: "",
            postalCode: "",
            coordinates: { lat: 0, lng: 0 },
            [field]: value,
          };
          return {
            ...prevSettings,
            baseLocation: newBaseLocation,
          };
        } else {
          // Update existing baseLocation
          const updatedBaseLocation = {
            ...prevSettings.baseLocation,
            [field]: value,
          };
          return {
            ...prevSettings,
            baseLocation: updatedBaseLocation,
          };
        }
      });
    },
    [updateLocationSettings]
  );

  const handleRadiusChange = useCallback(
    (radius: number) => {
      updateLocationSettings({ travelRadius: radius });
    },
    [updateLocationSettings]
  );

  const toggleManualAcceptance = useCallback(() => {
    updateLocationSettings({
      manualAcceptanceOutsideRadius:
        !locationSettings.manualAcceptanceOutsideRadius,
    });
  }, [locationSettings.manualAcceptanceOutsideRadius, updateLocationSettings]);

  const addServiceArea = useCallback(
    (area: string) => {
      updateLocationSettings({
        preferredServiceAreas: [
          ...locationSettings.preferredServiceAreas,
          area,
        ],
      });
    },
    [locationSettings.preferredServiceAreas, updateLocationSettings]
  );

  const removeServiceArea = useCallback(
    (area: string) => {
      updateLocationSettings({
        preferredServiceAreas: locationSettings.preferredServiceAreas.filter(
          (a) => a !== area
        ),
      });
    },
    [locationSettings.preferredServiceAreas, updateLocationSettings]
  );

  const handleCancel = useCallback(() => {
    cancelEditing();
  }, [cancelEditing]);

  const handleEdit = useCallback(() => {
    startEditing();
  }, [startEditing]);

  return (
    <div className={`space-y-2 md:space-y-4 ${className}`}>
      <LocationHeader
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />

      <SuccessMessage show={showSuccessMessage} />

      <BaseLocationSection
        locationData={locationSettings.baseLocation}
        isEditing={isEditing}
        onLocationUpdate={handleLocationUpdate}
        onGetCurrentLocation={getCurrentLocation}
        travelRadius={locationSettings.travelRadius}
      />

      <TravelRadiusSection
        travelRadius={locationSettings.travelRadius}
        isEditing={isEditing}
        onRadiusChange={handleRadiusChange}
        radiusOptions={defaultRadiusOptions}
      />

      <BookingSettingsSection
        manualAcceptanceOutsideRadius={
          locationSettings.manualAcceptanceOutsideRadius
        }
        isEditing={isEditing}
        onToggleManualAcceptance={toggleManualAcceptance}
        travelRadius={locationSettings.travelRadius}
      />

      <ServiceAreasSection
        preferredServiceAreas={locationSettings.preferredServiceAreas}
        isEditing={isEditing}
        onAddServiceArea={addServiceArea}
        onRemoveServiceArea={removeServiceArea}
      />
    </div>
  );
};

export default LocationTab;
