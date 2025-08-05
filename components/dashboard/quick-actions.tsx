import React from "react";
import { Plus, Calendar, Camera, MapPin } from "lucide-react";
import { quickActions } from "@/lib/data/mock-data";

interface QuickActionsProps {
  onTabChange?: (tabId: string) => void;
}

// Mapping from quick action index to tab id
const quickActionTabIds = [
  "services", // Add Service
  "availability", // Set Availability
  "portfolio", // Upload Portfolio
  "location", // Update Location
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
              onClick={() => {
                const tabId = quickActionTabIds[index];
                if (onTabChange && tabId) {
                  onTabChange(tabId);
                }
              }}>
              <div className="text-center">
                <Icon className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
