import React from "react";

interface CustomInstructionsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomInstructionsField: React.FC<CustomInstructionsFieldProps> = ({
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Custom Instructions for Clients
    </label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder="Any special instructions for clients when booking..."
    />
  </div>
);

export default CustomInstructionsField;
