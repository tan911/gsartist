"use client";
import React, { useState, useCallback } from "react";
import { Globe } from "lucide-react";
import { sanitizeLocationInput } from "@/lib/utils/location-utils";

interface ServiceAreasSectionProps {
  preferredServiceAreas: string[];
  isEditing: boolean;
  onAddServiceArea: (area: string) => void;
  onRemoveServiceArea: (area: string) => void;
}

const ServiceAreasSection: React.FC<ServiceAreasSectionProps> = ({
  preferredServiceAreas,
  isEditing,
  onAddServiceArea,
  onRemoveServiceArea,
}) => {
  const [newServiceArea, setNewServiceArea] = useState("");

  const handleAddServiceArea = useCallback(() => {
    if (
      newServiceArea.trim() &&
      !preferredServiceAreas.includes(newServiceArea.trim())
    ) {
      onAddServiceArea(newServiceArea.trim());
      setNewServiceArea("");
    }
  }, [newServiceArea, preferredServiceAreas, onAddServiceArea]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleAddServiceArea();
      }
    },
    [handleAddServiceArea]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewServiceArea(sanitizeLocationInput(e.target.value));
    },
    []
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Globe className="h-5 w-5 text-purple-600 mr-2" />
          Preferred Service Areas
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Specify cities or regions where you prefer to provide services. This
        helps with client matching.
      </p>

      {isEditing && (
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newServiceArea}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add a city or region..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleAddServiceArea}
            disabled={!newServiceArea.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {preferredServiceAreas.map((area, index) => (
          <span
            key={`${area}-${index}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
            {area}
            {isEditing && (
              <button
                onClick={() => onRemoveServiceArea(area)}
                className="ml-2 text-purple-600 hover:text-purple-800 transition-colors"
                aria-label={`Remove ${area}`}>
                ×
              </button>
            )}
          </span>
        ))}

        {preferredServiceAreas.length === 0 && (
          <p className="text-gray-500 text-sm italic">
            No preferred service areas specified
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceAreasSection;
