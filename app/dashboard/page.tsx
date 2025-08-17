"use client";
import React from "react";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { VerificationStatus } from "@/components/dashboard/verification-status";
import { BookingCard } from "@/app/dashboard/bookings/_components/booking-card";
import { ReviewCard } from "@/app/dashboard/reviews/_components/review-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { useUserDataContext } from "@/lib/context/UserDataContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

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

  const handleTabChange = (tabId: string) => {
    router.push(`/dashboard/${tabId}`);
  };

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
    <DashboardContent
      isLoading={isLoading}
      isError={isError}
      error={error}
      onRetry={refreshData}
      loadingText="Loading dashboard data..."
      isRefreshing={isRefreshing}
      showAuthBanner={true}
      authBannerTitle="Welcome to GlowSimcha Artist Dashboard"
      authBannerMessage="Access your account, manage your data, and stay on top of your business.">
      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Quick Actions */}
      <QuickActions onTabChange={handleTabChange} />

      {/* Upcoming Bookings */}
      <DashboardSection
        title="Upcoming Bookings"
        onViewAll={() => handleTabChange("bookings")}>
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
      </DashboardSection>

      {/* Recent Reviews and Verification Status */}
      <div className="grid md:grid-cols-2 gap-4">
        <DashboardSection
          title="Recent Reviews"
          onViewAll={() => handleTabChange("reviews")}>
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
        </DashboardSection>

        <VerificationStatus />
      </div>
    </DashboardContent>
  );
}
