import React from "react";
import { Users, Calendar, Star, DollarSign } from "lucide-react";
import { StatCard } from "@/components/ui/card";

interface StatsOverviewProps {
  stats: {
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    activeClients: number;
  };
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statsData = [
    {
      title: "Total Bookings",
      value: stats.totalBookings.toString(),
      icon: Calendar,
      color: "blue" as const,
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "green" as const,
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: "yellow" as const,
    },
    {
      title: "Active Clients",
      value: stats.activeClients.toString(),
      icon: Users,
      color: "purple" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
