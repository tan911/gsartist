import React from "react";
import { Settings, Save } from "lucide-react";

interface LocationHeaderProps {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
}) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Location Settings</h2>
      <p className="text-gray-600 mt-1">
        Manage your service location and travel preferences
      </p>
    </div>
    <div className="flex items-center space-x-3">
      {isEditing ? (
        <>
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors">
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </>
      ) : (
        <button
          onClick={onEdit}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
          <Settings className="h-4 w-4 mr-2" />
          Edit Location
        </button>
      )}
    </div>
  </div>
);

export default LocationHeader;
