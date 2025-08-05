import React from "react";

interface ProfileBioFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const ProfileBioField: React.FC<ProfileBioFieldProps> = ({
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Professional Bio
    </label>
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder="Tell potential clients about your experience and specialties..."
    />
  </div>
);

export default ProfileBioField;
