"use client";
import React, { useState } from "react";
import { Bell, Menu as MenuIcon, LogOut, X } from "lucide-react";
import UnreadBadge from "@/app/dashboard/messages/_components/UnreadBadge";
import NotificationPanel from "@/app/dashboard/messages/_components/NotificationPanel";
import { UserBadgeModal } from "@/components/ui/UserBadgeModal";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttonnew";

import { useAuthStore } from "@/stores/auth-store";

interface HeaderProps {
  notificationsList: any[];
  markNotificationAsRead: (id: number) => void;
  user: {
    name: string;
    image?: string | null;
    isArtist?: boolean;
    email?: string;
  };
  onOpenSidebar?: () => void;
  onCloseSidebar?: () => void;
  mobileSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  notificationsList,
  markNotificationAsRead,
  // user,
  onOpenSidebar,
  onCloseSidebar,
  mobileSidebarOpen = false,
}) => {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const unreadNotifications = notificationsList.filter((n) => !n.read).length;
  const { user, signout } = useAuthStore();

  const router = useRouter();

  // const data = getUser();
  // console.log(data, "=============================");

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true);
    try {
      await signout();
      // Redirect to login page after successful logout
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to login page even if there's an error
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  console.log(user, "===============");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button - hamburger or close */}
          {mobileSidebarOpen ? (
            <Button
              className="md:hidden mr-2 p-2 rounded-md duration-200"
              onClick={onCloseSidebar}
              aria-label="Close sidebar menu"
              type="button"
              variant="ghost">
              <X className="h-6 w-6 text-gray-900" />
            </Button>
          ) : (
            <Button
              className="md:hidden mr-2 p-2 rounded-md duration-200"
              onClick={onOpenSidebar}
              aria-label="Open sidebar menu"
              type="button"
              variant="ghost">
              <MenuIcon className="h-6 w-6 text-gray-900" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-gray-900">GlowSimcha</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Button
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Show notifications">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1">
                <UnreadBadge count={unreadNotifications} />
              </span>
            </Button>
            {showNotificationPanel && (
              <NotificationPanel
                notificationsList={notificationsList}
                onClose={() => setShowNotificationPanel(false)}
                onMarkRead={markNotificationAsRead}
              />
            )}
          </div> */}
          <Button
            className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition-transform duration-150 hover:scale-105 hover:ring-4 hover:ring-purple-200 ${
              user?.image && user.image.trim() !== "" && !avatarError
                ? "bg-white border-2 border-purple-500"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
            }`}
            onClick={() => setShowUserModal(true)}
            aria-label="Show user badge"
            type="button">
            {user?.image && user.image.trim() !== "" && !avatarError ? (
              <img
                src={user.image}
                alt={user.name + "'s avatar"}
                className="w-10 h-10 rounded-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="flex items-center justify-center text-white font-bold text-lg select-none">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </Button>
          {user ? (
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-purple-600 text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition-transform duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isLoggingOut ? "Logging out..." : "Logout"}
              type="button">
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              ) : (
                <LogOut className="h-5 w-5" />
              )}
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/auth/login")}
              variant="primary"
              size="sm"
              className="text-sm">
              Sign In
            </Button>
          )}
          {user && (
            <UserBadgeModal
              isOpen={showUserModal}
              onClose={() => setShowUserModal(false)}
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
                isArtist: true,
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
};
