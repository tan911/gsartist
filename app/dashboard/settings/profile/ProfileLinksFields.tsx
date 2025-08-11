import React from "react";

interface ProfileLinksFieldsProps {
  website: string;
  instagram: string;
  facebook: string;
  onChange: (
    field: "website" | "instagram" | "facebook",
    value: string
  ) => void;
}

const ProfileLinksFields: React.FC<ProfileLinksFieldsProps> = ({
  website,
  instagram,
  facebook,
  onChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Website
      </label>
      <input
        type="url"
        value={website}
        onChange={(e) => onChange("website", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="https://yourwebsite.com"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Instagram Handle
      </label>
      <input
        type="text"
        value={instagram}
        onChange={(e) => onChange("instagram", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="@yourusername"
      />
    </div>
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Facebook Page
      </label>
      <input
        type="text"
        value={facebook}
        onChange={(e) => onChange("facebook", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Your Facebook page name"
      />
    </div>
  </div>
);

export default ProfileLinksFields;
