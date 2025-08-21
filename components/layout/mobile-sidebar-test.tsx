"use client";
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MenuItem } from "@/types";
import {
  Home,
  Calendar,
  Settings,
  MessageSquare,
  Star,
  MapPin,
  Palette,
  Clock,
  Package,
  Users,
} from "lucide-react";

// Mock menu items for testing
const mockMenuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "calendar", label: "Calendar", icon: Clock },
  { id: "services", label: "Services", icon: Package },
  { id: "availability", label: "Availability", icon: Calendar },
  { id: "portfolio", label: "Portfolio", icon: Palette },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "location", label: "Location", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

// Mock conversations for testing
const mockConversations = [
  { unread: 3, messages: [{ read: false, sender: "client" }] },
  { unread: 1, messages: [{ read: false, sender: "client" }] },
];

export const MobileSidebarTest: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsList] = useState([]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log("Tab changed to:", tabId);
  };

  const markNotificationAsRead = (id: number) => {
    console.log("Mark notification as read:", id);
  };

  const mockUser = {
    name: "Test User",
    email: "test@example.com",
    isArtist: true,
    image: null,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        notificationsList={notificationsList}
        markNotificationAsRead={markNotificationAsRead}
        user={mockUser}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
        onCloseSidebar={() => setMobileSidebarOpen(false)}
        mobileSidebarOpen={mobileSidebarOpen}
      />
      <div className="flex">
        <Sidebar
          menuItems={mockMenuItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          conversations={mockConversations}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
        <main className="flex-1 p-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Mobile Sidebar Test</h2>
            <p className="text-gray-600 mb-4">
              This is a test page to verify the mobile sidebar functionality.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Current Active Tab:</strong> {activeTab}
              </p>
              <p>
                <strong>Mobile Sidebar Open:</strong>{" "}
                {mobileSidebarOpen ? "Yes" : "No"}
              </p>
              <p>
                <strong>Instructions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Click the white hamburger menu button in the header</li>
                <li>The sidebar should slide in from the left</li>
                <li>
                  The hamburger button changes to an X button when sidebar is
                  open
                </li>
                <li>Click the X button or outside the sidebar to close it</li>
                <li>Click any menu item to navigate and close the sidebar</li>
                <li>Press ESC key to close the sidebar</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
