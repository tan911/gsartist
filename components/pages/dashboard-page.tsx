"use client";
import React from "react";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { VerificationStatus } from "@/components/dashboard/verification-status";
import { BookingCard } from "@/components/bookings/booking-card";
import { ReviewCard } from "@/components/reviews/review-card";
import { Button } from "@/components/ui/buttonnew";
import {
  allBookingsLinked as allBookings,
  reviews,
} from "@/lib/data/mock-data";

import { Filter } from "lucide-react";

interface DashboardPageProps {
  onTabChange: (tabId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onTabChange,
}) => {
  const bookingTabs = ["All", "Upcoming", "Pending", "Completed", "Cancelled"];
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <StatsOverview />

      {/* Quick Actions */}
      <QuickActions onTabChange={onTabChange} />

      {/*  Upcoming Bookings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Bookings
          </h3>
          <Button
            variant="ghost"
            onClick={() => onTabChange("bookings")}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm">
            View All
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {allBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      {/* Recent Reviews and Verification Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Reviews
            </h3>
            <Button
              variant="ghost"
              onClick={() => onTabChange("reviews")}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {reviews.slice(0, 2).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <VerificationStatus />
      </div>
    </div>
  );
};
