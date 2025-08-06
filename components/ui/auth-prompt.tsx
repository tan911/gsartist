"use client";
import React from "react";
import { Button } from "@/components/ui/buttonnew";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

interface AuthPromptProps {
  title?: string;
  message?: string;
  showSignup?: boolean;
  className?: string;
}

export const AuthPrompt: React.FC<AuthPromptProps> = ({
  title = "Sign in to access full features",
  message = "Create an account or sign in to manage your bookings, services, and more.",
  showSignup = true,
  className = "",
}) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Don't show if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.push("/login")}
            variant="primary"
            size="sm"
            className="w-full sm:w-auto">
            Sign In
          </Button>

          {showSignup && (
            <Button
              onClick={() => router.push("/signup")}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto">
              Create Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Banner version for top of pages
export const AuthBanner: React.FC<AuthPromptProps> = (props) => {
  return <AuthPrompt {...props} className="mb-6" />;
};

// Inline version for specific sections
export const AuthInline: React.FC<AuthPromptProps> = (props) => {
  return <AuthPrompt {...props} className="my-4" />;
};
