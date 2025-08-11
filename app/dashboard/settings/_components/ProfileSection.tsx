import React from "react";
import { ProfileData } from "@/types";
import { sanitizeProfileInput } from "@/lib/utils/settings-utils";
import SectionHeader from "./SectionHeader";
import ProfileNameFields from "../profile/ProfileNameFields";
import ProfileContactFields from "../profile/ProfileContactFields";
import ProfileBioField from "../profile/ProfileBioField";
import ProfileLocationField from "../profile/ProfileLocationField";
import ProfileLinksFields from "../profile/ProfileLinksFields";
import ProfileSaveButton from "../profile/ProfileSaveButton";

interface ProfileSectionProps {
  profileData: ProfileData;
  isLoading: boolean;
  onProfileUpdate: (updates: Partial<ProfileData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileData,
  isLoading,
  onProfileUpdate,
  onSubmit,
}) => {
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    onProfileUpdate({ [field]: sanitizeProfileInput(value) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Profile Information"
        description="Update your personal information and professional details"
      />
      <form onSubmit={onSubmit} className="space-y-6">
        <ProfileNameFields
          firstName={profileData.firstName}
          lastName={profileData.lastName}
          onChange={handleInputChange}
        />
        <ProfileContactFields
          email={profileData.email}
          phone={profileData.phone}
          onChange={handleInputChange}
        />
        <ProfileBioField
          value={profileData.bio}
          onChange={(value) => handleInputChange("bio", value)}
        />
        <ProfileLocationField
          value={profileData.location}
          onChange={(value) => handleInputChange("location", value)}
        />
        <ProfileLinksFields
          website={profileData.website}
          instagram={profileData.instagram}
          facebook={profileData.facebook}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <ProfileSaveButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;
