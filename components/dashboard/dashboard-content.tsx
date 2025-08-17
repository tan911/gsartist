import React from "react";
import { DataWrapper, LoadingSpinner } from "@/components/ui/data-loading";
import { AuthBanner } from "@/components/ui/auth-prompt";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadingText?: string;
  isRefreshing?: boolean;
  showAuthBanner?: boolean;
  authBannerTitle?: string;
  authBannerMessage?: string;
  className?: string;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  children,
  isLoading = false,
  isError = false,
  error = null,
  onRetry,
  loadingText = "Loading...",
  isRefreshing = false,
  showAuthBanner = false,
  authBannerTitle = "Welcome",
  authBannerMessage = "This is a demo view.",
  className,
}) => {
  return (
    <DataWrapper
      isLoading={isLoading}
      isError={isError}
      error={error}
      onRetry={onRetry}
      loadingText={loadingText}>
      <div className={cn("space-y-2 md:space-y-4", className)}>
        {/* Auth Banner for unauthenticated users */}
        {showAuthBanner && (
          <AuthBanner title={authBannerTitle} message={authBannerMessage} />
        )}

        {/* Refresh indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <LoadingSpinner size="sm" text="Refreshing..." />
          </div>
        )}

        {children}
      </div>
    </DataWrapper>
  );
};
