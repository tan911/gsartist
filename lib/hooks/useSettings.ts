import { useState, useCallback } from "react";
import {
  ProfileData,
  PasswordData,
  NotificationSettings,
  BookingSettings,
  VerificationData,
} from "@/types";
import {
  defaultProfileData,
  defaultPasswordData,
  defaultNotificationSettings,
  defaultBookingSettings,
  defaultVerificationData,
} from "@/lib/data/mock-data";

export const useSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);
  const [passwordData, setPasswordData] =
    useState<PasswordData>(defaultPasswordData);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(defaultNotificationSettings);
  const [bookingSettings, setBookingSettings] = useState<BookingSettings>(
    defaultBookingSettings
  );
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationData>(defaultVerificationData);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const updateProfileData = useCallback((updates: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updatePasswordData = useCallback((updates: Partial<PasswordData>) => {
    setPasswordData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateNotificationSettings = useCallback(
    (updates: Partial<NotificationSettings>) => {
      setNotificationSettings((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const updateBookingSettings = useCallback(
    (updates: Partial<BookingSettings>) => {
      setBookingSettings((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const handleProfileUpdate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // In a real app, you'd make an API call here
        console.log("Profile updated:", profileData);
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [profileData]
  );

  const handlePasswordUpdate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("New passwords do not match!");
        return;
      }
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        console.log("Password updated successfully");
      } catch (error) {
        console.error("Error updating password:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [passwordData]
  );

  const handleVerificationResend = useCallback(async (type: string) => {
    setVerificationStatus((prev) => ({
      ...prev,
      [type]: { ...prev[type as keyof VerificationData], pending: true },
    }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setVerificationStatus((prev) => ({
        ...prev,
        [type]: { verified: true, pending: false },
      }));
      console.log(`${type} verification sent successfully!`);
    } catch (error) {
      console.error(`Error sending ${type} verification:`, error);
      setVerificationStatus((prev) => ({
        ...prev,
        [type]: { ...prev[type as keyof VerificationData], pending: false },
      }));
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setProfileData(defaultProfileData);
    setPasswordData(defaultPasswordData);
    setNotificationSettings(defaultNotificationSettings);
    setBookingSettings(defaultBookingSettings);
    setVerificationStatus(defaultVerificationData);
  }, []);

  return {
    // State
    activeSection,
    isLoading,
    profileData,
    passwordData,
    notificationSettings,
    bookingSettings,
    verificationStatus,
    showPassword,
    showCurrentPassword,
    showNewPassword,

    // Setters
    setActiveSection,
    setShowPassword,
    setShowCurrentPassword,
    setShowNewPassword,

    // Update functions
    updateProfileData,
    updatePasswordData,
    updateNotificationSettings,
    updateBookingSettings,

    // Handlers
    handleProfileUpdate,
    handlePasswordUpdate,
    handleVerificationResend,
    resetToDefaults,
  };
};
