"use client";
import React, { useEffect } from "react";
import { MenuItem } from "@/types";
import UnreadBadge from "@/app/dashboard/messages/_components/UnreadBadge";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  conversations?: any[]; // Accept any for now, but should be Conversation[]
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  activeTab,
  onTabChange,
  conversations = [],
  mobileOpen = false,
  onCloseMobile,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Close on ESC for accessibility
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onCloseMobile) onCloseMobile();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mobileOpen, onCloseMobile]);

  // Function to handle navigation
  const handleNavigation = (itemId: string) => {
    onTabChange(itemId);
    if (onCloseMobile) onCloseMobile();

    // Navigate to the appropriate route
    switch (itemId) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "bookings":
        router.push("/dashboard/bookings");
        break;
      case "calendar":
        router.push("/dashboard/calendar");
        break;
      case "services":
        router.push("/dashboard/services");
        break;
      case "availability":
        router.push("/dashboard/availability");
        break;
      case "portfolio":
        router.push("/dashboard/portfolio");
        break;
      case "messages":
        router.push("/dashboard/messages");
        break;
      case "reviews":
        router.push("/dashboard/reviews");
        break;
      case "location":
        router.push("/dashboard/location");
        break;
      case "settings":
        router.push("/dashboard/settings");
        break;
      default:
        router.push("/dashboard");
    }
  };

  // Sidebar content
  const sidebarContent = (
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        let unreadCount = 0;
        if (item.id === "messages") {
          unreadCount = conversations.reduce((sum, conv) => {
            if (!Array.isArray(conv.messages)) return sum;
            const lastUnreadMessage = conv.messages
              .slice()
              .reverse()
              .find((msg: any) => !msg.read);
            if (
              conv.unread > 0 &&
              lastUnreadMessage &&
              lastUnreadMessage.sender === "client"
            ) {
              return sum + conv.unread;
            }
            return sum;
          }, 0);
        }
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`w-full flex justify-center md:justify-between items-center px-4 py-3 text-left rounded-lg transition-colors ${
              isActive
                ? "bg-purple-50 text-purple-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}>
            <span className="flex items-center">
              <Icon className="h-5 w-5 md:mr-3" />
              <span className="hidden md:inline">{item.label}</span>
            </span>
            {item.id === "messages" && <UnreadBadge count={unreadCount} />}
          </button>
        );
      })}
    </nav>
  );

  // Desktop sidebar
  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          mobileOpen ? "block" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onCloseMobile}
        />
        {/* Drawer */}
        <aside
          className={`absolute left-0 top-18 h-full w-16 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col items-center pt-4`}>
          {/* Only render icons for mobile drawer */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              let unreadCount = 0;
              if (item.id === "messages") {
                unreadCount = conversations.reduce(
                  (sum, conv) => sum + (conv.unread || 0),
                  0
                );
              }
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors text-xl ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}>
                  <Icon className="h-6 w-6" />
                  {item.id === "messages" && (
                    <UnreadBadge
                      count={unreadCount}
                      className="absolute -bottom-1 -right-1"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>
      </div>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-sm border-r border-gray-200 h-[585px] sticky top-18 z-40">
        {sidebarContent}
      </aside>
    </>
  );
};
