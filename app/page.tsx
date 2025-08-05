"use client";
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DashboardPage } from "@/components/pages/dashboard-page";
import { BookingsPage } from "@/components/pages/bookings-page";
import { ServicesPage } from "@/components/pages/services-page";
import { AvailabilityPage } from "@/components/pages/availability-page";
import { PortfolioPage } from "@/components/pages/portfolio-page";
import { ReviewsPage } from "@/components/pages/reviews-page";
import { CalendarPage } from "@/components/pages/calendar-page";
import LocationTab from "@/components/pages/location-page";
import SettingsTab from "@/components/pages/settings-page";
import { MessagesPage } from "@/components/pages/messages-page";
import { PlaceholderPage } from "@/components/pages/placeholder-page";
import { menuItems, mockConversations, mockUser } from "@/lib/data/mock-data";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [conversations, setConversations] = useState(mockConversations);

  const renderPageContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage onTabChange={setActiveTab} />;
      case "bookings":
        return <BookingsPage />;
      case "services":
        return <ServicesPage />;
      case "calendar":
        return <CalendarPage />;
      case "availability":
        return <AvailabilityPage />;
      case "portfolio":
        return <PortfolioPage />;
      case "reviews":
        return <ReviewsPage />;
      case "location":
        return <LocationTab />;
      case "settings":
        return <SettingsTab />;
      case "messages":
        return (
          <MessagesPage
            conversations={conversations}
            setConversations={setConversations}
          />
        );
      default:
        return (
          <PlaceholderPage
            title="Page Not Found"
            description="The requested page could not be found. Please select a valid option from the navigation menu."
          />
        );
    }
  };

  return (
    <DashboardLayout
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      conversations={conversations}
      user={mockUser}>
      {renderPageContent()}
    </DashboardLayout>
  );
}
