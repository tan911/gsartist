"use client";
import React, { useState } from "react";
import { Bell, Menu as MenuIcon, LogOut } from "lucide-react";
import UnreadBadge from "@/components/messages/UnreadBadge";
import NotificationPanel from "@/components/messages/NotificationPanel";
import { UserBadgeModal } from "@/components/ui/UserBadgeModal";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

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
}

export const Header: React.FC<HeaderProps> = ({
  notificationsList,
  markNotificationAsRead,
  user,
  onOpenSidebar,
}) => {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const unreadNotifications = notificationsList.filter((n) => !n.read).length;
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={onOpenSidebar}
            aria-label="Open sidebar menu"
            type="button">
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            GlowSimcha Artist Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
              className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Show notifications">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1">
                <UnreadBadge count={unreadNotifications} />
              </span>
            </button>
            {showNotificationPanel && (
              <NotificationPanel
                notificationsList={notificationsList}
                onClose={() => setShowNotificationPanel(false)}
                onMarkRead={markNotificationAsRead}
              />
            )}
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400 border-2 border-white shadow-md transition-transform duration-150 hover:scale-105 hover:ring-4 hover:ring-purple-200 bg-gradient-to-br from-purple-500 to-pink-500"
            onClick={() => setShowUserModal(true)}
            aria-label="Show user badge"
            type="button">
            {user.image && user.image.trim() !== "" && !avatarError ? (
              <img
                src={user.image}
                alt={user.name + "'s avatar"}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                onError={() => setAvatarError(true)}
              />
            ) : (
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg select-none">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Logout"
              type="button">
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              variant="primary"
              size="sm"
              className="text-sm">
              Sign In
            </button>
          )}
          <UserBadgeModal
            isOpen={showUserModal}
            onClose={() => setShowUserModal(false)}
            user={user}
          />
        </div>
      </div>
    </header>
  );
};
