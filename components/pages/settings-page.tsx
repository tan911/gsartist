import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { SettingsTabProps } from "@/types";
import { settingsSections } from "@/lib/data/mock-data";
import { useSettings } from "@/lib/hooks/useSettings";
import {
  SettingsTabs,
  ProfileSection,
  AccountSecuritySection,
  BookingSettingsSection,
  NotificationsSection,
  VerificationSection,
  DangerZoneSection,
  PaymentBillingSection,
  PrivacyDataSection,
} from "@/components/settings";

const SettingsTab: React.FC<SettingsTabProps> = ({ className = "" }) => {
  const {
    activeSection,
    isLoading,
    profileData,
    passwordData,
    notificationSettings,
    bookingSettings,
    verificationStatus,
    setActiveSection,
    updateProfileData,
    updatePasswordData,
    updateNotificationSettings,
    updateBookingSettings,
    handleProfileUpdate,
    handlePasswordUpdate,
    handleVerificationResend,
  } = useSettings();

  const handleDeleteAccount = () => {
    alert("Account deletion functionality would be implemented here.");
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSection
            profileData={profileData}
            isLoading={isLoading}
            onProfileUpdate={updateProfileData}
            onSubmit={handleProfileUpdate}
          />
        );

      case "account":
        return (
          <AccountSecuritySection
            passwordData={passwordData}
            isLoading={isLoading}
            onPasswordUpdate={updatePasswordData}
            onSubmit={handlePasswordUpdate}
          />
        );

      case "booking":
        return (
          <BookingSettingsSection
            bookingSettings={bookingSettings}
            onBookingSettingsUpdate={updateBookingSettings}
          />
        );

      case "notifications":
        return (
          <NotificationsSection
            notificationSettings={notificationSettings}
            onNotificationSettingsUpdate={updateNotificationSettings}
          />
        );

      case "verification":
        return <VerificationSection />;

      case "payment":
        return <PaymentBillingSection />;
      case "privacy":
        return <PrivacyDataSection />;

      case "danger":
        return <DangerZoneSection onDeleteAccount={handleDeleteAccount} />;

      default:
        return (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center">
                <SettingsIcon className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Coming Soon
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                This section is currently under development
              </p>
            </div>
            <div className="text-center py-12">
              <SettingsIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                This feature will be available soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full min-h-screen bg-gray-50 overflow-hidden ${className}`}>
      <div className="w-full overflow-hidden">
        <SettingsTabs
          sections={settingsSections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className="w-full p-4 sm:p-6 lg:p-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
          <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 overflow-hidden">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
