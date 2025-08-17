"use client";
import React from "react";
import { Button } from "@/components/ui/buttonnew";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Heading1 } from "../typography/Heading1";
import { Paragraph } from "../typography/Paragraph";
import { cn } from "@/lib/utils";

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
      className={`bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 md:p-8 ${className}`}>
      <div className="text-center">
        <Heading1 className={cn("mb-1 md:mb-2 text-center")}>{title}</Heading1>
        <Paragraph className={cn("mb-2 md:mb-4 text-center")}>
          {message}
        </Paragraph>
        <div className="flex flex-row gap-3 justify-center">
          <Button
            onClick={() => router.push("/dashboard/settings")}
            variant="primary"
            size="sm"
            className="w-[160px] sm:w-[200px]">
            Manage My Account
          </Button>
          {showSignup && (
            <Button
              onClick={() => router.push("/auth/reviews")}
              variant="outline"
              size="sm"
              className="w-[80px] sm:w-[100px]">
              Reviews
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Banner version for top of pages
export const AuthBanner: React.FC<AuthPromptProps> = (props) => {
  return <AuthPrompt {...props} className="mb-4" />;
};

// Inline version for specific sections
export const AuthInline: React.FC<AuthPromptProps> = (props) => {
  return <AuthPrompt {...props} className="my-4" />;
};
