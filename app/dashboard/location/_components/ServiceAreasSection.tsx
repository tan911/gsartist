"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Globe } from "lucide-react";
import { sanitizeLocationInput } from "@/lib/utils/location-utils";
import { Heading3 } from "@/components/typography/Heading3";
import { cn } from "@/lib/utils";
import { Paragraph } from "@/components/typography/Paragraph";
import { Input } from "@/components/ui/inputLabel";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch city suggestions from Nominatim when search query changes
  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (searchQuery.length < 2) {
        setCityOptions([]);
        return;
      }

      setIsLoading(true);
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&addressdetails=1&limit=8`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch city suggestions");

        const data = await response.json();

        // Extract city names from results
        const cities = data.map((item: any) => {
          const address = item.address || {};
          const city =
            address.city ||
            address.town ||
            address.village ||
            item.display_name.split(",")[0];

          // Create a more descriptive label with city and region/country
          const region =
            address.state || address.region || address.province || "";
          const country = address.country || "";

          let label = city;
          if (region && country) {
            label = `${city}, ${region}, ${country}`;
          } else if (region) {
            label = `${city}, ${region}`;
          } else if (country) {
            label = `${city}, ${country}`;
          }

          return {
            value: city,
            label: label,
          };
        });

        // Remove duplicates based on city name
        const uniqueOptions = cities.filter(
          (
            option: { value: string; label: string },
            index: number,
            self: { value: string; label: string }[]
          ) =>
            index ===
            self.findIndex(
              (o: { value: string; label: string }) => o.value === option.value
            )
        );

        setCityOptions(uniqueOptions);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setCityOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchCitySuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle city selection from dropdown
  const handleCitySelect = useCallback((value: string) => {
    setNewServiceArea(value);
    setSearchQuery(value);
    setShowDropdown(false);
  }, []);

  // Handle input change for search
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = sanitizeLocationInput(e.target.value);
      setNewServiceArea(value);
      setSearchQuery(value);
      setShowDropdown(value.length > 0);
    },
    []
  );

  const handleAddServiceArea = useCallback(() => {
    if (
      newServiceArea.trim() &&
      !preferredServiceAreas.includes(newServiceArea.trim())
    ) {
      onAddServiceArea(newServiceArea.trim());
      setNewServiceArea("");
      setSearchQuery("");
      setShowDropdown(false);
      setCityOptions([]);
    }
  }, [newServiceArea, preferredServiceAreas, onAddServiceArea]);
  // const handleAddServiceArea = useCallback(() => {
  //   if (
  //     newServiceArea.trim() &&
  //     !preferredServiceAreas.includes(newServiceArea.trim())
  //   ) {
  //     onAddServiceArea(newServiceArea.trim());
  //     setNewServiceArea("");
  //   }
  // }, [newServiceArea, preferredServiceAreas, onAddServiceArea]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddServiceArea();
      } else if (e.key === "Escape") {
        setShowDropdown(false);
      }
    },
    [handleAddServiceArea]
  );
  // const handleKeyPress = useCallback(
  //   (e: React.KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       handleAddServiceArea();
  //     }
  //   },
  //   [handleAddServiceArea]
  // );

  // const handleInputChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNewServiceArea(sanitizeLocationInput(e.target.value));
  //   },
  //   []
  // );
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 md:p-4">
      <Heading3 className={cn("text-left text-gray-900 mb-2")}>
        <span className="flex items-center">
          <Globe className="h-5 w-5 text-purple-600 mr-2" />
          Preferred Service Areas
        </span>
      </Heading3>
      <Paragraph className={cn("text-left text-xs md:text-sm mb-2 md:mb-4")}>
        Specify cities or regions where you prefer to provide services. This
        helps with client matching.
      </Paragraph>

      {isEditing && (
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            label=""
            value={newServiceArea || ""}
            placeholder="Search by City"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            helpText=""
            min="1"
            // error={errors.name}
            id="preferredcity-name"
            name="preferredcity-name"
            disabled={!isEditing}
          />
          {showDropdown && searchQuery && isEditing && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="px-4 py-2 text-gray-500 italic">
                  Loading suggestions...
                </div>
              ) : cityOptions.length > 0 ? (
                cityOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 transition-colors"
                    onClick={() => handleCitySelect(option.value)}>
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 italic">
                  No cities found
                </div>
              )}
            </div>
          )}
          {/* <input
            type="text"
            value={newServiceArea}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Add a city or region..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 transition-colors"
          /> */}
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
