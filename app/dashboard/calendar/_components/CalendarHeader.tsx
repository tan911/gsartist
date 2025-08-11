import React from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  showFilters,
  onToggleFilters,
}) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
    <div className="flex items-center space-x-4">
      <button
        onClick={onToggleFilters}
        className={`flex items-center px-4 py-2 border rounded-md transition-colors ${
          showFilters
            ? "bg-purple-50 border-purple-300 text-purple-700"
            : "border-gray-300 hover:bg-gray-50"
        }`}>
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </button>
      <button
        onClick={onToday}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
        Today
      </button>
      <button
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-md">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h3 className="text-lg font-semibold text-gray-900">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h3>
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-md">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  </div>
);
