import React from "react";

interface BookingsTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BookingsTabs: React.FC<BookingsTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => (
  <div className="border-b border-gray-200 bg-white rounded-lg">
    <nav className="flex p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-2 py-1.5 md:px-4 md:py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
            tab === activeTab
              ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 border border-transparent"
          }`}>
          {tab}
        </button>
      ))}
    </nav>
  </div>
);
