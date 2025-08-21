import React from "react";
import { Settings as SettingsIcon } from "lucide-react";

const UnderDevelopment: React.FC = () => (
  <div className="space-y-2 md:space-y-4">
    <div className="border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-center">
        <SettingsIcon className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        This section is currently under development
      </p>
    </div>
    <div className="text-center py-12">
      <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">This feature will be available soon.</p>
    </div>
  </div>
);

export default UnderDevelopment;
