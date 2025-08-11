import React, { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BookingsHeaderProps } from "@/types";

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
      <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}>
          {dateRangeOptions.find((opt) => opt.value === dateRange)?.label}
          <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
        </button>
        {dropdownOpen && (
          <ul
            className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1"
            role="listbox">
            {dateRangeOptions.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-purple-50 text-gray-700 ${dateRange === option.value ? "bg-purple-100 font-semibold text-purple-700" : ""}`}
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
