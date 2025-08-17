import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/data-loading";
import { useRouter } from "next/navigation";
import { Heading2 } from "../typography/Heading2";
import { cn } from "@/lib/utils";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Always render children, regardless of authentication status
  return <>{children}</>;
};

// Component for routes that require specific user roles
interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "artist" | "client" | "admin";
  fallback?: ReactNode;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole = "artist",
  fallback,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heading2 className={cn("text-left text-gray-900")}>
            Authentication Required
          </Heading2>
          <p className="mt-2 text-sm text-gray-600">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Check if user has required role
  if (requiredRole === "artist" && !user.isArtist) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heading2 className={cn("text-left text-gray-900")}>
            Access Denied
          </Heading2>
          <p className="mt-2 text-sm text-gray-600">
            This page is only available for artists.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
