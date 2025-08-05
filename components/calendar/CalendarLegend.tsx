import React from "react";

export const CalendarLegend: React.FC = () => (
  <div className="flex items-center space-x-4 px-4 pb-2">
    <div className="flex items-center space-x-1 text-xs text-gray-500">
      <div className="w-4 h-4 bg-green-400 border border-green-500 rounded"></div>
      <span>Booked</span>
    </div>
    <div className="flex items-center space-x-1 text-xs text-gray-500">
      <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded"></div>
      <span>Pending</span>
    </div>
    <div className="flex items-center space-x-1 text-xs text-gray-500">
      <div className="w-4 h-4 bg-red-400 border border-red-500 rounded"></div>
      <span>Blocked</span>
    </div>
  </div>
);
