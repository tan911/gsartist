"use client";
import React, { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MenuItem } from "@/types";
import { notificationsList as mockNotificationsList } from "@/lib/data/mock-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  conversations?: { unread: number }[];
  user: {
    name: string;
    image?: string | null;
    isArtist?: boolean;
    email?: string;
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  menuItems,
  activeTab,
  onTabChange,
  conversations = [],
  user,
}) => {
  const [notificationsList, setNotificationsList] = useState(
    mockNotificationsList
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const markNotificationAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        notificationsList={notificationsList}
        markNotificationAsRead={markNotificationAsRead}
        user={user}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
      />
      <div className="flex">
        <Sidebar
          menuItems={menuItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
          conversations={conversations}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 p-2 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};
