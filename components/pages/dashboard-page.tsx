"use client";
import React from "react";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { VerificationStatus } from "@/components/dashboard/verification-status";
import { BookingCard } from "@/components/bookings/booking-card";
import { ReviewCard } from "@/components/reviews/review-card";
import { Button } from "@/components/ui/buttonnew";
import { DataWrapper, LoadingSpinner } from "@/components/ui/data-loading";
import { useUserDataContext } from "@/lib/context/UserDataContext";
import { AuthBanner } from "@/components/ui/auth-prompt";

interface DashboardPageProps {
  onTabChange: (tabId: string) => void;
  userId: string; // Add userId prop
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onTabChange,
  userId,
}) => {
  const {
    bookings,
    reviews,
    stats,
    isLoading,
    isError,
    error,
    refreshData,
    isRefreshing,
  } = useUserDataContext();

  // Get upcoming bookings (next 7 days)
  const upcomingBookings = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return bookingDate >= today && bookingDate <= nextWeek;
    })
    .slice(0, 5); // Show only first 5

  // Get recent reviews
  const recentReviews = reviews.slice(0, 2);

  return (
    <DataWrapper
      isLoading={isLoading}
      isError={isError}
      error={error}
      onRetry={refreshData}
      loadingText="Loading dashboard data...">
      <div className="space-y-6">
        {/* Auth Banner for unauthenticated users */}
        <AuthBanner
          title="Welcome to GlowSimcha Artist Dashboard"
          message="This is a demo view. Sign in to access your real data and manage your business."
        />

        {/* Refresh indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <LoadingSpinner size="sm" text="Refreshing..." />
          </div>
        )}

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Quick Actions */}
        <QuickActions onTabChange={onTabChange} />

        {/* Upcoming Bookings */}
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
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No upcoming bookings</p>
              </div>
            )}
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
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
          </div>

          <VerificationStatus />
        </div>
      </div>
    </DataWrapper>
  );
};
