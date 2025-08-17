import React from "react";
import { Card } from "@/components/ui/card";
import { DayOfWeek, WeeklyWorkingHours } from "@/types";
import { Heading3 } from "@/components/typography/Heading3";
import { cn } from "@/lib/utils";
import { Meta } from "@/components/typography/Meta";

interface WorkingHoursSectionProps {
  days: DayOfWeek[];
  dayLabels: Record<DayOfWeek, string>;
  workingHours: WeeklyWorkingHours;
  onChange: (day: DayOfWeek, field: string, value: string | boolean) => void;
  disabled?: boolean;
}

export const WorkingHoursSection: React.FC<WorkingHoursSectionProps> = ({
  days,
  dayLabels,
  workingHours,
  onChange,
  disabled = false,
}) => (
  <Card className="p-4 md:p-8">
    {" "}
    <Heading3 className={cn("text-left text-gray-900")}>Working Hours</Heading3>
    <div className="space-y-0">
      {days.map((day) => (
        <div
          key={day}
          className="flex items-center justify-between py-2 md:py-4 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={workingHours[day].enabled}
              onChange={(e) => onChange(day, "enabled", e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              disabled={disabled}
            />
            <Meta className={cn("font-medium text-gray-900 w-22")}>
              {dayLabels[day]}
            </Meta>
          </div>
          {workingHours[day].enabled ? (
            <div className="flex items-center space-x-1 md:space-x-2">
              <input
                type="time"
                value={workingHours[day].start}
                onChange={(e) => onChange(day, "start", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs md:text-sm"
                disabled={disabled}
              />
              <Meta className={cn("font-medium text-gray-900")}>to</Meta>
              <input
                type="time"
                value={workingHours[day].end}
                onChange={(e) => onChange(day, "end", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs md:text-sm"
                disabled={disabled}
              />
            </div>
          ) : (
            <span className="text-gray-500 text-xs md:text-sm">
              Unavailable
            </span>
          )}
        </div>
      ))}
    </div>
  </Card>
);
