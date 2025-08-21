import React from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Heading2 } from "@/components/typography/Heading2";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttonnew";

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
  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
    <Heading2 className={cn("text-left text-gray-900 mb-2 sm:mb-0")}>
      Calendar
    </Heading2>

    <div className="flex items-center space-x-2 md:space-x-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleFilters}
        className={`flex items-center transition-colors ${
          showFilters
            ? "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
            : "border-gray-300 hover:bg-gray-50"
        }`}>
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={onToday}
        className="bg-purple-600 hover:bg-purple-700 text-white">
        Today
      </Button>
      <div className="flex items-center space-x-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-md">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <p className="text-sm md:text-base font-regular text-gray-900 w-[100px] sm:w-[120px] text-center">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-md">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
);
