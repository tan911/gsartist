"use client";

import React, { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";

const options = [
  { value: "all", label: "All Status" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

export default function CustomSelectExample() {
  const [selectedValue, setSelectedValue] = useState("all");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Custom Select Example</h1>
      
      <div className="space-y-8">
        <CustomSelect
          label="Booking Status"
          options={options}
          value={selectedValue}
          onChange={setSelectedValue}
          helpText="Select a booking status to filter"
        />
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm">Selected value: <span className="font-semibold">{selectedValue}</span></p>
          <p className="text-sm mt-2">Selected label: <span className="font-semibold">
            {options.find(opt => opt.value === selectedValue)?.label}
          </span></p>
        </div>
      </div>
    </div>
  );
}