import React from "react";
import { leadTimeOptions } from "@/lib/data/mock-data";

interface LeadTimeSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const LeadTimeSelect: React.FC<LeadTimeSelectProps> = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Minimum Lead Time
    </label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
      {leadTimeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default LeadTimeSelect;
