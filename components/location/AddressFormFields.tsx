"use client";

import React from "react";
import { Search } from "lucide-react";
import { LocationSettings, LocationFormData } from "@/types";
import { sanitizeLocationInput } from "@/lib/utils/location-utils";

interface AddressFormFieldsProps {
  locationData: LocationSettings["baseLocation"];
  isEditing: boolean;
  isGeocoding: boolean;
  onLocationUpdate: (field: keyof LocationFormData, value: any) => void;
  onGeocodeAddress: () => void;
}

const AddressFormFields: React.FC<AddressFormFieldsProps> = ({
  locationData,
  isEditing,
  isGeocoding,
  onLocationUpdate,
  onGeocodeAddress,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={locationData?.address || ""}
            onChange={(e) =>
              onLocationUpdate("address", sanitizeLocationInput(e.target.value))
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
            placeholder="Enter your studio/home address"
          />
          {isEditing && (
            <button
              type="button"
              onClick={onGeocodeAddress}
              className="p-2 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
              title="Find on Map"
              disabled={isGeocoding || !locationData?.address}>
              <Search className="h-5 w-5 text-purple-600" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={locationData?.city || ""}
            onChange={(e) =>
              onLocationUpdate("city", sanitizeLocationInput(e.target.value))
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <input
            type="text"
            value={locationData?.region || ""}
            onChange={(e) =>
              onLocationUpdate("region", sanitizeLocationInput(e.target.value))
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Postal Code
        </label>
        <input
          type="text"
          value={locationData?.postalCode || ""}
          onChange={(e) =>
            onLocationUpdate(
              "postalCode",
              sanitizeLocationInput(e.target.value)
            )
          }
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 transition-colors"
        />
      </div>
    </div>
  );
};

export default AddressFormFields;
