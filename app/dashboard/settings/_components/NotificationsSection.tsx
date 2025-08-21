import React from "react";
import { Save, Bell } from "lucide-react";
import { NotificationSettings } from "@/types";
import SectionHeader from "./SectionHeader";
import ToggleSwitch from "./ToggleSwitch";

interface NotificationsSectionProps {
  notificationSettings: NotificationSettings;
  onNotificationSettingsUpdate: (
    updates: Partial<NotificationSettings>
  ) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notificationSettings,
  onNotificationSettingsUpdate,
}) => {
  const handleToggle = (key: keyof NotificationSettings, value: boolean) => {
    onNotificationSettingsUpdate({ [key]: value });
  };

  return (
    <div className="space-y-2 md:space-y-4">
      <SectionHeader
        title="Notification Preferences"
        description="Choose how you want to be notified about important updates"
        icon={Bell}
      />

      <div className="space-y-2 md:space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-gray-900">Booking Notifications</h4>
          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationSettings.newBookings}
              onChange={(checked) => handleToggle("newBookings", checked)}
              label="New Bookings"
              description="Get notified when someone books your service"
            />
            <ToggleSwitch
              checked={notificationSettings.bookingChanges}
              onChange={(checked) => handleToggle("bookingChanges", checked)}
              label="Booking Changes"
              description="Get notified when clients modify their bookings"
            />
            <ToggleSwitch
              checked={notificationSettings.cancellations}
              onChange={(checked) => handleToggle("cancellations", checked)}
              label="Cancellations"
              description="Get notified when clients cancel their bookings"
            />
            <ToggleSwitch
              checked={notificationSettings.reviews}
              onChange={(checked) => handleToggle("reviews", checked)}
              label="New Reviews"
              description="Get notified when clients leave reviews"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-gray-900">
            Communication Preferences
          </h4>
          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationSettings.emailNotifications}
              onChange={(checked) =>
                handleToggle("emailNotifications", checked)
              }
              label="Email Notifications"
              description="Receive notifications via email"
            />
            <ToggleSwitch
              checked={notificationSettings.smsNotifications}
              onChange={(checked) => handleToggle("smsNotifications", checked)}
              label="SMS Notifications"
              description="Receive notifications via text message"
            />
            <ToggleSwitch
              checked={notificationSettings.marketingEmails}
              onChange={(checked) => handleToggle("marketingEmails", checked)}
              label="Marketing Emails"
              description="Receive updates about new features and promotions"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;
