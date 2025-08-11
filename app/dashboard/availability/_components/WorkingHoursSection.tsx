import React from "react";
import { Card } from "@/components/ui/card";
import { DayOfWeek, WeeklyWorkingHours } from "@/types";

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
  <Card className="p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Hours</h3>
    <div className="space-y-4">
      {days.map((day) => (
        <div
          key={day}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={workingHours[day].enabled}
              onChange={(e) => onChange(day, "enabled", e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              disabled={disabled}
            />
            <span className="font-medium text-gray-900 w-20">
              {dayLabels[day]}
            </span>
          </div>
          {workingHours[day].enabled ? (
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={workingHours[day].start}
                onChange={(e) => onChange(day, "start", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                disabled={disabled}
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={workingHours[day].end}
                onChange={(e) => onChange(day, "end", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                disabled={disabled}
              />
            </div>
          ) : (
            <span className="text-gray-500 text-sm">Unavailable</span>
          )}
        </div>
      ))}
    </div>
  </Card>
);
