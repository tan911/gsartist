import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BookingsHeaderProps } from "@/types";
import { Heading2 } from "@/components/typography/Heading2";
import { cn } from "@/lib/utils";

const dateRangeOptions = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "week", label: "Past Week" },
  { value: "month", label: "Past Month" },
];

const BookingsHeader: React.FC<BookingsHeaderProps> = ({
  dateRange,
  setDateRange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex items-start justify-between">
      <Heading2 className={cn("text-left text-gray-900")}>
        Bookings Management
      </Heading2>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center p-1 md:p-2 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-xs md:text-sm"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}>
          {dateRangeOptions.find((opt) => opt.value === dateRange)?.label}
          <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
        </button>
        {dropdownOpen && (
          <ul
            className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-sm shadow-lg z-10"
            role="listbox">
            {dateRangeOptions.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 ${
                  dateRange === option.value
                    ? "bg-purple-100 font-semibold text-purple-700"
                    : ""
                }`}
                onClick={() => {
                  setDateRange(option.value);
                  setDropdownOpen(false);
                }}
                role="option"
                aria-selected={dateRange === option.value}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingsHeader;
