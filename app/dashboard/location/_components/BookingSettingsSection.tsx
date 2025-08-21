import React from "react";
import { Settings, AlertCircle } from "lucide-react";

interface BookingSettingsSectionProps {
  manualAcceptanceOutsideRadius: boolean;
  isEditing: boolean;
  onToggleManualAcceptance: () => void;
  travelRadius: number;
}

const BookingSettingsSection: React.FC<BookingSettingsSectionProps> = ({
  manualAcceptanceOutsideRadius,
  isEditing,
  onToggleManualAcceptance,
  travelRadius,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
      <Settings className="h-5 w-5 text-purple-600 mr-2" />
      Booking Settings
    </h3>

    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">
            Manual Acceptance Outside Radius
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            When enabled, bookings outside your travel radius will require
            manual approval
          </p>
        </div>
        <button
          onClick={() => isEditing && onToggleManualAcceptance()}
          disabled={!isEditing}
          className={`flex items-center ${
            isEditing ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
          aria-label={
            manualAcceptanceOutsideRadius
              ? "Disable manual acceptance"
              : "Enable manual acceptance"
          }>
          {manualAcceptanceOutsideRadius ? (
            <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-full"></div>
            </div>
          ) : (
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-full"></div>
            </div>
          )}
        </button>
      </div>

      {manualAcceptanceOutsideRadius && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Manual Approval Enabled</p>
              <p className="mt-1">
                You'll receive booking requests from outside your {travelRadius}
                km radius. Review and approve/decline these requests manually.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default BookingSettingsSection;
