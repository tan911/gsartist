import React, { useState } from "react";
import { Lock, RefreshCw, Eye, EyeOff } from "lucide-react";
import { PasswordData } from "@/types";
import SectionHeader from "./SectionHeader";
import FormGroup from "./FormGroup";

interface AccountSecuritySectionProps {
  passwordData: PasswordData;
  isLoading: boolean;
  onPasswordUpdate: (updates: Partial<PasswordData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AccountSecuritySection: React.FC<AccountSecuritySectionProps> = ({
  passwordData,
  isLoading,
  onPasswordUpdate,
  onSubmit,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (field: keyof PasswordData, value: string) => {
    onPasswordUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Account Security"
        description="Manage your password and security settings"
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <FormGroup label="Current Password" required>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={
                showCurrentPassword ? "Hide password" : "Show password"
              }>
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </FormGroup>

        <FormGroup label="New Password" required>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showNewPassword ? "Hide password" : "Show password"}>
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters long and contain uppercase,
            lowercase, number, and special character.
          </p>
        </FormGroup>

        <FormGroup label="Confirm New Password" required>
          <input
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </FormGroup>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSecuritySection;
