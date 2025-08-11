import React from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface DangerZoneSectionProps {
  onDeleteAccount: () => void;
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({
  onDeleteAccount,
}) => {
  const handleDeleteClick = () => {
    if (
      confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone."
      )
    ) {
      onDeleteAccount();
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Danger Zone"
        description="Irreversible actions that will affect your account"
        icon={Trash2}
      />

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-red-800">Delete Account</h4>
            <div className="mt-2 text-sm text-red-700">
              <p>
                Once you delete your account, there is no going back. This will
                permanently delete your profile, booking history, and remove all
                associated data.
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZoneSection;
