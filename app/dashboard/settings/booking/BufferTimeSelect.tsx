import React from "react";
import { bufferTimeOptions } from "@/lib/data/mock-data";

interface BufferTimeSelectProps {
  value: number;
  onChange: (value: number) => void;
}

const BufferTimeSelect: React.FC<BufferTimeSelectProps> = ({
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Buffer Time Between Appointments
    </label>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
      {bufferTimeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default BufferTimeSelect;
