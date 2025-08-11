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
  <div className="border-b border-gray-200">
    <nav className="-mb-px flex space-x-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            tab === activeTab
              ? "border-purple-500 text-purple-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}>
          {tab}
        </button>
      ))}
    </nav>
  </div>
);
