"use client";
import React, { useState } from "react";
import { Save, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/buttonnew";
import { Input } from "@/components/ui/inputLabel";
import { Card } from "@/components/ui/card";
import {
  blackoutDates as mockBlackoutDates,
  workingHours as mockWorkingHours,
  availabilitySettings as mockAvailabilitySettings,
} from "@/lib/data/mock-data";
import type {
  WeeklyWorkingHours,
  BlackoutDate,
  AvailabilitySettings,
  DayOfWeek,
} from "@/types";
import { WorkingHoursSection } from "./_components/WorkingHoursSection";
import { BookingSettingsSection } from "./_components/BookingSettingsSection";
import { BlackoutDatesSection } from "./_components/BlackoutDatesSection";
import { cn } from "@/lib/utils";
import { Heading2 } from "@/components/typography/Heading2";

const days: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const dayLabels: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default function AvailabilityPage() {
  const [workingHours, setWorkingHours] = useState(mockWorkingHours);
  const [blackoutDates, setBlackoutDates] = useState(mockBlackoutDates);
  const [availabilitySettings, setAvailabilitySettings] = useState(
    mockAvailabilitySettings
  );
  const [newBlackoutDate, setNewBlackoutDate] = useState("");
  const [newBlackoutReason, setNewBlackoutReason] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleWorkingHoursChange = (
    day: DayOfWeek,
    field: string,
    value: string | boolean
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const addBlackoutDate = () => {
    if (newBlackoutDate && newBlackoutReason) {
      setBlackoutDates((prev) => [
        ...prev,
        { id: Date.now(), date: newBlackoutDate, reason: newBlackoutReason },
      ]);
      setNewBlackoutDate("");
      setNewBlackoutReason("");
    }
  };

  const removeBlackoutDate = (id: number) => {
    setBlackoutDates((prev) => prev.filter((date) => date.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    // Here you would send workingHours, blackoutDates, and availabilitySettings to your backend
  };

  const handleButtonClick = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsSaving(true);
      setSaveSuccess(false);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 2000);
      // Here you would send workingHours, blackoutDates, and availabilitySettings to your backend
    }
  };

  return (
    <div className="space-y-2 md:space-y-4">
      <div className="flex items-center justify-between">
        <Heading2 className={cn("text-left text-gray-900")}>
          Availability Settings
        </Heading2>
        <Button onClick={handleButtonClick} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>Update Availability</>
          )}
        </Button>
      </div>
      {saveSuccess && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2 text-center">
          Changes saved successfully!
        </div>
      )}

      <WorkingHoursSection
        days={days}
        dayLabels={dayLabels}
        workingHours={workingHours}
        onChange={handleWorkingHoursChange}
        disabled={!isEditing}
      />

      <BookingSettingsSection
        settings={availabilitySettings}
        onChange={setAvailabilitySettings}
        disabled={!isEditing}
      />

      <BlackoutDatesSection
        blackoutDates={blackoutDates}
        newDate={newBlackoutDate}
        newReason={newBlackoutReason}
        onDateChange={setNewBlackoutDate}
        onReasonChange={setNewBlackoutReason}
        onAdd={addBlackoutDate}
        onRemove={removeBlackoutDate}
        disabled={!isEditing}
      />
    </div>
  );
}
