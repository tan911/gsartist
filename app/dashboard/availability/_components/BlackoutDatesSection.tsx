import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/inputLabel";
import { Button } from "@/components/ui/buttonnew";
import { Plus, X } from "lucide-react";
import { BlackoutDate } from "@/types";
import { Heading3 } from "@/components/typography/Heading3";
import { cn } from "@/lib/utils";

interface BlackoutDatesSectionProps {
  blackoutDates: BlackoutDate[];
  newDate: string;
  newReason: string;
  onDateChange: (value: string) => void;
  onReasonChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
  disabled?: boolean;
}

export const BlackoutDatesSection: React.FC<BlackoutDatesSectionProps> = ({
  blackoutDates,
  newDate,
  newReason,
  onDateChange,
  onReasonChange,
  onAdd,
  onRemove,
  disabled = false,
}) => (
  <Card className="p-4 md:p-8">
    <Heading3 className={cn("text-left text-gray-900")}>
      Blackout Dates
    </Heading3>
    <div className="bg-gray-50 rounded-lg p-2 md:p-4">
      <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
        <Input
          type="date"
          label="Date"
          value={newDate}
          onChange={(e) => onDateChange(e.target.value)}
          disabled={disabled}
        />
        <Input
          type="text"
          label="Reason"
          placeholder="e.g., Vacation, Personal Day"
          value={newReason}
          onChange={(e) => onReasonChange(e.target.value)}
          disabled={disabled}
        />
        <Button
          onClick={onAdd}
          disabled={disabled}
          size="lg"
          className="max-w-[90px] ">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
    <div className="space-y-1 md:space-y-2">
      {blackoutDates.map((blackout) => (
        <div
          key={blackout.id}
          className="flex items-center justify-between p-2 md:p-4 bg-red-50 border border-red-200 rounded-md">
          <div>
            <span className="font-medium text-gray-900">{blackout.date}</span>
            <span className="text-gray-600 ml-3">{blackout.reason}</span>
          </div>
          <button
            onClick={() => onRemove(blackout.id)}
            className="text-red-600 hover:text-red-800"
            disabled={disabled}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      {blackoutDates.length === 0 && (
        <p className="text-gray-500 text-center py-4">No blackout dates set</p>
      )}
    </div>
  </Card>
);
