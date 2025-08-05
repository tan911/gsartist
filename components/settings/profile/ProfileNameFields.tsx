import React from "react";

interface ProfileNameFieldsProps {
  firstName: string;
  lastName: string;
  onChange: (field: "firstName" | "lastName", value: string) => void;
}

const ProfileNameFields: React.FC<ProfileNameFieldsProps> = ({
  firstName,
  lastName,
  onChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        First Name
      </label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Last Name
      </label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>
);

export default ProfileNameFields;
