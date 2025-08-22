import React, { useState, useRef } from "react";
import type { CalendarFiltersPanelProps } from "@/types";
import { statusOptions, serviceOptions } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/buttonnew";
import { Paragraph } from "@/components/typography/Paragraph";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";

function useDropdown(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return { open, setOpen, ref };
}

export const CalendarFiltersPanel: React.FC<CalendarFiltersPanelProps> = ({
  selectedFilters,
  onChange,
}) => {
  const statusDropdown = useDropdown();
  const serviceDropdown = useDropdown();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          label="Status"
          options={statusOptions}
          value={selectedFilters.status}
          onChange={(value) => onChange({ ...selectedFilters, status: value })}
          placeholder=""
          className=""
        />
        <CustomSelect
          label="Service"
          options={serviceOptions}
          value={selectedFilters.service}
          onChange={(value) => onChange({ ...selectedFilters, service: value })}
          placeholder=""
          className=""
        />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Paragraph className={cn("mb-2 text-left")}>Status</Paragraph>
          <div className="relative" ref={statusDropdown.ref}>
            <Button
              variant="outline"
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              onClick={() => statusDropdown.setOpen((open) => !open)}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={statusDropdown.open}>
              <span className="text-gray-900">
                {
                  statusOptions.find(
                    (opt) => opt.value === selectedFilters.status
                  )?.label
                }
              </span>
              <svg
                className="w-4 h-4 text-gray-500 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            {statusDropdown.open && (
              <ul
                className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                role="listbox">
                {statusOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 transition-colors ${
                      selectedFilters.status === option.value
                        ? "bg-purple-100 font-semibold text-purple-700"
                        : ""
                    }`}
                    onClick={() => {
                      onChange({ ...selectedFilters, status: option.value });
                      statusDropdown.setOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedFilters.status === option.value}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <Paragraph className={cn("mb-2 text-left")}>Service</Paragraph>

          <div className="relative" ref={serviceDropdown.ref}>
            <Button
              variant="outline"
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              onClick={() => serviceDropdown.setOpen((open) => !open)}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={serviceDropdown.open}>
              <span className="text-gray-900">
                {
                  serviceOptions.find(
                    (opt) => opt.value === selectedFilters.service
                  )?.label
                }
              </span>
              <svg
                className="w-4 h-4 text-gray-500 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            {serviceDropdown.open && (
              <ul
                className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                role="listbox">
                {serviceOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 transition-colors ${
                      selectedFilters.service === option.value
                        ? "bg-purple-100 font-semibold text-purple-700"
                        : ""
                    }`}
                    onClick={() => {
                      onChange({ ...selectedFilters, service: option.value });
                      serviceDropdown.setOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedFilters.service === option.value}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};
